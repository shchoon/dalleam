import Button from '@/components/Button';
import Input from '@/components/input/Input';
import React, { useRef } from 'react';
import { Controller } from 'react-hook-form';
import { ControlProps } from '@/lib/definition';

function GatheringImg({ control }: ControlProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-start gap-3 self-stretch">
      <div className="text-base font-semibold">이미지</div>
      <Controller
        name="image"
        control={control}
        render={({ field }) => {
          return (
            <div className="w-full flex items-center justify-center gap-3">
              <div className="flex-grow">
                <Input
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer"
                  readOnly
                  placeholder="이미지를 첨부해주세요"
                  value={field.value ? (field.value as File).name : ''}
                />
              </div>
              <input
                data-cy="file-input"
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
              <Button
                className="w-80pxr h-40pxr md:w-100pxr md:h-44pxr text-sm"
                size="sm"
                fillState="empty"
                onClick={() => fileInputRef.current?.click()}
              >
                파일 찾기
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}

export default React.memo(GatheringImg);
