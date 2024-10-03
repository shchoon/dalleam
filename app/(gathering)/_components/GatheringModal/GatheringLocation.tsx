import Select from '@/components/input/Select';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { reviewRules } from '@/constants/formSchema';
import { reviewSchema } from '@/constants/formSchema';

type Props = {
  control: Control<reviewSchema>;
};

const location = ['건대입구', '을지로3가', '신림', '홍대입구'];

export default function GatheringLocation({ control }: Props) {
  return (
    <div className="flex w-full flex-col items-start gap-1 self-stretch">
      <div className="text-sm font-semibold">장소</div>
      <Controller
        name="location"
        control={control}
        rules={reviewRules.location}
        render={({ field }) => (
          <div className="w-full">
            <Select
              {...field}
              className="text-gray-400"
              onChange={(e) => field.onChange(e.target.value)}
            >
              <option value="">장소를 선택 해주세요</option>
              {location.map((el, idx) => (
                <option key={idx} value={el} className="text-black">
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
