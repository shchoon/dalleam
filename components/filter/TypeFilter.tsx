'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Chip from '../chip/Chip';
import useFilterStore from '@/stores/filterStore';
import clsx from 'clsx';

const TypeFilter = () => {
  const { type, setType, resetFilters } = useFilterStore(); // 상태와 상태 변경 함수 가져오기
  const isWorkation = type === 'WORKATION';

  return (
    <AnimatePresence>
      {!isWorkation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx(
            'flex gap-2 transition-opacity duration-3000',
            isWorkation ? 'opacity-0' : 'opacity-100',
          )}
        >
          <Chip
            className={clsx(
              'text-sm transition-colors duration-500 linear',
              type === 'DALLAEMFIT' ? 'bg-gray-900 text-white' : '',
            )}
            size="md"
            color="gray"
            onClick={() => resetFilters()}
          >
            전체
          </Chip>
          <Chip
            className={clsx(
              'text-sm',
              type === 'OFFICE_STRETCHING' ? 'bg-gray-900 text-white' : '',
            )}
            size="lg"
            color="gray"
            onClick={() => setType('OFFICE_STRETCHING')}
          >
            오피스 스트레칭
          </Chip>
          <Chip
            className={clsx('text-sm', type === 'MINDFULNESS' ? 'bg-black text-white' : '')}
            size="md"
            color="gray"
            onClick={() => setType('MINDFULNESS')}
          >
            마인드 풀니스
          </Chip>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypeFilter;
