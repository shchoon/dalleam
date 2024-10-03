'use client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Modal from '../Modal';
import useModal from '@/hooks/useModal';
import { getInstance } from '@/utils/axios';
import Review from '../modal/Review';

import CheckCancel from '../modal/CheckCancel';
import Card from '../card/Card';

import { JoinedGathering } from '@/lib/definition';
import useModalType from '@/stores/useModalType';
import { useEffect } from 'react';

type Props = {
  initialMyGatherings: JoinedGathering[];
};

export default function MyGatherings({ initialMyGatherings }: Props) {
  const queryClient = useQueryClient();
  console.log('queryClient', queryClient.getQueryData(['gatheringJoined']));
  console.log('queryClient', queryClient.getQueryData(['newReviews']));

  const { ref, inView } = useInView();
  const { modalRef, handleCloseModal, handleOpenModal } = useModal();
  const { type } = useModalType();

  const getMyGatheringData = async (offset: number) => {
    const instance = getInstance();
    const res = await instance('/gatherings/joined', {
      params: { limit: 10, offset: offset, sortOrder: 'desc' },
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
      pages: initialMyGatherings,
      pageParams: [0],
    },
    queryFn: ({ pageParam }) => getMyGatheringData(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) {
        return undefined;
      }
      return allPages.flat().length;
    },
    staleTime: 1000 * 5 * 60,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="pt-6 min-h-[60vh] flex justify-center ">
        {initialMyGatherings.length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">신청한 모임이 아직 없어요</span>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {gatheringJoined.pages.flat().map((myGathering) => {
              return (
                <Card
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
