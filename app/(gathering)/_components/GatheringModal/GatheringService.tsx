import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { gatheringRules } from '@/constants/formSchema';
import Box from '@/public/icons/box.svg';
import CheckBox from '@/public/icons/check_box.svg';
import clsx from 'clsx';
import { gatherings } from '@/lib/constants';
import { ControlProps } from '@/lib/definition';

export default function GatheringService({ control }: ControlProps) {
  const [selectBox, setSelectBox] = useState('');
  const { OFFICE_STRETCHING, MINDFULNESS, WORKATION } = gatherings;
  const GatheringService = [OFFICE_STRETCHING, MINDFULNESS, WORKATION];

  return (
    <div className="w-full flex flex-col items-start gap-3">
      <div className="text-base font-semibold">선택 서비스</div>
      <div className="flex items-start w-full gap-2 md:gap-3">
        {GatheringService.map((el, idx) => (
          <div
            className={clsx(
              'flex flex-col w-1/3 md:w-149pxr h-76pxr md:h-70pxr pl-2 pt-6pxr pb-14pxr md:pl-4 md:pt-3 items-start rounded-lg',
              selectBox === el.val ? 'bg-gray-900 text-white' : 'bg-gray-50',
            )}
            onClick={() => setSelectBox(el.val)}
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
                      field.onChange(el.val);
                    }}
                    className="flex items-center mt-1 cursor-pointer w-18pxr h-18pxr"
                  >
                    {selectBox === el.val ? <CheckBox /> : <Box />}
                    <input
                      type="radio"
                      className="hidden"
                      value={el.val}
                      checked={field.value === el.val}
                      readOnly
                    />
                  </span>
                )}
              />
              <div className="flex flex-col justify-center items-start gap-1">
                <span className="text-sm font-semibold">{el.name.split(':')[0]}</span>
                <span className="text-xs">{el.name.split(':')[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
