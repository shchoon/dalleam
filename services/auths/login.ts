import { getInstance } from '@/utils/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Body = {
  email: string;
  password: string;
};

type Response = {
  token: string;
};

const login = async (body: Body) => {
  const instance = getInstance();
  const res = await instance.post<Response>('/auths/signin', body);

  return res.data;
};

export const loginMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: login,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 로그인에 실패하였습니다.';

    if (error instanceof AxiosError) {
      alert(error.response?.data.message ?? defaultMsg);
      return;
    }

    alert(defaultMsg);
  },
};
