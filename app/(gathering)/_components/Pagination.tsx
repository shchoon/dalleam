import React, { Dispatch, SetStateAction } from 'react';
import RightArrow from '/public/icons/pagination/arrow-right.svg';
import LeftArrow from '/public/icons/pagination/arrow-left.svg';
import { Pagination, PaginationItemType, PaginationItemRenderProps } from '@nextui-org/pagination';
import { cn } from '@/utils/className';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
};

const CustomPagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    const isNextDisabled = currentPage === totalPages;
    const isPrevDisabled = currentPage === 1;

    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8', {
            'opacity-50 cursor-not-allowed': isNextDisabled,
          })}
          onClick={onNext}
          disabled={isNextDisabled}
        >
          <RightArrow />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, 'bg-default-200/50 min-w-8 w-8 h-8', {
            'opacity-50 cursor-not-allowed': isPrevDisabled,
          })}
          onClick={onPrevious}
          disabled={isPrevDisabled}
        >
          <LeftArrow />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    // 기본 버튼 목록
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive ? 'text-white bg-black font-bold rounded-xl' : 'text-black',
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      showControls
      onChange={onPageChange}
      showShadow
      color="warning"
      total={totalPages}
      initialPage={currentPage}
      renderItem={renderItem}
      classNames={{
        wrapper: 'justify-center',
      }}
    />
  );
};

export default CustomPagination;
