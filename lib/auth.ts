import { cookies } from 'next/headers';

export async function isWholesaleUser() {
  const cookieStore = await cookies();
  return cookieStore.get('wholesale_auth')?.value === 'true';
}
