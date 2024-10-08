import React from 'react';
import FillHeart from '/public/icons/gathering/fill_heart.svg';
import DefaultProfile from '/public/icons/DefaultProfile.svg';
import Vector from '/public/icons/Vector.svg';
import Image from 'next/image';
import { Review } from '@/lib/definition';
import { GatheringType } from '@/lib/definition';

type props = Review & { isMyPage: boolean };

export default function ReviewCard({ isMyPage, ...review }: props) {
  const convertType = (type: GatheringType) => {
    switch (type) {
      case 'OFFICE_STRETCHING':
        return '달램핏 오피스 스트레칭 이용';
      case 'MINDFULNESS':
        return '달램핏 마인드풀니스 이용';
      case 'WORKATION':
        return '달램핏 워케이션 이용';
    }
  };
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 self-stretch">
      {/* 리뷰 이미지 */}
      <div className="flex pt-px pl-px justify-center items-center ">
        <div className="relative w-310pxr h-170pxr bg-cover bg-center bg-no-repeat">
          <Image
            src={review?.Gathering.image ? review.Gathering.image : '/card-image.png'}
            alt="Image"
            fill
            className="object-cover rounded-3xl"
          />
        </div>
      </div>
      {/* 리뷰 정보 */}
      <div className="flex h-42 flex-col justify-between items-start self-stretch lg:flex-1 lg:basis-0 lg:shrink-0">
        <div className="flex flex-col items-start gap-2 lg:gap-3 self-stretch">
          <div className="flex flex-col items-start gap-10pxr self-stretch">
            {/* 하트 */}
            <div className="flex flex-start gap-2pxr">
              {Array.from({ length: review.score }).map((_, index) => (
                <FillHeart key={index} className="text-red-500 animate-fFill-heart" />
              ))}
              {Array.from({ length: 5 - review.score }).map((_, index) => (
                <FillHeart key={index} className="text-gray-400 animate-fFill-heart" />
              ))}
            </div>
            {/* 설명 */}
            <div className="w-311pxr lg:w-full md:500pxr break-words text-sm font-base text-gray-700 font-base">
              {review.comment}
            </div>
            {/* 주소 */}
            <div className="flex items-center gap-6pxr">
              <div className="w-198pxr h-4">
                <span className="text-xs font-base">
                  {convertType(review.Gathering.type)} · {review.Gathering.location}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isMyPage && (
              <div className="flex items-center gap-2 my-2">
                <DefaultProfile className="w-6 h-6" />
                <span className="text-xs font-base text-gray-700">럽윈즈올</span>
                <span className="text-xs font-base text-gray-700">|</span>
              </div>
            )}
            <span className="text-xs font-base text-gray-500">{review.createdAt}</span>
          </div>
        </div>
        <Vector className="w-full" />
      </div>
    </div>
  );
}
