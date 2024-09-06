import { getInstance } from '@/utils/axios';
import { AxiosError } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const instance = getInstance();
    const response = await instance.post<{ token: string }>('/auths/signin', body);

    const res = NextResponse.json(response.data, { status: response.status });
    res.cookies.set('token', response.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(err, { status: err.response?.status });
    }
    return NextResponse.json(err, { status: 500 });
  }
}
