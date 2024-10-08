'use client';

import React, { Suspense, useEffect } from 'react';
import SkeletonFilter from './SkeletonFilter';
import SkeletonScores from './SkeletonScores';
import SkeletonList from './SkeletonList';
import SkeletonTab from './SkeletonTab';

// use query로 데이터 받아오기
export default function SkeletonReviews() {
  return (
    <div className="bg-gray-50 justify-center min-h-screen py-24pxr md:py-46pxr px-3 lg:px-20 box-border lg:w-1200pxr flex-shrink-0">
      <SkeletonFilter />
      <SkeletonTab />
      <SkeletonScores />
      <SkeletonList />
    </div>
  );
}
