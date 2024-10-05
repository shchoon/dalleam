'use client';

import Chip from '@/components/chip/Chip';
import React, { useEffect } from 'react';
import DallaemFitIcon from '/public/icons/dallaem_fit_icon.svg';
import Workation from '/public/icons/workation_icon.svg';
import TabsUnderline from '/public/icons/tabs_underline.svg';
import Stroke from '/public/icons/stroke.svg';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import useFilterStore from '@/stores/filterStore';

export default function ReviewsTabs() {
  const { type, setType, resetFilters } = useFilterStore();
  useEffect(() => {
    resetFilters();
    return () => resetFilters();
  }, []);

  return (
    <div className="inline-flex flex-col w-full gap-3 items-start md:mb-2">
      <div className="flex items-start gap-3 relative mb-2">
        <div className="flex flex-col items-start gap-2">
          <div
            onClick={() => {
              setType('DALLAEMFIT');
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span
              className={clsx(
                type === 'DALLAEMFIT' && 'text-lg font-semibold',
                'transition-all duration-500 linear',
              )}
            >
              달램 핏
            </span>
            <DallaemFitIcon
              className={clsx(
                type !== 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
                'transition-colors duration-500 linear',
              )}
            />
          </div>
        </div>

        <div
          onClick={() => {
            setType('WORKATION');
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span
            className={clsx(
              type === 'WORKATION' && 'text-lg font-semibold',
              'transition-all duration-500 linear',
            )}
          >
            워케이션
          </span>
          <Workation
            className={clsx(
              type === 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
              'transition-colors duration-500 linear',
            )}
          />
        </div>

        {/* TabsUnderline 애니메이션 추가 */}
        <TabsUnderline
          className={clsx(
            'absolute -bottom-2 h-1 transition-transform duration-300 linear',
            type !== 'WORKATION'
              ? 'w-20 transform translate-x-0'
              : 'w-100pxr transform translate-x-full',
          )}
        />
      </div>
      <AnimatePresence>
        {type !== 'WORKATION' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full items-start gap-3"
          >
            <div className="flex flex-col items-start gap-4 self-stretch">
              <div className="flex items-start gap-2">
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setType('DALLAEMFIT')}
                  color={type === 'DALLAEMFIT' ? 'navy' : 'gray'}
                  size="lg"
                >
                  전체
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setType('OFFICE_STRETCHING')}
                  color={type === 'OFFICE_STRETCHING' ? 'navy' : 'gray'}
                  size="lg"
                >
                  오피스 스트레칭
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setType('MINDFULNESS')}
                  color={type === 'MINDFULNESS' ? 'navy' : 'gray'}
                  size="lg"
                >
                  마인드풀니스
                </Chip>
              </div>
              <Stroke className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
