'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import Image from 'next/image';

import Input from '../input/Input';
import Button from '../Button';
import { getInstance } from '@/utils/axios';
import { User } from '@/types/user';
import useUserStore from '@/stores/userStore';

import Modify from '/public/icons/profileBg/modifyProfile.svg';
import Delete from '/public/icons/delete.svg';

type FormData = {
  companyName: string;
  image: File | undefined;
};

type profileImg = {
  preview: string;
  origin: File;
};

type Props = {
  closeModal: () => void;
};

export default function ModifyProfile({ closeModal }: Props) {
  const { setUser } = useUserStore();
  const [profileImg, setProfileImg] = useState<profileImg>();

  const updateProfile = async (body: FormData) => {
    const instance = getInstance();
    const res = await instance.put<User>('/auths/user', body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setUser(res.data);
  };

  const { handleSubmit, control } = useForm();

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      closeModal();
    },
  });

  const submit = handleSubmit(({ companyName }) => {
    mutation.mutate({
      companyName: companyName,
      image: profileImg && profileImg.origin,
    });
  });

  return (
    <form
      aria-label="editProfileModal"
      className="w-343pxr h-324pxr md:w-520pxr md:h-328pxr p-6 flex flex-col gap-6 rounded-xl bg-white"
      onSubmit={submit}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">프로필 수정하기</span>
        <Delete
          aria-label="closeProfileEditModal"
          onClick={() => {
            closeModal();
          }}
        />
      </div>
      <input
        aria-label="profileImg"
        id="profileImg"
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files;
          if (file) {
            const preview = URL.createObjectURL(file[0]);
            setProfileImg((prev) => ({
              ...prev,
              preview: preview,
              origin: file[0],
            }));
          }
        }}
      />
      <label htmlFor="profileImg">
        {profileImg?.preview ? (
          <Image
            src={profileImg.preview}
            width={56}
            height={56}
            className="size-56pxr rounded-full"
            alt="previewImg"
          />
        ) : (
          <Modify />
        )}
      </label>
      <div className="flex flex-col gap-3">
        <Controller
          control={control}
          name="companyName"
          render={({ field }) => (
            <div className="flex flex-col gap-3">
              <label className="text-base font-semibold text-gray-800" htmlFor="companyName">
                회사
              </label>
              <Input id="companyName" placeholder="회사명을 입력해주세요." {...field} />
            </div>
          )}
        />
      </div>
      <div className="w-full flex gap-4">
        <Button
          className="w-full flex justify-center items-center "
          fillState="empty"
          variant="orange"
          onClick={() => {
            closeModal();
          }}
        >
          취소
        </Button>
        <Button
          type="submit"
          className="w-full flex justify-center items-center "
          fillState="full"
          variant="gray"
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}
