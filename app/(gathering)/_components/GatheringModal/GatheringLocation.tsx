import Select from '@/components/input/Select';
import React from 'react';
import { Controller } from 'react-hook-form';
import { gatheringRules } from '@/constants/formSchema';
import { ControlProps } from '@/lib/definition';
import clsx from 'clsx';

const location = ['건대입구', '을지로3가', '신림', '홍대입구'];

function GatheringLocation({ control }: ControlProps) {
  console.log('location Rendering');
  return (
    <div className="flex w-full flex-col items-start gap-3 self-stretch">
      <div className="text-base font-semibold">장소</div>
      <Controller
        name="location"
        control={control}
        rules={gatheringRules.location}
        render={({ field }) => (
          <div className="w-full">
            <Select
              {...field}
              className={clsx(field.value ? 'text-black' : 'text-gray-400')}
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="">장소를 선택 해주세요</option>
              {location.map((el, idx) => (
                <option className="text-black" key={idx} value={el}>
                  {el}
                </option>
              ))}
            </Select>
          </div>
        )}
      />
    </div>
  );
}

export default React.memo(GatheringLocation);
