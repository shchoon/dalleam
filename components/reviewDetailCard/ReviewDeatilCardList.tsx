'use client';
import React, { useState } from 'react';

import ReviewDetailCard from './ReviewDetailCard';
import Pagination from '../pagination/Pagination';
import { Review } from '@/types/types';

const REVIEWS_PER_PAGE = 4;

const ReviewDeatilCardList = ({ reviews }: { reviews: Review[] }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE); // 전체 페이지 수 계산

  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="space-y-4 bg-white w-full">
      {currentReviews.map((review) => (
        <ReviewDetailCard review={review} key={review.id} />
      ))}
      {reviews.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">아직 리뷰가 없어요</p>
        </div>
      )}

      {/* 페이지네이션 */}
      <Pagination currentPage={currentPage} totalPages={8} onPageChange={handlePageChange} />
    </div>
  );
};

export default ReviewDeatilCardList;
