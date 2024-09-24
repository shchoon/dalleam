'use client';

import Chip from '@/components/chip/Chip';
import React, { useState } from 'react';
import DallaemFitIcon from '/public/icons/dallaem_fit_icon.svg';
import Workation from '/public/icons/workation_icon.svg';
import TabsUnderline from '/public/icons/tabs_underline.svg';
import Stroke from '/public/icons/stroke.svg';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export default function ReviewsTabs() {
  const [mainTab, setMainTab] = useState<'달램 핏' | '워케이션'>('달램 핏');
  const [subTab, setSubTab] = useState<'전체' | '오피스 스트레칭' | '마인드풀니스'>('전체');

  return (
    <div className="inline-flex flex-col w-full gap-3 items-start md:mb-2">
      <div className="flex items-start gap-3 relative mb-2">
        <div className="flex flex-col items-start gap-2">
          <div
            onClick={() => setMainTab('달램 핏')}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span
              className={clsx(
                mainTab === '달램 핏' && 'text-lg font-semibold',
                'transition-all duration-500 linear',
              )}
            >
              달램 핏
            </span>
            <DallaemFitIcon
              className={clsx(
                mainTab === '달램 핏' ? 'text-gray-900' : 'text-gray-400',
                'transition-colors duration-500 linear',
              )}
            />
          </div>
        </div>

        <div
          onClick={() => setMainTab('워케이션')}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span
            className={clsx(
              mainTab === '워케이션' && 'text-lg font-semibold',
              'transition-all duration-500 linear',
            )}
          >
            워케이션
          </span>
          <Workation
            className={clsx(
              mainTab === '워케이션' ? 'text-gray-900' : 'text-gray-400',
              'transition-colors duration-500 linear',
            )}
          />
        </div>

        {/* TabsUnderline 애니메이션 추가 */}
        <TabsUnderline
          className={clsx(
            'absolute -bottom-2 h-1 transition-transform duration-300 linear',
            mainTab === '달램 핏'
              ? 'w-20 transform translate-x-0'
              : 'w-100pxr transform translate-x-full',
          )}
        />
      </div>
      <AnimatePresence>
        {mainTab === '달램 핏' && (
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
                  onClick={() => setSubTab('전체')}
                  color={subTab === '전체' ? 'navy' : 'gray'}
                  size="lg"
                >
                  전체
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setSubTab('오피스 스트레칭')}
                  color={subTab === '오피스 스트레칭' ? 'navy' : 'gray'}
                  size="lg"
                >
                  오피스 스트레칭
                </Chip>
                <Chip
                  className="transition-colors duration-500 linear"
                  onClick={() => setSubTab('마인드풀니스')}
                  color={subTab === '마인드풀니스' ? 'navy' : 'gray'}
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
