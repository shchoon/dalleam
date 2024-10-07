import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonFilter() {
  return (
    <div className="inline-flex gap-4 items-center mb-24pxr md:mb-46pxr">
      <span className="w-72pxr h-72pxr">
        <Skeleton width="100%" height="100%" style={{ borderRadius: '100%' }} />
      </span>
      <div className="flex flex-col items-start gap-2">
        <div className="w-67pxr md:w-89pxr h-7 md:h-8">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="w-249pxr h-5">
          <Skeleton width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
}
