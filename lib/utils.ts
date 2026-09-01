export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value).replace(/\u00a0/g, ' ');
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(dateString?: string | Date | null): string {
  if (!dateString) return 'Data não informada';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Data não informada';
    }
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (err) {
    return 'Data não informada';
  }
}

export function parseNumber(val: any): number | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  const str = String(val).trim();
  if (str === '') return null;
  // Strip currency symbols, whitespace, and standardize comma to dot
  const clean = str.replace(/[^0-9,-.]/g, '').replace(',', '.');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? null : parsed;
}

export function getCleanImageUrl(url?: string | null, fallback = '/images/hero-banner.png'): string {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.startsWith('blob:')) {
    return fallback;
  }
  return url;
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
