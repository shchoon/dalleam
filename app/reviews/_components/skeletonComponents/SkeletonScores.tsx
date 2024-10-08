import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonScores() {
  return (
    <div className="flex w-full h-180pxr justify-center shrink-0 bg-white border-y-2 border-gray-200 my-5">
      <div className="flex h-full w-294pxr justify-between md:w-full md:gap-120pxr md:justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-start gap-2pxr text-2xl font-semibold text-gray-900">
            <Skeleton width="30px" height="24px" />
            <Skeleton width="30px" height="24px" />
          </div>
          <div className="flex items-start gap-2pxr">
            {Array.from({ length: 5 }, (_, idx) => (
              <span key={idx} className="w-6 h-6">
                <Skeleton inline width="100%" height="100%" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4pxr">
          {Array.from({ length: 5 }, (_, idx) => (
            <div key={idx} className="w-146pxr md:w-302pxr h-20pxr">
              <Skeleton height="100%" width="100%" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
