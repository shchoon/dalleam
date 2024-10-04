'use client';

import React from 'react';
import Head from '/public/icons/switch.svg';
import Dropdown from '../Dropdown';
import useDropdown from '@/hooks/useDropDown';
import useFilterStore from '@/stores/filterStore';
import { sortType } from '@/lib/definition';

const SortByFilter = ({ isReviewPage }: { isReviewPage?: boolean }) => {
  const filters: sortType[] = isReviewPage
    ? ['최신 순', '리뷰 높은 순', '참여 인원 순']
    : ['마감 임박', '참여 인원 순'];
  const { dropdownRef, handleOpenDropdown } = useDropdown();
  const { setSortBy, sortBy, setReviewSortBy, reviewSortBy } = useFilterStore();

  return (
    <div>
      <div
        className="flex items-center gap-3pxr border-2 justify-center border-gray-100 border-solid cursor-pointer p-6pxr md:py-2 md:px-3 rounded-xl w-9 md:w-130pxr md:h-10"
        onClick={() => handleOpenDropdown()}
      >
        <Head className="size-6" />
        <div className="hidden text-sm font-medium text-gray-800 md:block">
          {isReviewPage ? reviewSortBy : sortBy}
        </div>
      </div>
      <Dropdown
        ref={dropdownRef}
        liClassName="border-none hover:bg-orange-100 cursor-pointer rounded-xl w-110pxr"
        ulClassName="top-8pxr right-0 md:top-8pxr text-sm font-medium text-gray-800"
      >
        {filters.map((filter) => (
          <span
            key={filter}
            onClick={() => (isReviewPage ? setReviewSortBy(filter) : setSortBy(filter))}
          >
            {filter}
          </span>
        ))}
      </Dropdown>
    </div>
  );
};

export default SortByFilter;
