import { User } from '@/types/user';
import { getInstance } from '@/utils/axios';
import { UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import UniteSaved from '@/utils/uniteSaved';

const getUser = async () => {
  const instance = getInstance();
  const res = await instance.get<User>('/auths/user');
  UniteSaved(res.data.id);

  return res.data;
};

export const getUserMutationOptions: UseMutationOptions<User, Error> = {
  mutationFn: getUser,
  onError: (error: Error) => {
    const defaultMsg = '알 수 없는 오류로 유저 정보를 가져오지 못하였습니다.';

    if (error instanceof AxiosError) {
      alert(error);
      return;
    }

    alert(defaultMsg);
  },
};
