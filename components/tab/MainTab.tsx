'use client';

import React, { useEffect } from 'react';
import { gatheringsMainTab } from '@/lib/constants';
import DallaemFitIcon from '/public/icons/dallaem_fit_icon.svg';
import Workation from '/public/icons/workation_icon.svg';
import clsx from 'clsx';
import useFilterStore from '@/stores/filterStore';
import TabsUnderline from '/public/icons/tabs_underline.svg';

export default function MainTab() {
  const { type, setType, resetFilters } = useFilterStore();
  useEffect(() => {
    resetFilters();
    return () => resetFilters();
  }, []);
  return (
    <div className="flex items-start gap-3 relative mb-2">
      {gatheringsMainTab.map((el, idx) => (
        <div key={idx} className="flex flex-col items-start gap-2">
          <div
            onClick={() => {
              el === 'DALLAEMFIT' ? resetFilters() : setType('WORKATION');
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <span
              className={clsx(
                (el === 'DALLAEMFIT' ? type !== 'WORKATION' : type === 'WORKATION') &&
                  'text-lg font-semibold',
                'transition-all duration-500 linear',
              )}
            >
              {el === 'DALLAEMFIT' ? '달램 핏' : '워케이션'}
            </span>
            {el === 'DALLAEMFIT' ? (
              <DallaemFitIcon
                className={clsx(
                  type !== 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
                  'transition-colors duration-500 linear',
                )}
              />
            ) : (
              <Workation
                className={clsx(
                  type === 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
                  'transition-colors duration-500 linear',
                )}
              />
            )}
          </div>
        </div>
      ))}
      <TabsUnderline
        className={clsx(
          'absolute -bottom-2 h-1 transition-transform duration-300 linear',
          type !== 'WORKATION'
            ? 'w-20 transform translate-x-0'
            : 'w-100pxr transform translate-x-full',
        )}
      />
    </div>
  );
}
