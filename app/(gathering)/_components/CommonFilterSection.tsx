'use client';

import React from 'react';

import Person from '/public/icons/black-people2.svg';
import Umbrella from '/public/icons/umbrella.svg';
import UnderLineG from '/public/icons/underline-gray.svg';

import CreateMeetingButton from './CreateMeetingButton';
import DateFilter from '@/components/filter/DateFilter';
import TypeFilter from '@/components/filter/TypeFilter';
import LocationFilter from '@/components/filter/LocationFilter';
import SortByFilter from '@/components/filter/SortByFilter';
import useFilterStore from '@/stores/filterStore';

const CommonFilterSection = () => {
  const { setType } = useFilterStore();
  return (
    <div className="flex flex-col gap-2 mt-13pxr">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Person className="cursor-pointer" onClick={() => setType('DALLAEMFIT')} />
          <Umbrella className="cursor-pointer" onClick={() => setType('WORKATION')} />
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
