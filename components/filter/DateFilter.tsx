'use client';

import './Calendar.css';

import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import DallaemCalendar from '../calendar/DallaemCalendar';
import Arrow from '/public/icons/arrow_down.svg';
import useFilterStore from '@/stores/filterStore';

const DateFilter = () => {
  const [selectedDate, setSelectedDate] = useState(''); // 선택된 날짜를 저장하는 상태
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태
  const { setDate, date: currentDate } = useFilterStore();
  const divRef = useRef<HTMLDivElement | null>(null);

  const formattedCurrentDate =
    currentDate !== '날짜 선택' ? format(new Date(currentDate), 'yy/MM/dd') : '날짜 선택';
  const isDateSelected = currentDate !== '날짜 선택';

  const handleClickOutside = (event: MouseEvent) => {
    // divRef의 외부를 클릭했는지 확인
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setIsOpen(false); // 외부 클릭 시 닫기
    }
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleFilterDate = () => {
    const formattedDate = format(new Date(selectedDate), 'yyyy-MM-dd');
    setDate(formattedDate);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={divRef} className="relative">
      <div
        className={`flex items-center justify-between h-10 px-3 border-2 border-gray-100 border-solid cursor-pointer w-110pxr py-8pxr rounded-xl ${
          isDateSelected ? 'bg-gray-900 text-gray-50' : 'bg-white text-gray-800'
        }
        `}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-sm font-medium w-64pxr">{formattedCurrentDate}</span>
        <Arrow className={`${isDateSelected ? ' text-gray-50' : ' text-gray-800'}`} />
      </div>
      {isOpen && (
        <div className="absolute z-50 flex flex-col gap-3 py-6 bg-white border border-gray-200 border-solid top-48pxr w-336pxr h-326pxr px-10pxr rounded-xl -left-114pxr md:left-0">
          <DallaemCalendar
            onClose={handleCloseDropdown}
            onUpdate={handleFilterDate}
            date={selectedDate}
            setDate={setSelectedDate}
            showButtons={true}
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
