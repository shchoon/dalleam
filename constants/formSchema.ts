import { z } from 'zod';
import REGEX from './regex';

export const registerSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해 주세요.'),
    email: z
      .string()
      .email('올바른 이메일 주소를 입력해 주세요.')
      .regex(REGEX.email, '올바른 이메일 형식이 아닙니다.'),
    companyName: z.string().min(1, '회사 이름을 입력해 주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(REGEX.password, '비밀번호는 영문, 숫자 조합 8자 이상 입력해 주세요.'),
    passwordCheck: z.string().min(1, '비밀번호 확인을 입력해 주세요.'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해 주세요.'),
  password: z.string().min(1, '비밀번호를 입력해 주세요.'),
});

export type gatheringSchema = {
  dateTime: string;
  location: string;
  image: Blob;
  type: string;
  capacity: number;
};

export const gatheringRules = {
  location: {
    required: '장소를 선택해주세요',
  },
  type: {
    required: '서비스를 선택해주세요',
  },
  dateTime: {
    required: '모임 날짜를 선택해주세요',
  },
  capacity: {
    required: '모임 인원을 입력해주세요',
    min: {
      value: 5,
      message: '최소 5인 이상을 입력해주세요',
    },
    validate: (value: number) => value >= 5 || '5명 이상이어야 합니다.',
  },
};
