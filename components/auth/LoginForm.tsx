'use client';

import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { loginMutationOptions } from '@/services/auths/login';
import Input from '../input/Input';
import PasswordInput from '../input/PasswordInput';
import { loginSchema } from '@/constants/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import Link from 'next/link';

type FormData = z.infer<typeof loginSchema>;

const controllerStyle = 'flex flex-col gap-2';
const labelStyle = 'text-sm font-semibold';

export default function LoginForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    ...loginMutationOptions,
    onSuccess: () => {
      router.push('/');
    },
  });

  const submit = handleSubmit(({ email, password }: FormData) => {
    mutation.mutate({ email, password });
  });

  return (
    <>
      <div className="w-full mb-8">
        <h1 className="w-full text-center text-xl font-semibold">로그인</h1>
      </div>
      <form className="w-full flex flex-col gap-6" onSubmit={submit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className={controllerStyle}>
              <label className={labelStyle} htmlFor="email">
                이메일
              </label>
              <Input
                type="email"
                id="email"
                placeholder="이메일을 입력해 주세요."
                errorMsg={errors.email && errors.email.message}
                {...field}
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className={controllerStyle}>
              <label className={labelStyle} htmlFor="password">
                비밀번호
              </label>
              <PasswordInput
                id="password"
                placeholder="비밀번호를 입력해 주세요."
                errorMsg={errors.password && errors.password.message}
                {...field}
              />
            </div>
          )}
        />
        <Button
          className="w-full h-10 md:h-11h mt-4 text-white disabled:hover:brightness-100"
          fillState="full"
          variant={isValid ? 'orange' : 'gray'}
          type="submit"
          disabled={!isValid}
        >
          로그인
        </Button>
      </form>
      <footer className="flex justify-center mt-6 text-15pxr font-medium leading-normal gap-1">
        <span>같이 달램이 처음이신가요?</span>
        <Link href="/register" className="text-orange-600 underline">
          회원가입
        </Link>
      </footer>
    </>
  );
}