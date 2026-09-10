export interface DeliveryRange {
  minKm?: number;
  maxKm: number;
  price: number;
}

export interface DeliveryCalculationResult {
  distanceKm: number;
  deliveryFee: number;
  estimatedTimeMin: number;
  addressInfo?: {
    cep: string;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  };
}

// Haversine formula to calculate straight-line distance between two coordinates in km
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

// Calculate REAL DRIVING ROUTE distance via multi-provider OpenStreetMap & Google Routing Engines
export async function getDrivingRouteDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): Promise<number> {
  // 1. Primary (If API key set): Google Maps Distance Matrix API
  const googleApiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (googleApiKey) {
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lon1}&destinations=${lat2},${lon2}&mode=driving&language=pt-BR&key=${googleApiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const element = data.rows?.[0]?.elements?.[0];
        if (element?.status === 'OK' && element.distance?.value) {
          const km = element.distance.value / 1000;
          return Math.round(km * 10) / 10;
        }
      }
    } catch (err) {
      console.warn('Google Distance Matrix error, trying OSRM:', err);
    }
  }

  // 2. Secondary: OSRM Public Server
  try {
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
    const res = await fetch(osrmUrl, {
      headers: { 'User-Agent': 'HenriImportsApp/1.0' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0 && data.routes[0].distance) {
        const drivingKm = data.routes[0].distance / 1000;
        return Math.round(drivingKm * 10) / 10;
      }
    }
  } catch (err) {
    console.warn('OSRM Primary Routing error, trying secondary routing server:', err);
  }

  // 3. Tertiary: OpenStreetMap Germany Routed-Car Server
  try {
    const backupOsrmUrl = `https://routing.openstreetmap.de/routed-car/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
    const res = await fetch(backupOsrmUrl, {
      headers: { 'User-Agent': 'HenriImportsApp/1.0' },
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0 && data.routes[0].distance) {
        const drivingKm = data.routes[0].distance / 1000;
        return Math.round(drivingKm * 10) / 10;
      }
    }
  } catch (err) {
    console.warn('OSRM Backup Routing error, trying Haversine fallback:', err);
  }

  // 4. Fallback: Straight line * 1.35 urban road detour factor
  const haversine = calculateHaversineDistance(lat1, lon1, lat2, lon2);
  return Math.round(haversine * 1.35 * 10) / 10;
}

export async function lookupAddressByCep(cepRaw: string) {
  const cep = cepRaw.replace(/\D/g, '');
  if (cep.length !== 8) {
    throw new Error('CEP deve conter 8 dígitos.');
  }

  const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await res.json();

  if (data.erro) {
    throw new Error('CEP não encontrado.');
  }

  return {
    cep: cepRaw,
    street: data.logradouro || '',
    neighborhood: data.bairro || '',
    city: data.localidade || '',
    state: data.uf || '',
  };
}

// Urban CEP geography estimate based on 5-digit Brazilian postal code prefix density
export function estimateCoordsFromCep(cleanClient: string, cleanStore: string, defaultLat: number, defaultLon: number) {
  const clientNum = parseInt(cleanClient.substring(0, 5) || '0', 10);
  const storeNum = parseInt(cleanStore.substring(0, 5) || '0', 10);
  const diff = storeNum ? Math.abs(clientNum - storeNum) : 0;

  // Real urban CEP geography factor in Brazil: ~0.45km per CEP 5-digit prefix unit
  const approxKm = Math.min(45, Math.max(0.8, diff * 0.45));
  const approxDeg = approxKm / 111;

  return {
    lat: defaultLat + approxDeg * 0.7,
    lon: defaultLon + approxDeg * 0.7,
  };
}

// Multi-provider high-precision coordinate finder (AwesomeAPI + BrasilAPI v2 + Nominatim + Google)
export async function getCoordsForAddress({
  cep,
  street,
  number,
  neighborhood,
  city,
  state,
  storeLat,
  storeLon,
  storeCep,
}: {
  cep: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  storeLat: number;
  storeLon: number;
  storeCep?: string;
}): Promise<{ lat: number; lon: number }> {
  const cleanCep = cep.replace(/\D/g, '');

  if (cleanCep.length === 8) {
    // 1. Primary: AwesomeAPI CEP (Returns exact lat/lng for Brazilian CEPs)
    try {
      const res = await fetch(`https://cep.awesomeapi.com.br/json/${cleanCep}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.lat && data.lng) {
          const lat = parseFloat(data.lat);
          const lon = parseFloat(data.lng);
          if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
            return { lat, lon };
          }
        }
      }
    } catch (err) {
      console.warn('AwesomeAPI CEP error, trying BrasilAPI:', err);
    }

    // 2. Secondary: BrasilAPI v2 (Supports GeoJSON array [lon, lat] and object {latitude, longitude})
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        const coords = data?.location?.coordinates;
        if (coords) {
          let lat = 0;
          let lon = 0;
          if (Array.isArray(coords) && coords.length >= 2) {
            lon = parseFloat(coords[0]);
            lat = parseFloat(coords[1]);
          } else if (coords.latitude && coords.longitude) {
            lat = parseFloat(coords.latitude);
            lon = parseFloat(coords.longitude);
          }
          if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
            return { lat, lon };
          }
        }
      }
    } catch (err) {
      console.warn('BrasilAPI v2 error, trying Nominatim PostalCode:', err);
    }

    // 3. Tertiary: Nominatim Dedicated Postal Code Query
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${cleanCep}&country=Brazil&format=json&limit=1`,
        { headers: { 'User-Agent': 'HenriImportsApp/1.0' } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0 && data[0].lat && data[0].lon) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          if (!isNaN(lat) && !isNaN(lon) && lat !== 0 && lon !== 0) {
            return { lat, lon };
          }
        }
      }
    } catch (err) {
      console.warn('Nominatim PostalCode search error:', err);
    }
  }

  // 4. Quaternary: OpenStreetMap Full Address Query
  try {
    const fullQuery = [number ? `${street}, ${number}` : street, neighborhood, city, state, 'Brasil']
      .filter(Boolean)
      .join(', ');
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullQuery)}&format=json&limit=1`,
      { headers: { 'User-Agent': 'HenriImportsApp/1.0' } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lon: parseFloat(data[0].lon),
        };
      }
    }
  } catch (err) {
    console.warn('Geocoding full address error:', err);
  }

  // 5. Quinary: Google Maps Geocoding API if key is present
  const googleApiKey =
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (googleApiKey) {
    try {
      const fullAddress = `${street || ''} ${number || ''}, ${city || ''} - ${state || ''}, ${cleanCep}, Brasil`;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(fullAddress)}&key=${googleApiKey}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const loc = data.results?.[0]?.geometry?.location;
        if (loc?.lat && loc?.lng) {
          return { lat: loc.lat, lon: loc.lng };
        }
      }
    } catch (err) {
      console.warn('Google Geocoding error:', err);
    }
  }

  // Fallback coordinate calculation using CEP prefix math
  const defaultLat = storeLat || -23.5616;
  const defaultLon = storeLon || -46.656;
  const cleanStore = (storeCep || '01310100').replace(/\D/g, '');
  return estimateCoordsFromCep(cleanCep, cleanStore, defaultLat, defaultLon);
}

// ASYNC Real OSRM Driving Route Delivery Fee Calculation
export async function calculateDeliveryFee({
  storeLat,
  storeLon,
  clientLat,
  clientLon,
  mode,
  kmRate,
  ranges,
}: {
  storeLat: number;
  storeLon: number;
  clientLat: number;
  clientLon: number;
  mode: 'FAIXAS' | 'KM';
  kmRate: number;
  ranges: DeliveryRange[];
}): Promise<{ distanceKm: number; deliveryFee: number; estimatedTimeMin: number }> {
  // Real OSRM driving route distance in kilometers
  const distanceKm = await getDrivingRouteDistanceKm(storeLat, storeLon, clientLat, clientLon);

  let deliveryFee = 0;

  if (mode === 'KM') {
    deliveryFee = Math.max(5, distanceKm * (kmRate || 2.5));
  } else {
    // Mode FAIXAS: find matching range where minKm <= distanceKm <= maxKm
    const sortedRanges = [...(ranges || [])].sort(
      (a, b) => (Number(a.minKm) || 0) - (Number(b.minKm) || 0) || Number(a.maxKm) - Number(b.maxKm)
    );

    // Try finding exact range matching minKm and maxKm
    const matchedRange = sortedRanges.find((r) => {
      const min = Number(r.minKm) || 0;
      const max = Number(r.maxKm) || 0;
      return distanceKm >= min && distanceKm <= max;
    });

    if (matchedRange) {
      deliveryFee = Number(matchedRange.price) || 0;
    } else {
      // Fallback if not directly matched:
      if (sortedRanges.length > 0) {
        const lastRange = sortedRanges[sortedRanges.length - 1];
        if (distanceKm > lastRange.maxKm) {
          const extraKm = distanceKm - lastRange.maxKm;
          deliveryFee = Number(lastRange.price) + extraKm * (kmRate || 3);
        } else {
          deliveryFee = Number(sortedRanges[0].price);
        }
      } else {
        deliveryFee = 10;
      }
    }
  }

  // Estimated delivery time: 20 minutes preparation + 3.5 mins per driving km
  const estimatedTimeMin = Math.round(20 + distanceKm * 3.5);

  return {
    distanceKm,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    estimatedTimeMin,
  };
}
