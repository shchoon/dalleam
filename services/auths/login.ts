import { UseMutationOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface Body {
  email: string;
  password: string;
}

interface Response {
  token: string;
}

const login = async (body: Body) => {
  const res = await axios.post<Response>('/api/login', body);

  return res.data;
};

export const loginMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: login,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 로그인에 실패하였습니다.';

    if (error instanceof AxiosError) {
      alert(error);
      return;
    }

    alert(defaultMsg);
  },
};
