import Button from '@/components/Button';
import Input from '@/components/input/Input';
import { gatheringSchema } from '@/constants/formSchema';
import React, { useRef } from 'react';
import { Control, Controller } from 'react-hook-form';

type Props = {
  control: Control<gatheringSchema>;
};

export default function GatheringImg({ control }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-start gap-1 self-stretch">
      <div className="text-sm font-semibold">이미지</div>
      <Controller
        name="image"
        control={control}
        render={({ field }) => {
          return (
            <div className="w-full flex items-center justify-center">
              <Input
                readOnly
                placeholder="이미지를 첨부해주세요"
                value={field.value ? (field.value as File).name : ''}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(event) => {
                  if (event.currentTarget.files && event.currentTarget.files[0]) {
                    field.onChange(event.currentTarget.files[0]); // 파일이 변경되면 상태 업데이트
                  }
                }}
              />
              <Button size="sm" fillState="empty" onClick={() => fileInputRef.current?.click()}>
                파일 찾기
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}
