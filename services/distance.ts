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

// Fetch address from ViaCEP and estimate/geocode coordinates
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

// Estimate lat/lon coordinates from CEP prefix for realistic distance calculation
export function estimateCoordsFromCep(cep: string, defaultLat = -23.5616, defaultLon = -46.656): { lat: number; lon: number } {
  const clean = cep.replace(/\D/g, '');
  if (!clean) return { lat: defaultLat, lon: defaultLon };
  
  const num = parseInt(clean.substring(0, 5), 10);
  const hash = (num % 1000) / 100; // Small variance in degrees
  const hash2 = (num % 700) / 100;
  
  // Approximate offset for local calculation simulation
  const latOffset = (hash - 5) * 0.012;
  const lonOffset = (hash2 - 3.5) * 0.012;

  return {
    lat: defaultLat + latOffset,
    lon: defaultLon + lonOffset,
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

  // Estimated delivery time: 25 minutes preparation/dispatch + 3.5 mins per km
  const estimatedTimeMin = Math.round(25 + distanceKm * 3.5);

  return {
    distanceKm,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    estimatedTimeMin,
  };
}
