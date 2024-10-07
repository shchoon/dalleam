import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function SkeletonTab() {
  return (
    <>
      <div className="flex items-start gap-3 relative mb-2">
        <Skeleton width={83} height={38} style={{ borderRadius: '12px' }} />
        <Skeleton width={99} height={38} style={{ borderRadius: '12px' }} />
      </div>
      <div className="flex flex-col items-start gap-4 self-stretch">
        <div className="flex items-start gap-2">
          <span className="w-49pxr md:w-57pxr h-36pxr md:h-40pxr">
            <Skeleton width="100%" height="100%" style={{ borderRadius: '12px' }} />
          </span>
          <span className="w-113pxr md:w-121pxr h-36pxr md:h-40pxr">
            <Skeleton width="100%" height="100%" style={{ borderRadius: '12px' }} />
          </span>
          <span className="w-97pxr md:w-105pxr h-36pxr md:h-40pxr">
            <Skeleton width="100%" height="100%" style={{ borderRadius: '12px' }} />
          </span>
        </div>
      </div>
    </>
  );
}
