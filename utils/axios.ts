import axios from 'axios';
import { getServerSideCookie } from './serverSideCookies';
import { redirect } from 'next/navigation';

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
  const tokenRespone = await axios.get<string>('/api/getToken');
  const token = tokenRespone.data;

  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instanceForCS.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
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
    if (error.response?.status === 401) {
      redirect('/login');
    }
    return Promise.reject(error);
  },
);

export function getInstance() {
  const isServer = typeof window === 'undefined';
  return isServer ? instanceForSS : instanceForCS;
}
