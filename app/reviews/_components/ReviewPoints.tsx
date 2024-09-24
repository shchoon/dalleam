import React from 'react';
import FillHeart from '/public/icons/fill_heart.svg';


export default function ReviewPoints() {
  return (
    <div className="flex w-full h-180pxr justify-center shrink-0 bg-white border-y-2 border-gray-200 my-5">
      <div className="flex h-full w-294pxr justify-between md:w-full md:gap-120pxr md:justify-center items-center">
        {/* 하트 */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-start gap-2pxr">
            <span className="text-2xl font-semibold text-gray-900">4.0</span>
            <span className="text-2xl font-semibold text-gray-400">/5</span>
          </div>
          <div className="flex items-start gap-2pxr">
            <FillHeart className="text-red-500" />
            <FillHeart className="text-red-500" />
            <FillHeart className="text-red-500" />
            <FillHeart className="text-red-500" />
            <FillHeart className="text-gray-400" />
          </div>
        </div>
        {/* 그래프 */}
        <div className="flex flex-col items-start gap-4pxr">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">5점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <span className="absolute top-0 left-0 w-70pxr lg:w-52 h-1 bg-black"></span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">27</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">4점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <span className="absolute top-0 left-0 w-60pxr lg:w-52 h-1 bg-black"></span>
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">19</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">3점</span>
              <span className="w-84pxr lg:w-60 h-1 bg-gray-300 rounded-md relative">
                <span className="absolute top-0 left-0 w-2 lg:w-3 h-1 bg-black"></span>
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
