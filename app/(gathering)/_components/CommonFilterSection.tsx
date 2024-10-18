'use client';

import React from 'react';

import DallaemFit from '/public/icons/gathering/dallaem_fit.svg';
import Workation from '/public/icons/gathering/workation.svg';
import UnderLineG from '/public/icons/gathering/underline_gray.svg';
import UnderLineB from '/public/icons/gathering/underline_black.svg';

import CreateMeetingButton from './CreateMeetingButton';
import DateFilter from '@/components/filter/DateFilter';
import TypeFilter from '@/components/filter/TypeFilter';
import LocationFilter from '@/components/filter/LocationFilter';
import SortByFilter from '@/components/filter/SortByFilter';
import useFilterStore from '@/stores/filterStore';
import clsx from 'clsx';

const CommonFilterSection = () => {
  const { setType, type } = useFilterStore();
  return (
    <div className="flex flex-col gap-2 mt-13pxr">
      <div className="flex justify-between">
        <div className="flex gap-3 relative">
          <DallaemFit
            data-cy="dallaem-fit-filter"
            className={clsx(
              'cursor-pointer transition-colors duration-500 linear',
              type === 'WORKATION' ? 'text-gray-400' : '',
            )}
            onClick={() => setType('DALLAEMFIT')}
          />
          <Workation
            data-cy="workation-filter"
            className={clsx(
              'cursor-pointer transition-colors duration-500 linear',
              type === 'WORKATION' ? 'text-gray-900' : 'text-gray-400',
            )}
            onClick={() => setType('WORKATION')}
          />
          <UnderLineB
            className={clsx(
              'absolute bottom-0 transition-transform duration-700 ease-in-out',
              type !== 'WORKATION'
                ? 'transform translate-x-0'
                : 'w-100pxr transform translate-x-full',
            )}
          />
        </div>

        <CreateMeetingButton />
      </div>

      <div>
        <TypeFilter />
        <UnderLineG className="w-full mt-4 mb-3 md:mb-4" />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <LocationFilter />
            <DateFilter />
          </div>
          <SortByFilter />
        </div>
      </div>
    </div>
  );
};

export default CommonFilterSection;
