export interface DeliveryRange {
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

// Haversine formula to calculate distance between two coordinates in km
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

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

// Fetch address from ViaCEP
export async function lookupAddressByCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    throw new Error('CEP inválido. Deve conter 8 dígitos.');
  }

  const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
  if (!res.ok) {
    throw new Error('Erro ao buscar CEP no servidor.');
  }

  const data = await res.json();
  if (data.erro) {
    throw new Error('CEP não encontrado.');
  }

  return {
    cep: data.cep,
    street: data.logradouro || '',
    neighborhood: data.bairro || '',
    city: data.localidade || '',
    state: data.uf || '',
  };
}

// Get realistic client coordinates (checks same CEP, real Geocoding, or fallback estimation)
export async function getCoordsForAddress({
  cep,
  street,
  neighborhood,
  city,
  state,
  storeLat,
  storeLon,
  storeCep,
}: {
  cep: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  storeLat: number;
  storeLon: number;
  storeCep?: string;
}): Promise<{ lat: number; lon: number }> {
  const cleanClientCep = cep.replace(/\D/g, '');
  const cleanStoreCep = storeCep ? storeCep.replace(/\D/g, '') : '';

  // 1. Exact match CEP (same address or same store CEP): 0 km distance
  if (cleanClientCep && cleanStoreCep && cleanClientCep === cleanStoreCep) {
    return { lat: storeLat, lon: storeLon };
  }

  // 2. Real Geocoding lookup via Nominatim OpenStreetMap
  if (street && city) {
    try {
      const query = encodeURIComponent(`${street}, ${neighborhood || ''}, ${city} - ${state || ''}, Brasil`);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`,
        {
          headers: {
            'User-Agent': 'HenriImports/1.0',
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0 && data[0].lat && data[0].lon) {
          return {
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          };
        }
      }
    } catch (err) {
      console.warn('Nominatim geocoding fallback:', err);
    }
  }

  // 3. Same CEP prefix (first 5 digits = same neighborhood / sub-district)
  if (
    cleanClientCep.length >= 5 &&
    cleanStoreCep.length >= 5 &&
    cleanClientCep.substring(0, 5) === cleanStoreCep.substring(0, 5)
  ) {
    return {
      lat: storeLat + 0.001, // ~100 meters away
      lon: storeLon + 0.001,
    };
  }

  // 4. Fallback estimation based on CEP difference from store CEP
  const clientNum = parseInt(cleanClientCep.substring(0, 5) || '0', 10);
  const storeNum = parseInt(cleanStoreCep.substring(0, 5) || '0', 10);
  const diff = storeNum ? Math.abs(clientNum - storeNum) : 0;

  const approxKm = Math.min(30, Math.max(0.5, diff * 0.05));
  const approxDeg = approxKm / 111;

  return {
    lat: storeLat + approxDeg,
    lon: storeLon + approxDeg,
  };
}

// Synchronous estimation helper
export function estimateCoordsFromCep(
  cep: string,
  defaultLat = -23.5616,
  defaultLon = -46.656,
  storeCep?: string
): { lat: number; lon: number } {
  const cleanClient = cep.replace(/\D/g, '');
  const cleanStore = storeCep ? storeCep.replace(/\D/g, '') : '';

  if (cleanClient && cleanStore && cleanClient === cleanStore) {
    return { lat: defaultLat, lon: defaultLon };
  }

  if (
    cleanClient.length >= 5 &&
    cleanStore.length >= 5 &&
    cleanClient.substring(0, 5) === cleanStore.substring(0, 5)
  ) {
    return { lat: defaultLat + 0.001, lon: defaultLon + 0.001 };
  }

  const clientNum = parseInt(cleanClient.substring(0, 5) || '0', 10);
  const storeNum = parseInt(cleanStore.substring(0, 5) || '0', 10);
  const diff = storeNum ? Math.abs(clientNum - storeNum) : 0;

  const approxKm = Math.min(30, Math.max(0.5, diff * 0.05));
  const approxDeg = approxKm / 111;

  return {
    lat: defaultLat + approxDeg,
    lon: defaultLon + approxDeg,
  };
}

export function calculateDeliveryFee({
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
}): { distanceKm: number; deliveryFee: number; estimatedTimeMin: number } {
  const distanceKm = calculateHaversineDistance(storeLat, storeLon, clientLat, clientLon);

  let deliveryFee = 0;

  if (mode === 'KM') {
    deliveryFee = Math.max(5, distanceKm * kmRate);
  } else {
    // Mode FAIXAS: find matching range
    const sortedRanges = [...ranges].sort((a, b) => a.maxKm - b.maxKm);
    const matchedRange = sortedRanges.find((r) => distanceKm <= r.maxKm);

    if (matchedRange) {
      deliveryFee = matchedRange.price;
    } else {
      // Exceeds max range: highest range price + surplus km rate
      const lastRange = sortedRanges[sortedRanges.length - 1];
      const fallbackBase = lastRange ? lastRange.price : 25;
      const extraKm = lastRange ? distanceKm - lastRange.maxKm : 0;
      deliveryFee = fallbackBase + Math.max(0, extraKm * 3);
    }
  }

  // Estimated delivery time: 20 minutes preparation + 3.5 mins per km
  const estimatedTimeMin = Math.round(20 + distanceKm * 3.5);

  return {
    distanceKm,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    estimatedTimeMin,
  };
}
