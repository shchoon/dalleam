'use client';

import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import Input from '@/components/input/Input';
import { convertDate } from '@/utils/convertDate';
import DallaemCalendar from '@/components/calendar/DallaemCalendar';
import { Control, Controller } from 'react-hook-form';
import { gatheringRules } from '@/constants/formSchema';
import { gatheringSchema } from '@/constants/formSchema';
import GatheringTimes from './GatheringTimes';

type timeSlotProps = { time: string; date: string };

type props = { control: Control<gatheringSchema> };

export default function GatheringCalendar({ control }: props) {
  const today = convertDate(new Date());
  const [selectTime, setSelectTime] = useState('');
  const [timeSlots, setTimeSlots] = useState<timeSlotProps[]>([]);

  useEffect(() => {
    updateTimeSlots(new Date());
  }, []);

  const [date, setDate] = useState(today);

  // 시간 배열 생성
  const times = Array.from({ length: 10 }, (_, index) => {
    let hour = 9 + index; // 시작 시간 09:00, 10:00, 11:00, ..., 18:00
    const time = String(hour).padStart(2, '0');
    return `${time}:00`;
  });

  const timeStringToISOString = (time: string, newDate: Date): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date(newDate);
    date.setHours(hours, minutes, 0, 0);
    return convertDate(date);
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
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="text-sm font-semibold">날짜</div>
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
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="text-sm font-semibold">모집정원</div>
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
