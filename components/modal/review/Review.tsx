'use client';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from '@/components/toast/ToastManager';
import Button from '@/components/Button';
import useGatheringId from '@/stores/useGatheringId';
import { getInstance } from '@/utils/axios';
import { JoinedGathering, Review } from '@/lib/definition';

import Delete from '/public/icons/delete.svg';
import EmptyHeart from '/public/icons/reviewEmptyHeart.svg';
import FillHeart from '/public/icons/reviewFillHeart.svg';

type Props = {
  closeModal: () => void;
};

type queryGatheringJoined = {
  pageParams: number[];
  pages: JoinedGathering[];
};

type queryWrittenReviews = {
  pageParams: number[];
  pages: Review[];
};

export default function ReviewModal({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { id, clearId } = useGatheringId();

  const [score, setScore] = useState<{ [key: number]: boolean }>({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });
  const [review, setReview] = useState('');

  const isAvtiveButton = () => {
    const scores = Object.values(score).filter((data) => data).length;
    if (scores >= 1 && review !== '') {
      return true;
    }
    return false;
  };

  const postReview = async () => {
    const scores = Object.values(score).filter((data) => data).length;

    const instance = getInstance();

    const res = await instance.post('/reviews', {
      gatheringId: id,
      score: scores,
      comment: review,
    });

    return res;
  };

  // 해당 모임의 review 값 변경
  const updateGateringJoined = () => {
    queryClient.setQueryData(['gatheringJoined'], (oldData: queryGatheringJoined) => {
      if (oldData) {
        const updateData = oldData.pages.flat().map((data: JoinedGathering) => {
          if (data.id === id) {
            return {
              ...data,
              isReviewed: true,
            };
          } else {
            return {
              ...data,
            };
          }
        });

        const pages = updateData.reduce((acc: JoinedGathering[][], _, i: number) => {
          if (i % 10 === 0) {
            acc.push(updateData.slice(i, i + 10));
          }

          return acc;
        }, []);

        return {
          ...oldData,
          pages: pages,
        };
      }
    });
  };

  // 작성 가능한 리뷰 데이터 변경
  const updateNewReviews = () => {
    queryClient.setQueryData(['newReviews'], (oldData: queryGatheringJoined) => {
      if (oldData) {
        const updateData = oldData.pages.flat().filter((data: JoinedGathering) => data.id !== id);

        return {
          ...oldData,
          pages: updateData,
        };
      }
    });
  };

  const updateWrittenReviews = () => {
    queryClient.invalidateQueries({ queryKey: ['writtenReviews'] });
  };

  const { mutate } = useMutation({
    mutationFn: postReview,
    onSuccess: () => {
      toast('리뷰가 등록되었습니다.');
      clearId();
      closeModal();
      updateGateringJoined();
      updateWrittenReviews();
      updateNewReviews();
    },
  });

  const handleClickDelete = () => {
    clearId();
    closeModal();
  };

  return (
    <form
      className="w-343pxr h-408pxr md:w-520pxr p-6 rounded-xl flex flex-col gap-6 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        mutate();
      }}
    >
      <div className="flex justify-between">
        <span className="text-lg font-semibold text-gray-900">리뷰 쓰기</span>
        <Delete aria-label="deleteIcon" onClick={handleClickDelete} className="cursor-pointer" />
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-base font-semibold text-gray-800">만족스러운 경험이었나요?</span>
        <div className="flex gap-2pxr">
          {new Array(5).fill(1).map((data, i: number) => {
            return (
              <div
                key={i}
                className="relative size-6"
                onClick={() => {
                  setScore((prev) => ({
                    ...prev,
                    [i]: !prev[i],
                  }));
                }}
              >
                <EmptyHeart aria-label="emptyHeart" className={`absolute`} />
                <FillHeart
                  aria-label="fillHeart"
                  className={`absolute  ${score[i] ? 'animate-fFill-heart' : 'hidden'} `}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-base font-semibold text-gray-800">경험에 대해 남겨주세요.</span>

        <textarea
          style={{ resize: 'none' }}
          placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
          className="w-full h-120pxr px-2.5 py-4 bg-gray-50 rounded-xl placeholder-gray-400 outline-none"
          value={review}
          onChange={(e) => {
            setReview((prev) => e.target.value);
          }}
        />
      </div>
      <div className="w-full flex gap-4">
        <Button
          className="w-full flex justify-center items-center "
          fillState="empty"
          variant="orange"
          onClick={handleClickDelete}
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isAvtiveButton() ? false : true}
          className="w-full flex justify-center items-center "
          fillState="full"
          variant={isAvtiveButton() ? 'orange' : 'gray'}
        >
          리뷰 등록
        </Button>
      </div>
    </form>
  );
}
