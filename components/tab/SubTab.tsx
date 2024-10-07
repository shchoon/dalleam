'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useFilterStore from '@/stores/filterStore';
import { gatheringsSubTab } from '@/lib/constants';
import Stroke from '/public/icons/stroke.svg';
import Chip from '../chip/Chip';

export default function SubTab() {
  const { type, setType } = useFilterStore();
  return (
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
              {gatheringsSubTab.map((el, idx) => (
                <Chip
                  key={idx}
                  className="transition-colors duration-500 linear"
                  onClick={() => setType(el)}
                  color={type === el ? 'navy' : 'gray'}
                  size="lg"
                >
                  {el === 'DALLAEMFIT'
                    ? '전체'
                    : el === 'MINDFULNESS'
                      ? '마인드풀니스'
                      : '오피스 스트레칭'}
                </Chip>
              ))}
            </div>
            <Stroke className="w-full" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
