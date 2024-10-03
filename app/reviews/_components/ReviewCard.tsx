import React from 'react';
import FillHeart from '/public/icons/fill_heart.svg';
import DefaultProfile from '/public/icons/DefaultProfile.svg';
import Vector from '/public/icons/Vector.svg';
import Image from 'next/image';

export default function ReviewCard() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 self-stretch">
      {/* 리뷰 이미지 */}
      <div className="flex pt-px pl-px justify-center items-center rounded-3xl">
        <div className="relative w-310pxr h-170pxr bg-cover bg-center bg-no-repeat">
          <Image src="/card-image.png" alt="Image" fill className="object-cover" />
        </div>
      </div>
      {/* 리뷰 정보 */}
      <div className="flex h-42 flex-col justify-between items-start self-stretch lg:flex-1 lg:basis-0 lg:shrink-0">
        <div className="flex flex-col items-start gap-2 lg:gap-3 self-stretch">
          <div className="flex flex-col items-start gap-10pxr self-stretch">
            {/* 하트 */}
            <div className="flex flex-start gap-2pxr">
              <FillHeart className="text-red-500" />
              <FillHeart className="text-red-500" />
              <FillHeart className="text-red-500" />
              <FillHeart className="text-red-500" />
              <FillHeart className="text-red-500" />
            </div>
            {/* 설명 */}
            <span className="text-sm font-base text-gray-700 font-base">
              따듯하게 느껴지는 공간이에요 :) 평소에 달램 이용해보고 싶었는데 이렇게 같이 달램
              생기니까 너무 좋아요! 프로그램이 더 많이 늘어났으면 좋겠어요.
            </span>
            {/* 주소 */}
            <div className="flex items-center gap-6pxr">
              <div className="w-198pxr h-4">
                <span className="text-xs font-base">달램핏 오피스 스트레칭 · 을지로 3가</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 my-2">
              <DefaultProfile className="w-6 h-6" />
              <span className="text-xs font-base text-gray-700">럽윈즈올</span>
              <span className="text-xs font-base text-gray-700">|</span>
            </div>
            <span className="text-xs font-base text-gray-500">2024.01.25</span>
          </div>
        </div>
        <Vector className="w-311pxr lg:w-644pxr h-2pxr my-3 text-gray-200" />
      </div>
    </div>
  );
}
