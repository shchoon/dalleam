'use client';

import React, { useEffect } from 'react';
import FillHeart from '/public/icons/gathering/fill_heart.svg';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';
import { useScoresQuery } from '@/services/reviews';
import useFilterStore from '@/stores/filterStore';
import Skeleton from 'react-loading-skeleton';
import SkeletonScores from './skeletonComponents/SkeletonScores';
import DeferredComponent from '@/components/DeferredComponent';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ReviewScores() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const { date, type, location, reviewSortBy } = useFilterStore();

  const { data, isLoading } = useScoresQuery(
    [['reviews', 'scores'], { type, date, location, sortBy: reviewSortBy }],
    type,
  );

  const newStars: [number, number, number, number, number] = data
    ? data.reduce(
        (acc, cur) => [
          acc[0] + cur.oneStar,
          acc[1] + cur.twoStars,
          acc[2] + cur.threeStars,
          acc[3] + cur.fourStars,
          acc[4] + cur.fiveStars,
        ],
        [0, 0, 0, 0, 0],
      )
    : [0, 0, 0, 0, 0];

  const totalReviews =
    newStars[0] + newStars[1] * 2 + newStars[2] * 3 + newStars[3] * 4 + newStars[4] * 5;
  const points = newStars[0] + newStars[1] + newStars[2] + newStars[3] + newStars[4];

  const averageScore = data ? data[0]?.averageScore : 0;

  useEffect(() => {
    const controls = animate(0, averageScore);
    return () => controls.stop();
  }, [averageScore, rounded]);

  return isLoading ? (
    <DeferredComponent>
      <SkeletonScores />
    </DeferredComponent>
  ) : (
    <div className="flex w-full h-180pxr justify-center shrink-0 bg-white border-y-2 border-gray-200 my-5">
      <div className="flex h-full w-294pxr justify-between md:w-full md:gap-120pxr md:justify-center items-center">
        {/* 하트 평균 점수 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-start gap-2pxr text-2xl font-semibold text-gray-900">
            <motion.span>{Math.round(!averageScore ? 0 : averageScore)}</motion.span>
            <span className="text-2xl font-semibold text-gray-400">/5</span>
          </div>
          <div className="flex items-start gap-2pxr">
            {Array.from({ length: 5 }, (_, idx) =>
              isLoading ? (
                <span key={idx} className="w-6 h-6">
                  <Skeleton inline width="100%" height="100%" />
                </span>
              ) : (
                <FillHeart
                  key={idx}
                  className={idx < Math.round(averageScore) ? 'text-red-500' : 'text-gray-400'}
                />
              ),
            )}
          </div>
        </div>

        {/* 별점 그래프 */}
        <div className="flex flex-col items-start gap-4pxr">
          {newStars.toReversed().map((el, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">{newStars.length - idx}점</span>
                <span className="w-84pxr md:w-60 lg:w-72 h-1 bg-gray-300 rounded-md relative">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: totalReviews ? el / points : 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ transformOrigin: 'left' }}
                    className="absolute top-0 left-0 w-full h-1 bg-black"
                  ></motion.span>
                </span>
              </div>
              <span className="text-sm font-medium text-gray-400">{el}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
