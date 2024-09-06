'use client';

import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { registerMutationOptions } from '@/services/auths/register';
import Input from '../input/Input';
import PasswordInput from '../input/PasswordInput';
import { registerSchema } from '@/constants/formSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../Button';
import Link from 'next/link';

type FormData = z.infer<typeof registerSchema>;

const controllerStyle = 'flex flex-col gap-2';
const labelStyle = 'text-sm font-semibold';

export default function RegisterForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  const mutation = useMutation({
    ...registerMutationOptions,
    onSuccess: () => {
      router.push('/login');
    },
  });

  const submit = handleSubmit(({ email, name, companyName, password }: FormData) => {
    mutation.mutate({ email, name, companyName, password });
  });

  return (
    <>
      <div className="w-full mb-8">
        <h1 className="w-full text-center text-xl font-semibold">회원가입</h1>
      </div>
      <form className="w-full flex flex-col gap-6" onSubmit={submit}>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <div className={controllerStyle}>
              <label className={labelStyle} htmlFor="name">
                이름
              </label>
              <Input id="name" placeholder="이름을 입력해 주세요." {...field} />
            </div>
          )}
        />
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
          name="companyName"
          render={({ field }) => (
            <div className={controllerStyle}>
              <label className={labelStyle} htmlFor="companyName">
                회사명
              </label>
              <Input
                id="companyName"
                placeholder="회사명을 입력해 주세요."
                errorMsg={errors.companyName && errors.companyName.message}
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
        <Controller
          control={control}
          name="passwordCheck"
          render={({ field }) => (
            <div className={controllerStyle}>
              <label className={labelStyle} htmlFor="passwordCheck">
                비밀번호 확인
              </label>
              <PasswordInput
                id="passwordCheck"
                placeholder="비밀번호를 다시 한 번 입력해 주세요."
                errorMsg={errors.passwordCheck && errors.passwordCheck.message}
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
          회원가입
        </Button>
      </form>
      <footer className="flex justify-center mt-6 text-15pxr font-medium leading-normal gap-1">
        <span>이미 회원이신가요?</span>
        <Link href="/login" className="text-orange-600 underline">
          로그인
        </Link>
      </footer>
    </>
  );
}
