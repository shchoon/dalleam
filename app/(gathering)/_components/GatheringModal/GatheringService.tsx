import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { gatheringSchema, gatheringRules } from '@/constants/formSchema';
import Box from '@/public/icons/box.svg';
import CheckBox from '@/public/icons/check_box.svg';
import clsx from 'clsx';
import { GatheringType } from '@/types/types';

type Props = {
  control: Control<gatheringSchema>;
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
    <div className="w-full flex flex-col items-start gap-3">
      <div className="text-base font-semibold">선택 서비스</div>
      <div className="flex items-start w-full gap-2 md:gap-3">
        {GatheringService.map((el, idx) => (
          <div
            className={clsx(
              'flex flex-col w-1/3 md:w-149pxr h-76pxr md:h-70pxr pl-2 pt-6pxr pb-14pxr md:pl-4 md:pt-3 items-start rounded-lg',
              selectBox === el.value ? 'bg-gray-900 text-white' : 'bg-gray-50',
            )}
            key={idx}
          >
            <div className="flex items-start gap-1 md:gap-2 self-stretch">
              <Controller
                control={control}
                name="type"
                rules={gatheringRules.type}
                render={({ field }) => (
                  <span
                    onClick={() => {
                      field.onChange(el.value);
                      setSelectBox(el.value);
                    }}
                    className="flex items-center mt-1 cursor-pointer w-18pxr h-18pxr"
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
              <div className="flex flex-col justify-center items-start gap-1">
                <span className="text-sm font-semibold">{el.name.split(':')[0]}</span>
                {el.value === 'OFFICE_STRETCHING' ? (
                  <span className="text-xs whitespace-pre-wrap md:whitespace-normal">
                    {el.name.split(':')[1].replace(' ', '\n')}
                  </span>
                ) : (
                  <span className="text-xs">{el.name.split(':')[1]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
