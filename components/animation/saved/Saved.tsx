'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import useUserStore from '@/stores/userStore';

import HeartStroke from '/public/icons/HeartStroke.svg';
import FillHeart from '/public/icons/FillHeart.svg';
import SaveActive from '/public/icons/SaveActive.svg';

type SavedGathering = {
  [key: number]: {
    saved: number[];
  };
};

export default function Saved({ gatheringId }: { gatheringId: number }) {
  const { user } = useUserStore();

  const userId = user?.id ?? '0';

  const [isSaved, setIsSaved] = useState(false);
  const [workAnimation, setWorkanimation] = useState(false);

  const handleClickSaved = () => {
    const saved = localStorage.getItem('saved');
    const savedGathering = saved ? JSON.parse(saved) : {};

    savedGathering[userId] = savedGathering[userId] || { saved: [] };
    savedGathering[userId].saved.push(gatheringId);

    localStorage.setItem('saved', JSON.stringify(savedGathering));

    setWorkanimation(true);
    setTimeout(() => {
      setIsSaved(true);
    }, 1950);
  };

  const handleClickCancelSaved = () => {
    const savedGathering = JSON.parse(localStorage.getItem('saved') as string);

    const deletedSaved = savedGathering[userId].saved.filter((id: number) => id !== gatheringId);

    savedGathering[userId].saved = deletedSaved;

    localStorage.setItem('saved', JSON.stringify(savedGathering));

    setWorkanimation(false);
    setIsSaved(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('saved');
    if (saved && userId !== '0') {
      const savedGathering = JSON.parse(saved);

      if (savedGathering[userId] && savedGathering[userId].saved.includes(gatheringId)) {
        setIsSaved(true);
      }
    }
  }, [userId]);

  return (
    <>
      {isSaved ? (
        <SaveActive data-testid="saved" onClick={handleClickCancelSaved} className="size-12" />
      ) : (
        <span
          data-testid="unSaved"
          onClick={handleClickSaved}
          className={`relative w-12 h-12 flex justify-center items-center rounded-full border-2 border-gray-200 ${workAnimation && 'animate-saved-bg'}`}
        >
          <HeartStroke
            className={`absolute w-6 h-6 stroke-2 ${workAnimation && 'animate-heart-stroke'} stroke-gray-400`}
          />
          <FillHeart
            className={`absolute w-18pxr h-15pxr scale-0 ${workAnimation && 'animate-fill-heart'}`}
          />
        </span>
      )}
    </>
  );
}
