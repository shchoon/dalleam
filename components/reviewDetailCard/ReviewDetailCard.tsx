import React from 'react';

import Heart from '/public/icons/fill_heart.svg';
import Profile from '/public/icons/DefaultMyProfile.svg';
import Stroke from '/public/icons/line.svg';

import { format } from 'date-fns';
import { Review } from '@/types/types';

const ReviewDetailCard = ({ review }: { review: Review }) => {
  const formattedDate = format(new Date(review.createdAt), 'yyyy.MM.dd');

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 lg:gap-10pxr">
          <div className="flex gap-2pxr">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Heart
                  key={index}
                  className={index < review.score ? 'text-red-500' : 'text-gray-300'}
                />
              ))}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 break-words">{review.comment}</p>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2">
            <Profile className="size-6" />
            <span className="text-xs font-medium text-gray-700">{review.User.name}</span>
            <span className="text-xs font-medium text-gray-700">|</span>
          </div>
          <div className="flex items-center text-xs font-medium text-gray-500">{formattedDate}</div>
        </div>
      </div>

      <Stroke className="w-full" />
    </div>
  );
};

export default ReviewDetailCard;
