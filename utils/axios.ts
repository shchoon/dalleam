import axios, { AxiosError } from 'axios';
import { getServerSideCookie } from './serverSideCookies';
import { redirect } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from '@/components/toast/ToastManager';

const ENV_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 클라이언트 컴포넌트에서 사용하는 axios 인스턴스
const instanceForCS = axios.create({
  baseURL: ENV_BASE_URL,
});
// 서버 컴포넌트에서 사용하는 axios 인스턴스
const instanceForSS = axios.create({
  baseURL: ENV_BASE_URL,
});

// Request 인터셉터
instanceForCS.interceptors.request.use(async (config) => {
  const token = Cookies.get('token');

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instanceForCS.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError) {
      console.log('123123123');
      toast(error.response?.data.message ?? '알 수 없는 오류가 발생하였습니다.');
      if (error.response?.status === 401 && error.config?.url !== 'auths/signin') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

instanceForSS.interceptors.request.use(async (config) => {
  const token = await getServerSideCookie('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instanceForSS.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      redirect('/login');
    }
    return Promise.reject(error);
  },
);

export function getInstance() {
  const isServer = typeof window === 'undefined';
  return isServer ? instanceForSS : instanceForCS;
}
