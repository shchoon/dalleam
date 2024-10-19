'use client';
import React, { useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import Card from '../../card/Card';
import Modal from '../../Modal';
import Review from '../../modal/review/Review';

import { JoinedGathering } from '@/lib/definition';
import { getInstance } from '@/utils/axios';
import useModal from '@/hooks/useModal';

type Props = {
  initialReviews: JoinedGathering[];
};

export default function NewReview({ initialReviews }: Props) {
  const { ref, inView } = useInView();
  const { modalRef, handleOpenModal, handleCloseModal } = useModal();

  const getReviews = async (offset: number) => {
    const instance = getInstance();

    const res = await instance('/gatherings/joined', {
      params: {
        limit: 10,
        offset: offset,
        reviewed: false,
        completed: true,
        sortOrder: 'desc',
      },
    });

    return res.data;
  };

  const {
    data: newReviews,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['newReviews'],
    queryFn: ({ pageParam }) => getReviews(pageParam),
    initialPageParam: 0,
    initialData: {
      pages: [initialReviews],
      pageParams: [0],
    },
    enabled: false,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.flat().length;
    },
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <div className="flex justify-center min-h-[60vh] bg-white">
        {newReviews.pages.flat().length === 0 ? (
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">
              아직 작성 가능한 리뷰가 없어요
            </span>
          </div>
        ) : (
          <div aria-label="newReviews" className="flex flex-col gap-6">
            {newReviews.pages.flat().map((review) => {
              return (
                <Card
                  openModal={handleOpenModal}
                  normal={false}
                  gathering={review}
                  key={review.id}
                />
              );
            })}
          </div>
        )}
      </div>
      {!isFetching && hasNextPage && <div ref={ref}></div>}
      <Modal ref={modalRef}>
        <Review closeModal={handleCloseModal} />
      </Modal>
    </>
  );
}
