import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { reviewSchema, reviewRules } from '@/constants/formSchema';
import Box from '@/public/icons/box.svg';
import CheckBox from '@/public/icons/check_box.svg';
import clsx from 'clsx';
import { GatheringType } from '@/types/types';

type Props = {
  control: Control<reviewSchema>;
};

export default function GatheringService({ control }: Props) {
  const [selectBox, setSelectBox] = useState('');

  type GatheringServiceType = {
    value: GatheringType;
    name: '달램핏:오피스 스트레칭' | '달램핏:마인드풀니스' | '워케이션';
  };

  const GatheringService: GatheringServiceType[] = [
    { value: 'OFFICE_STRETCHING', name: '달램핏:오피스 스트레칭' },
    { value: 'MINDFULNESS', name: '달램핏:마인드풀니스' },
    { value: 'WORKATION', name: '워케이션' },
  ];

  return (
    <div className="w-full flex flex-col items-start gap-1">
      <div className="text-sm font-semibold">선택 서비스</div>
      <div className="flex items-start w-full gap-2 md:gap-3">
        {GatheringService.map((el, idx) => (
          <div
            className={clsx(
              'flex flex-col w-1/3 md:w-149pxr h-70pxr pl-4 md:pl-4 pt-3 pr-3 md:pr-5 pb-4 items-start gap-2.5 rounded-lg',
              selectBox === el.value ? 'bg-gray-900 text-white' : 'bg-gray-50',
            )}
            key={idx}
          >
            <div className="flex items-start gap-1 md:gap-2 self-stretch">
              <Controller
                control={control}
                name="type"
                rules={reviewRules.type}
                render={({ field }) => (
                  <span
                    onClick={() => {
                      field.onChange(el.value);
                      setSelectBox(el.value);
                    }}
                    className="flex items-center mt-1 cursor-pointer"
                  >
                    {field.value === el.value ? <CheckBox /> : <Box />}
                    <input
                      type="radio"
                      className="hidden"
                      value={el.value}
                      checked={field.value === el.value}
                      readOnly
                    />
                  </span>
                )}
              />
              <div className="flex flex-col">
                <span className="text-sm">{el.name.split(':')[0]}</span>
                <span className="w-11 text-xs">{el.name.split(':')[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
