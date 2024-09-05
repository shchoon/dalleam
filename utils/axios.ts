import axios from 'axios';
import Cookies from 'js-cookie';
import { getServerSideCookie } from './serverSideCookies';

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
  const accessToken = Cookies.get('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instanceForSS.interceptors.request.use(async (config) => {
  const accessToken = await getServerSideCookie('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

export function getInstance() {
  const isServer = typeof window === 'undefined';
  return isServer ? instanceForSS : instanceForCS;
}
