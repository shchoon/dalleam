'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';
import useSavedStore from '@/stores/savedStore';

import HeartStroke from '/public/icons/HeartStroke.svg';
import FillHeart from '/public/hea.svg';
import SaveActive from '/public/icons/SaveActive.svg';

export default function Saved({ gatheringId }: { gatheringId: number }) {
  const { user } = useUserStore();
  const { saved, setSaved, cancelSaved } = useSavedStore();

  const userId = user?.id ?? 0;

  const [isSaved, setIsSaved] = useState(false);
  const [workAnimation, setWorkanimation] = useState(false);

  const handleClickSaved = () => {
    setSaved(userId, gatheringId);
    setWorkanimation(true);
    setTimeout(() => {
      setIsSaved(true);
    }, 1000);
  };

  const handleClickCancelSaved = () => {
    cancelSaved(userId, gatheringId);

    setWorkanimation(false);
    setIsSaved(false);
  };

  useEffect(() => {
    if (saved[userId] && saved[userId].includes(gatheringId)) {
      setIsSaved(true);
    }
  }, [userId]);

  return (
    <>
      {isSaved ? (
        <SaveActive
          data-testid="saved"
          onClick={() => {
            handleClickCancelSaved();
          }}
          className="size-12 cursor-pointer"
        />
      ) : (
        <span
          data-testid="unSaved"
          onClick={() => {
            handleClickSaved();
          }}
          className={`relative w-12 h-12 flex justify-center items-center rounded-full  ${workAnimation ? 'bg-[#FFF7ED]' : 'border-2 border-gray-200'} cursor-pointer`}
        >
          <HeartStroke
            className={`absolute w-6 h-6 stroke-2 ${workAnimation && 'hidden'} stroke-gray-400`}
          />
          <FillHeart
            className={`absolute w-6 h-6 ${workAnimation ? 'animate-fill-heart' : 'hidden'}`}
          />
        </span>
      )}
    </>
  );
}
