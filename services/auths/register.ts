import { getInstance } from '@/utils/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Body = {
  email: string;
  password: string;
  name: string;
  companyName: string;
};

type Response = {
  message: string;
};

const register = async (body: Body) => {
  const instance = getInstance();
  const res = await instance.post<Response>('/auths/signup', body);

  return res.data;
};

export const registerMutationOptions: UseMutationOptions<Response, Error, Body> = {
  mutationFn: register,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 회원가입에 실패하였습니다.';

    if (error instanceof AxiosError) {
      alert(error);
      return;
    }

    alert(defaultMsg);
  },
};
