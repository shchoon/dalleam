'use client';

import React, { useEffect } from 'react';
import FillHeart from '/public/icons/fill_heart.svg';
import { useMotionValue, useTransform, animate, motion } from 'framer-motion';

export default function ReviewPoints() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, 4);
    return () => controls.stop();
  }, []);

  return (
    <div className="flex w-full h-180pxr justify-center shrink-0 bg-white border-y-2 border-gray-200 my-5">
      <div className="flex h-full w-294pxr justify-between md:w-full md:gap-120pxr md:justify-center items-center">
        {/* 하트 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-start gap-2pxr text-2xl font-semibold text-gray-900">
            <motion.span>{rounded}</motion.span>.0
            <span className="text-2xl font-semibold text-gray-400">/5</span>
          </div>
          <div className="flex items-start gap-2pxr">
            <FillHeart className="text-red-500 animate-fFill-heart" />
            <FillHeart className="text-red-500 animate-fFill-heart" />
            <FillHeart className="text-red-500 animate-fFill-heart" />
            <FillHeart className="text-red-500 animate-fFill-heart" />
            <FillHeart className="text-gray-400 animate-fFill-heart" />
          </div>
        </div>
        {/* 그래프 */}
        <div className="flex flex-col items-start gap-4pxr">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">5점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <motion.span
                  initial={{ scaleX: 0 }} // 초기 값: scaleX 0 (너비 0)
                  animate={{ scaleX: 1 }} // 목표 값: scaleX 1 (너비 100%)
                  transition={{ duration: 0.8 }} // 애니메이션 지속 시간
                  style={{ transformOrigin: 'left' }} // 왼쪽을 기준으로 확장
                  className="absolute top-0 left-0 lg:w-52 h-1 bg-black"
                ></motion.span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">27</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">4점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <motion.span
                  initial={{ scaleX: 0 }} // 초기 값: scaleX 0 (너비 0)
                  animate={{ scaleX: 1 }} // 목표 값: scaleX 1 (너비 100%)
                  transition={{ duration: 0.8 }} // 애니메이션 지속 시간
                  style={{ transformOrigin: 'left' }} // 왼쪽을 기준으로 확장
                  className="absolute top-0 left-0 lg:w-60pxr h-1 bg-black"
                ></motion.span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">19</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">3점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <motion.span
                  initial={{ scaleX: 0 }} // 초기 값: scaleX 0 (너비 0)
                  animate={{ scaleX: 1 }} // 목표 값: scaleX 1 (너비 100%)
                  transition={{ duration: 0.8 }} // 애니메이션 지속 시간
                  style={{ transformOrigin: 'left' }} // 왼쪽을 기준으로 확장
                  className="absolute top-0 left-0 lg:w-3 h-1 bg-black"
                ></motion.span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">2</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">2점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <span className="absolute top-0 left-0 h-1 bg-black"></span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">0</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">1점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <span className="absolute top-0 left-0 h-1 bg-black"></span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
