import React from 'react';

import Heart from '/public/icons/gathering/type_saved.svg';

import CommonFilterSection from '../_components/CommonFilterSection';
import SavedProgressCardList from '../_components/SavedProgressCardList';

const savedGatheringPage = () => {
  return (
    <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 pb-12pxr max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pb-45pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-4">
          <Heart />
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-semibold text-gray-900">찜한 모임</span>
            <span className="text-sm font-medium text-gray-700">
              마감되기 전에 지금 바로 참여해보세요 👀
            </span>
          </div>
        </div>
        <CommonFilterSection />
        <SavedProgressCardList />
      </div>
    </div>
  );
};

export default savedGatheringPage;
