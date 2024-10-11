'use client';
import React, { useState } from 'react';

import ReviewDetailCard from './ReviewDetailCard';

import { Review } from '@/lib/definition';
import CustomPagination from '../Pagination';

const REVIEWS_PER_PAGE = 4;

const ReviewDetailCardList = ({ reviews }: { reviews: Review[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = Math.ceil(reviews.length / REVIEWS_PER_PAGE);

  const currentReviews = reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE,
  );

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
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ReviewDetailCardList;
