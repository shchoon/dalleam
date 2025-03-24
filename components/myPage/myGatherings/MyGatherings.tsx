'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import useModal from '@/hooks/useModal';
import { getInstance } from '@/utils/axios';
import { JoinedGathering } from '@/lib/definition';
import useModalType from '@/stores/useModalType';

import Modal from '../../Modal';
import Review from '../../modal/review/Review';
import CheckCancel from '../../modal/checkCancel/CheckCancel';
import Card from '../../card/Card';

type Props = {
  initialMyGatherings: JoinedGathering[];
};

export default function MyGatherings({ initialMyGatherings }: Props) {
  const { ref, inView } = useInView();
  const { modalRef, handleCloseModal, handleOpenModal } = useModal();
  const { type } = useModalType();
  const client = useQueryClient();

  const getMyGatheringData = async (limit: number, offset: number) => {
    const instance = getInstance();
    const res = await instance('/gatherings/joined', {
      params: { limit: limit, offset: offset, sortOrder: 'desc' },
    });

    return res.data;
  };

  const {
    data: gatheringJoined,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['gatheringJoined'],
    initialPageParam: 0,
    initialData: {
      pages: [initialMyGatherings],
      pageParams: [0],
    },
    queryFn: ({ pageParam }) => getMyGatheringData(10, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.flat().length;
    },
    staleTime: 1000 * 5 * 60,
  });

  useEffect(() => {
    if (inView) {
      console.log('inview');
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="pt-6 min-h-[60vh] flex justify-center ">
        {gatheringJoined.pages.flat().length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">신청한 모임이 아직 없어요</span>
          </div>
        ) : (
          <div aria-label="gatheringJoined" className="flex flex-col gap-6">
            {gatheringJoined.pages.flat().map((myGathering, index) => {
              return (
                <Card
                  priority={index === 0 || index === 1}
                  normal={false}
                  gathering={myGathering}
                  key={myGathering.id}
                  openModal={handleOpenModal}
                  isReviewed={myGathering.isReviewed}
                />
              );
            })}
          </div>
        )}
      </div>
      {!isFetching && hasNextPage && <div ref={ref}></div>}

      <Modal ref={modalRef}>
        {type === 'cancel' && <CheckCancel closeModal={handleCloseModal} />}
        {type === 'review' && <Review closeModal={handleCloseModal} />}
      </Modal>
    </>
  );
}
