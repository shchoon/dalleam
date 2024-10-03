'use client';

import Chip from '@/components/chip/Chip';
import React from 'react';
import DallaemFitIcon from '/public/icons/dallaem_fit_icon.svg';
import Workation from '/public/icons/workation_icon.svg';
import TabsUnderline from '/public/icons/tabs_underline.svg';
import Stroke from '/public/icons/stroke.svg';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { reviewStore } from '@/stores/reviewStore';

export default function ReviewsTabs() {
  const { typeTab, setTypeTab } = reviewStore();

  return (
    <div className="inline-flex flex-col w-full gap-3 items-start md:mb-2">
      <div className="flex items-start gap-3 relative mb-2">
        <div className="flex flex-col items-start gap-2">
          <div
            onClick={() => {
              setTypeTab('DALLAEMFIT');
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span
              className={clsx(
                typeTab === 'DALLAEMFIT' && 'text-lg font-semibold',
                'transition-all duration-500 linear',
              )}
            >
              달램 핏
            </span>
            <DallaemFitIcon
              className={clsx(
                typeTab !== 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
                'transition-colors duration-500 linear',
              )}
            />
          </div>
        </div>

        <div
          onClick={() => {
            setTypeTab('WORKATION');
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span
            className={clsx(
              typeTab === 'WORKATION' && 'text-lg font-semibold',
              'transition-all duration-500 linear',
            )}
          >
            워케이션
          </span>
          <Workation
            className={clsx(
              typeTab === 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
              'transition-colors duration-500 linear',
            )}
          />
        </div>

        {/* TabsUnderline 애니메이션 추가 */}
        <TabsUnderline
          className={clsx(
            'absolute -bottom-2 h-1 transition-transform duration-300 linear',
            typeTab !== 'WORKATION'
              ? 'w-20 transform translate-x-0'
              : 'w-100pxr transform translate-x-full',
          )}
        />
      </div>
      <AnimatePresence>
        {typeTab !== 'WORKATION' && (
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
                  onClick={() => setTypeTab('DALLAEMFIT')}
                  color={typeTab === 'DALLAEMFIT' ? 'navy' : 'gray'}
                  size="lg"
                >
                  전체
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setTypeTab('OFFICE_STRETCHING')}
                  color={typeTab === 'OFFICE_STRETCHING' ? 'navy' : 'gray'}
                  size="lg"
                >
                  오피스 스트레칭
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setTypeTab('MINDFULNESS')}
                  color={typeTab === 'MINDFULNESS' ? 'navy' : 'gray'}
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
