'use client';
import React from 'react';
import { useEffect, useState } from 'react';

import Saved from '../animation/saved/Saved';
import ExpandLine from '../animation/expandLine/ExpandLine';
import Profile from '../profile/Profile';
import { formatDateTime } from '@/utils/gathering';
import { Gathering } from '@/types/types';
import CountAnimation from '../animation/count/Count';

import VectorIcon from '/public/icons/Vector.svg';
import CheckedIcon from '/public/icons/Checked.svg';

type ParticipantInfo = {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image: null | string;
  };
};

export default function Container({ gatheringDetails }: { gatheringDetails: Gathering }) {
  const [profileImages, setProfileImages] = useState<string[]>([]);

  useEffect(() => {
    /* 특정 모임의 참가자 목록 조회 API 요청하고 받은 데이터 아래 코드로 포맷 */
    // const imageList = testParticipants
    //   .map((data) => data.User.image)
    //   .filter((image) => image !== null);
    // while (imageList.length < gatheringDetails.participantCount) {
    //   imageList.push('defaultProfile');
    // }
    // setProfileImages(imageList);
  }, []);

  return (
    <div className="w-347pxr h-244pxr md:w-344pxr lg:w-490pxr lg:h-274pxr py-6 border-2 border-gray-200 rounded-3xl">
      <div className="flex flex-col gap-3 lg:gap-6">
        <div className="flex flex-col justify-between min-h-111pxr lg:min-h-129pxr">
          <div className="flex px-6 justify-between">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-0.5">
                <span className="text-lg font-semibold ">{gatheringDetails.name}</span>
                <span className="text-sm font-medium max-w-211pxr lg:max-w-374pxr">
                  {gatheringDetails.location}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-sm px-2 py-0.5 font-medium bg-gray-900 text-white rounded">
                  {formatDateTime(gatheringDetails.dateTime)?.formattedDate}
                </span>
                <span className="text-sm px-2 py-0.5 font-medium bg-gray-900 text-orange-600 rounded">
                  {formatDateTime(gatheringDetails.dateTime)?.formattedTime}
                </span>
              </div>
            </div>
            <Saved gatheringId={gatheringDetails.id} />
          </div>
          <VectorIcon className="w-full h-1/2" />
        </div>
        <div className="px-6 flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1.5 text-sm font-semibold">
                  <span>모집 정원</span>
                  <span>{CountAnimation(gatheringDetails.participantCount)}명</span>
                </div>
                {/* profile images */}
                <div className="group relative flex -space-x-2.5">
                  {profileImages.map((profile, i) => {
                    return (
                      <div key={i}>
                        {i < 4 && (
                          <Profile
                            usedIn="container"
                            image={profile === 'defaultProfile' ? null : profile}
                          />
                        )}
                      </div>
                    );
                  })}
                  {gatheringDetails.participantCount > 4 && (
                    <div className="w-29pxr h-29pxr flex items-center justify-center bg-gray-100 rounded-full -ml-2.5">
                      <span
                        className="text-sm font-semibold
                 text-gray-800"
                      >
                        +{gatheringDetails.participantCount - 4}
                      </span>
                    </div>
                  )}
                  <div className="absolute hidden group-hover:block z-10 top-28pxr w-150pxr p-2 rounded-md min-h-10 max-h-120pxr bg-gray-50 overflow-y-auto scrollbar">
                    <div className="grid grid-cols-4 gap-1">
                      {profileImages.map((profile, i) => {
                        return (
                          <Profile
                            key={i}
                            usedIn="container"
                            image={profile === 'defaultProfile' ? null : profile}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {gatheringDetails.participantCount >= 5 && (
                <div data-testid="checkIsOpen" className="flex gap-1 items-end">
                  <CheckedIcon className="w-6 h-6" />
                  <span className="text-sm text-orange-500 leading-6">개설확정</span>
                </div>
              )}
            </div>
            {/* Line */}
            <ExpandLine
              capacity={gatheringDetails.capacity}
              participant={gatheringDetails.participantCount}
            />
          </div>
          <div className="flex justify-between text-xs font-medium">
            <div className="flex gap-1.5">
              <span>최소인원</span>
              <span>5명</span>
            </div>
            <div
              className={`flex gap-1.5 ${gatheringDetails.participantCount == gatheringDetails.capacity ? 'text-orange-400' : 'text-gray-700'}`}
            >
              <span>최대인원</span>
              <span>{gatheringDetails.capacity}명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
