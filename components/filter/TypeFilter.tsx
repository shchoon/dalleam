'use client';

import React from 'react';
import Chip from '../chip/Chip';
import useFilterStore from '@/stores/filterStore';

const TypeFilter = () => {
  const { type, setType, resetFilters } = useFilterStore(); // 상태와 상태 변경 함수 가져오기

  return (
    <div className="flex gap-2">
      <Chip
        className={`text-sm ${type === '' || type === 'DALLAEMFIT' ? 'bg-gray-900 text-white' : ''}`}
        size="md"
        color="gray"
        onClick={() => resetFilters()}
      >
        전체
      </Chip>
      <Chip
        className={`text-sm ${type === 'OFFICE_STRETCHING' ? 'bg-gray-900 text-white' : ''}`}
        size="lg"
        color="gray"
        onClick={() => setType('OFFICE_STRETCHING')}
      >
        오피스 스트레칭
      </Chip>
      <Chip
        className={`text-sm ${type === 'MINDFULNESS' ? 'bg-black text-white' : ''}`}
        size="md"
        color="gray"
        onClick={() => setType('MINDFULNESS')}
      >
        마인드 풀니스
      </Chip>
    </div>
  );
};

export default TypeFilter;
