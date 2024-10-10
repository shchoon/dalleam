import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

import Container from '@/components/container/Container';
import DeadlineBadge from '@/components/progressCard/DeadlineBadge';
import ActionButtons from '../../_components/ActionButtons';
import ReviewDetailCardList from '@/app/(gathering)/_components/review/ReviewDetailCardList';

import { fetchDetailGathering, fetchDetailReviews, fetchJoinedGatheringIds } from '@/lib/data';
import { mockGatheringReviews } from '@/lib/placeholder-data';
import { getMetadata } from '@/constants/metadata';

type Props = {
  params: {
    id: number;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;

  const { data: gatheringData, errorMessage: gatheringErrorMessage } =
    await fetchDetailGathering(id);

  return getMetadata({
    title: `${gatheringData?.location} ${gatheringData?.type} 모집`,
    description: `오는 ${gatheringData?.dateTime.split('T')[0]}에 ${gatheringData?.location}에서 열리는 모임에 참여하세요. 현재 ${gatheringData?.capacity}명 중 ${gatheringData?.participantCount}명이 참여 중입니다.`,
    asPath: `/gatherings/${id}`,
    ogImage: gatheringData?.image,
  });
}

const GatheringDetail = async ({ params }: Props) => {
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
              <Image
                src={gatheringData.image || '/card-image2.png'}
                alt="Image"
                fill
                className="object-cover rounded-3xl"
              />
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
              <ReviewDetailCardList reviews={mockGatheringReviews} />
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
      <ActionButtons {...actionButtonProps} />
    </>
  );
};

export default GatheringDetail;
