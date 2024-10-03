'use client';

import React from 'react';

import Head from '/public/icons/switch.svg';

import Dropdown from '../Dropdown';
import useDropdown from '@/hooks/useDropDown';
import useFilterStore from '@/stores/filterStore';
import { reviewStore, sortType } from '@/stores/reviewStore';

const filters = ['마감 임박', '참여 인원 순'];
const reviewFilters = ['최신 순', '리뷰 높은 순', '참여 인원 순'];

const SortByFilter = ({ isReviewPage }: { isReviewPage?: boolean }) => {
  const { dropdownRef, handleOpenDropdown } = useDropdown();
  let renderingFilter = isReviewPage ? reviewFilters : filters;
  const { setSortBy, sortBy } = useFilterStore();
  const { setSortTab, sortTab } = reviewStore();

  return (
    <div>
      <div
        className="flex items-center gap-3pxr border-2 justify-center border-gray-100 border-solid cursor-pointer p-6pxr md:py-2 md:px-3 rounded-xl w-9 md:w-130pxr md:h-10"
        onClick={() => handleOpenDropdown()}
      >
        <Head className="size-6" />
        <div className="hidden text-sm font-medium text-gray-800 md:block">
          {isReviewPage ? sortTab : sortBy}
        </div>
      </div>
      <Dropdown
        ref={dropdownRef}
        liClassName="border-none hover:bg-orange-100 cursor-pointer rounded-xl w-110pxr"
        ulClassName="top-8pxr right-0 md:top-8pxr text-sm font-medium text-gray-800"
      >
        {renderingFilter.map((filter) => (
          <span
            key={filter}
            onClick={() => (isReviewPage ? setSortTab(filter as sortType) : setSortBy(filter))}
          >
            {filter}
          </span>
        ))}
      </Dropdown>
    </div>
  );
};

export default SortByFilter;
