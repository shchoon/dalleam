import Chip from '@/components/chip/Chip';
import { gatheringRules, gatheringSchema } from '@/constants/formSchema';
import { convertDate } from '@/utils/convertDate';
import React, { Dispatch, SetStateAction } from 'react';
import { Control, Controller } from 'react-hook-form';

type timeSlotProps = { time: string; date: string };

type props = {
  control: Control<gatheringSchema>;
  timeSlots: timeSlotProps[];
  timeOfDay: '오전' | '오후';
  selectTime?: string;
  setSelectTime: Dispatch<SetStateAction<string>>;
};

export default function GatheringTimes({
  control,
  timeSlots,
  timeOfDay,
  selectTime,
  setSelectTime,
}: props) {
  const today = convertDate(new Date());

  const handleTimeClick = (time: timeSlotProps) => {
    setSelectTime(() => time.date);
  };

  return (
    <div className="w-full flex flex-col items-start gap-2 self-stretch">
      <div className="text-sm font-semibold">{timeOfDay}</div>
      {/* 오늘 날짜로 기본값 설정 */}
      <Controller
        control={control}
        name="registrationEnd"
        defaultValue={today} // 여기서 오늘 날짜를 기본값으로 설정
        render={({ field }) => <input className="hidden" type="text" {...field} />}
      />

      <div className="w-full flex gap-2 flex-wrap">
        {timeSlots &&
          timeSlots
            .filter((time) => (timeOfDay === '오전' ? time.time < '12:00' : time.time > '12:00'))
            .map((time, idx) => (
              <Controller
                key={idx}
                control={control}
                name="dateTime"
                rules={gatheringRules.dateTime}
                render={({ field }) => (
                  <Chip
                    {...field}
                    className="px-3 py-6pxr w-60pxr h-32pxr"
                    onClick={() => {
                      field.onChange(time.date);
                      handleTimeClick(time);
                    }}
                    color={
                      today > time.date ? 'disabled' : selectTime === time.date ? 'navy' : 'white'
                    }
                    size="sm"
                  >
                    {time.time}
                  </Chip>
                )}
              />
            ))}
      </div>
    </div>
  );
}
