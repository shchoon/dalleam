import React from 'react';
import RightArrow from '/public/icons/pagination/pagination-arrow-right.svg';
import LeftArrow from '/public/icons/pagination/pagination-arrow-left.svg';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const getPagesToShow = () => {
    const pages = [];

    if (totalPages <= 7) {
      // 페이지가 7 이하일 경우
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 페이지가 8 이상일 경우
      pages.push(1); // 첫 페이지 추가

      if (currentPage > 4) {
        pages.push('...'); // 생략 표시 추가
      }

      // 현재 페이지 주변 페이지 추가
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push('...'); // 생략 표시 추가
      }

      pages.push(totalPages); // 마지막 페이지 추가
    }

    return pages;
  };

  const pagesToShow = getPagesToShow();

  return (
    <div className="flex justify-center gap-2">
      {/* 왼쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`disabled:cursor-not-allowed ${currentPage === 1 ? 'text-[#C4C4C4]' : 'text-[#1F1F1F]'}`}
      >
        <LeftArrow />
      </button>

      {/* 페이지 번호 */}
      {pagesToShow.map((page, index) => (
        <button
          key={index}
          className={`px-3 py-1 text-sm lg:text-base font-semibold ${page === currentPage ? 'text-[#1F1F1F]' : 'text-[#C4C4C4]'}`}
          onClick={() => typeof page === 'number' && onPageChange(page)} // 숫자일 경우에만 페이지 변경
        >
          {page}
        </button>
      ))}

      {/* 오른쪽 화살표 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`disabled:cursor-not-allowed ${currentPage === totalPages ? 'text-[#C4C4C4]' : 'text-[#1F1F1F]'}`}
      >
        <RightArrow />
      </button>
    </div>
  );
};

export default Pagination;
