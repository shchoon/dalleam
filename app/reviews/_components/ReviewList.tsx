import Chip from '@/components/chip/Chip';
import Image from 'next/image';
import React from 'react';
import ReviewCard from './ReviewCard';

export default function ReviewList() {
  return (
    <div className="flex w-full py-6 px-4 lg:p-6 flex-col items-start gap-10pxr bg-white border-t-2 border-gray-900">
      <div className="flex flex-col items-start gap-6 self-stretch">
        {/* 리뷰 드롭다운 Tab */}
        <div className="flex justify-between items-start self-stretch">
          <div className="flex items-start gap-2">
            <Chip className="border-2 border-gray-100" color="white" size="sm">
              지역 선택&nbsp; ▼
            </Chip>
            <Chip className="border-2 border-gray-100" color="white" size="sm">
              날짜 선택&nbsp; ▼
            </Chip>
          </div>
          <span className="flex p-6pxr flex-col items-start gap-10pxr rounded-xl border-2 border-gray-100 bg-white">
            ↑↓
          </span>
        </div>
        {/* 리뷰 리스트 */}
        <div className="flex flex-col items-start gap-6 self-stretch">
          {/* 단일 리뷰 */}
          <ReviewCard />
        </div>
      </div>
    </div>
  );
}
