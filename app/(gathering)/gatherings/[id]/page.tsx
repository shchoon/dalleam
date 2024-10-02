import React from 'react';
import Image from 'next/image';

import Container from '@/components/container/Container';
import DeadlineBadge from '@/components/progressCard/DeadlineBadge';
import ReviewDeatilCardList from '@/components/reviewDetailCard/ReviewDeatilCardList';

import { fetchDetailGathering, fetchDetailReviews, fetchJoinedGatheringIds } from '@/lib/data';
import ActionButtons from '../../_components/ActionButtons';
import { mockGatheringReviews } from '@/lib/placeholder-data';

const GatheringDetail = async ({ params }: { params: { id: number } }) => {
  const id = Number(params.id); // 모임 id

  const { data: gatheringData, errorMessage: gatheringErrorMessage } =
    await fetchDetailGathering(id);

  const { data: reviewData, errorMessage: reviewErrorMessage } = await fetchDetailReviews(id);

  const { data: joinedGathering, errorMessage } = await fetchJoinedGatheringIds(id);

  if (gatheringErrorMessage) {
    return (
      <div className="font-semibold text-red-500">
        <p>{gatheringErrorMessage}</p>
      </div>
    );
  }

  if (reviewErrorMessage) {
    return (
      <div className="font-semibold text-red-500">
        <p>{reviewErrorMessage}</p>
      </div>
    );
  }

  if (!joinedGathering) {
    return <p>참여자 목록이 존재하지 않습니다.</p>;
  }

  if (!gatheringData) {
    return <p>모임 정보가 존재하지 않습니다.</p>;
  }

  // 추가 정보 처리
  const gatheringHost = gatheringData.createdBy;
  const isFull = gatheringData.capacity === gatheringData.participantCount;

  const actionButtonProps = {
    isFull,
    hostId: gatheringHost,
    gatheringId: id,
    joinedGatheringIds: joinedGathering.map(({ userId }) => userId),
  };

  return (
    <>
      <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative w-343pxr h-180pxr md:w-340pxr md:h-240pxr lg:w-486pxr lg:h-270pxr">
              <Image src="/card-image2.png" alt="Image" fill className="object-cover rounded-3xl" />
              <DeadlineBadge registrationEnd={gatheringData.registrationEnd} />
            </div>
            <Container gatheringDetails={gatheringData} participants={joinedGathering} />
          </div>
          <div className="p-6 bg-white border-t-2 border-gray-200 border-solid space-y-10pxr lg:space-y-4 w-343pxr md:w-696pxr md:h-820pxr lg:w-996pxr lg:h-687pxr">
            <p className="text-base font-semibold text-left text-gray-900 md:text-lg ">
              이용자들은 이 프로그램을 이렇게 느꼈어요!
            </p>
            {/* 리뷰 데이터가 없으면 목록을 표시하지 않음 */}
            {reviewData ? (
              <ReviewDeatilCardList reviews={mockGatheringReviews} />
            ) : (
              <div className="flex items-center justify-center h-full min-h-500pxr md:min-h-696pxr">
                <p className="h-10 text-sm font-medium text-center text-gray-500">
                  아직 리뷰가 없어요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="z-10 flex justify-center w-full px-4 bg-white border-t-2 border-gray-900 border-solid pt-20pxr pb-20pxr md:px-6">
        <div className="flex justify-between w-full max-w-996pxr">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900">
              더 건강한 나와 팀을 위한 프로그램 🏃‍️️
            </p>
            <p className="text-xs font-medium text-left text-gray-700">
              국내 최고 웰니스 전문가와 프로그램을
              <br /> 통해 지친 몸과 마음을 회복해봐요
            </p>
          </div>
          <ActionButtons {...actionButtonProps} />
        </div>
      </div>
    </>
  );
};

export default GatheringDetail;
