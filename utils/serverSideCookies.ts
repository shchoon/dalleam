'use server';

import { cookies } from 'next/headers';

export async function getServerSideCookie(key: string) {
  return cookies().get(key)?.value;
}
