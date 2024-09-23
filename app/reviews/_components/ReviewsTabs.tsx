import Chip from '@/components/chip/Chip';
import React from 'react';
import DallaemFitIcon from '/public/icons/dallaem_fit_icon.svg';
import Workation from '/public/icons/workation_icon.svg';
import Stroke from '/public/icons/stroke.svg';

export default function ReviewsTabs() {
  return (
    <div className="inline-flex flex-col w-full gap-3 items-start">
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">달램 핏</span>
            <DallaemFitIcon />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="83"
            height="2"
            viewBox="0 0 83 2"
            fill="none"
          >
            <path
              d="M0 1C0 0.447715 0.447715 0 1 0H82C82.5523 0 83 0.447715 83 1C83 1.55228 82.5523 2 82 2H0.999999C0.447715 2 0 1.55228 0 1Z"
              fill="#111827"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-400">워케이션</span>
          <Workation />
        </div>
      </div>
      <div className="flex flex-col w-full items-start gap-3">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div className="flex items-start gap-2">
            <Chip color="navy" size="lg">
              전체
            </Chip>
            <Chip color="gray" size="lg">
              오피스 스트레칭
            </Chip>
            <Chip color="gray" size="lg">
              마인드풀니스
            </Chip>
          </div>
          <Stroke className="w-full" />
        </div>
      </div>
    </div>
  );
}
