import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonCard() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 self-stretch">
      {/* 리뷰 이미지 */}
      <div className="flex justify-center items-center ">
        <div className="relative w-310pxr h-170pxr">
          <Skeleton width="100%" height="100%" style={{ borderRadius: '24px' }} />
        </div>
      </div>
      {/* 리뷰 정보 */}
      <div className="flex h-42 flex-col justify-between items-start self-stretch lg:flex-1 lg:basis-0 lg:shrink-0">
        <div className="flex flex-col items-start gap-2 lg:gap-3 self-stretch">
          <div className="flex flex-col items-start gap-10pxr self-stretch">
            {/* 하트 */}
            <div className="flex flex-start gap-2pxr">
              {Array.from({ length: 5 }).map((_, idx) => (
                <span key={idx} className="w-6 h-6">
                  <Skeleton inline width="100%" height="100%" />
                </span>
              ))}
            </div>
            {/* 설명 */}
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="w-311pxr md:w-344pxr lg:w-644pxr h-20pxr">
                <Skeleton inline width="100%" height="100%" />
              </div>
            ))}
            {/* 주소 */}
            <div className="flex items-center gap-6pxr">
              <div className="w-186pxr h-4">
                <Skeleton inline width="100%" height="100%" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6">
              <Skeleton inline width="100%" height="100%" />
            </span>
            <span className="w-42pxr h-6">
              <Skeleton inline width="100%" height="100%" />
            </span>
            <span className="w-62pxr h-6">
              <Skeleton inline width="100%" height="100%" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
