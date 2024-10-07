'use client';
import SkeletonCard from './SkeletonCard';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
export default function SkeletonList() {
  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        {/* 리뷰 드롭다운 Tab */}
        <div className="flex justify-between items-start self-stretch">
          <div className="flex items-start gap-2">
            <span className="w-110pxr h-10 md:h-46pxr md:w-122pxr py-6pxr">
              <Skeleton width="100%" height="100%" style={{ borderRadius: '24px' }} />
            </span>
            <span className="w-110pxr h-10 md:h-46pxr md:w-122pxr py-6pxr">
              <Skeleton width="100%" height="100%" style={{ borderRadius: '24px' }} />
            </span>
          </div>
          <span className="w-9 h-9 md:h-40pxr md:w-89pxr mt-2pxr">
            <Skeleton width="100%" height="100%" style={{ borderRadius: '12px' }} />
          </span>
        </div>
        {/* 리뷰 리스트 */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}
