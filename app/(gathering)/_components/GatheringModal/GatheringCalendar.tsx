'use client';

import React, { useState, useEffect, useCallback } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import Input from '@/components/input/Input';
import { convertDate } from '@/utils/convertDate';
import DallaemCalendar from '@/components/calendar/DallaemCalendar';
import { Controller } from 'react-hook-form';
import { gatheringRules } from '@/constants/formSchema';
import GatheringTimes from './GatheringTimes';
import { ControlProps } from '@/lib/definition';

type timeSlotProps = { time: string; date: string };

function GatheringCalendar({ control }: ControlProps) {
  const today = convertDate(new Date());
  const [selectTime, setSelectTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<timeSlotProps[]>([]);
  const [date, setDate] = useState(today);

  useEffect(() => {
    updateTimeSlots(new Date());
  }, []);

  // 시간 배열 생성
  const times = Array.from(
    { length: 10 },
    (_, index) => `${String(9 + index).padStart(2, '0')}:00`,
  );

  const timeStringToISOString = (time: string, newDate: Date): string => {
    const [hours, minutes] = time.split(':').map(Number);
    newDate.setHours(hours, minutes, 0, 0);
    return convertDate(newDate);
  };

  // 날짜에 해당하는 시간 슬롯을 업데이트하는 함수
  const updateTimeSlots = (newDate: Date) => {
    const slots = times.map((time) => ({
      time,
      date: timeStringToISOString(time, newDate),
    }));
    setTimeSlots(slots);
  };

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col items-start gap-3 self-stretch">
          <div className="text-base font-semibold">날짜</div>
          <DallaemCalendar date={date} setDate={setDate} updateTimeSlots={updateTimeSlots} />
        </div>
        <GatheringTimes
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          timeSlots={timeSlots}
          control={control}
          timeOfDay="오전"
        />
        <GatheringTimes
          selectTime={selectTime}
          setSelectTime={setSelectTime}
          timeSlots={timeSlots}
          control={control}
          timeOfDay="오후"
        />
      </div>

      <div className="flex flex-col items-start gap-3 self-stretch">
        <div className="text-base font-semibold">모집정원</div>
        <Controller
          control={control}
          name="capacity"
          rules={gatheringRules.capacity}
          render={({ field }) => (
            <Input
              {...field}
              placeholderColor="gray"
              outlineColor="none"
              placeholder="최소 5인 이상 입력해주세요"
            />
          )}
        />
      </div>
    </>
  );
}

export default React.memo(GatheringCalendar);
