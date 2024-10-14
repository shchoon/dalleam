'use client';

import React, { useState, useRef, useEffect } from 'react';
import { toastManager } from './ToastManager';

type Toast = {
  id: number;
  message: string;
  second: number;
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastRefs = useRef<HTMLElement[]>([]);
  const progressBarRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    //toastManager에 콜백 등록
    const cleanUp = toastManager.initialToast((message: string, second: number) => {
      const newToast = { id: Date.now(), message, second };
      setToasts((prevToasts) => [newToast, ...prevToasts]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
      }, second * 1000);
    });

    return () => {
      // 컴포넌트가 언마운트될 때 콜백 제거
      cleanUp();
    };
  }, []);

  // 토스트들의 위치 조정 (offsetHeight를 사용하여 이전 토스트들의 높이에 따라 밀어냄)
  useEffect(() => {
    toastRefs.current.forEach((toast, index) => {
      const newOffset = toastRefs.current
        .slice(0, index + 1)
        .reduce((acc, currToast) => acc + currToast.offsetHeight + 10, 0); // 간격 10px 추가
      toast.style.transform = `translate(-50%, ${newOffset}px)`; // Y축으로 밀어냄
    });

    // Progress bar의 width를 100%에서 0%로 줄이기
    toasts.forEach((toast) => {
      const progressBar = progressBarRefs.current.get(toast.id);
      if (progressBar) {
        requestAnimationFrame(() => {
          progressBar.style.width = '0%'; // 애니메이션 시작
        });
      }
    });
  }, [toasts]); // 토스트가 변경될 때마다 위치 계산 및 progress bar 업데이트

  return (
    <div className="fixed top-7 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          ref={(el) => {
            if (el) toastRefs.current[index] = el; // 각 토스트를 ref에 저장
          }}
          className="fixed top-[7%] left-1/2 transform -translate-x-1/2 bg-orange-500 text-white p-4 rounded-lg shadow-md w-72 text-center transition-transform ease-out duration-500 opacity-0"
          style={{
            animation: `fadeInOut ${toast.second}s ease-in-out forwards`, // 동적 애니메이션 시간 적용
          }}
        >
          <div>{toast.message}</div>
          <div
            className="absolute bottom-0 left-0 h-1 bg-white"
            ref={(el) => {
              if (el) progressBarRefs.current.set(toast.id, el); // 각 프로그레스 바 ref 저장
            }}
            style={{
              width: '100%',
              transition: `width ${toast.second}s linear`, // 동적으로 애니메이션 시간 적용
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
