import React from 'react';
import Review from '/public/icons/review.svg';
import ReviewsTabs from './ReviewsTabs';
import ReviewPoints from './ReviewPoints';
import ReviewList from './ReviewList';

export default function Reviews() {
  return (
    <div className="flex flex-col items-center bg-gray-100">
      <div className="bg-gray-50 justify-center min-h-screen py-24pxr md:py-46pxr px-3 lg:px-20 box-border lg:w-1200pxr lg:h-1021pxr flex-shrink-0">
        {/* 리뷰 헤더 */}
        <div className="inline-flex gap-4 items:center mb-24pxr md:mb-46pxr">
          <Review />
          <div className="flex flex-col items-start gap-2">
            <div className="text-lg md:text-2xl font-semibold text-gray-900">모든 리뷰</div>
            <div className="text-sm font-medium">같이달램을 이용한 분들은 이렇게 느꼈어요</div>
          </div>
        </div>
        <ReviewsTabs />
        <ReviewPoints />
        <ReviewList />
      </div>
    </div>
  );
}
