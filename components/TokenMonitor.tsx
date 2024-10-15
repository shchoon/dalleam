'use client';

import useUserStore from '@/stores/userStore';
import { useEffect } from 'react';

// 쿠키 상태를 주기적으로 확인하고 만료 시 store를 초기화하는 컴포넌트
export function TokenMonitor() {
  const { expiresAt, clearUser } = useUserStore();

  useEffect(() => {
    if (expiresAt) {
      const checkCookie = () => {
        const timeLeft = expiresAt - Date.now();
        if (timeLeft <= 0) {
          clearUser(); // 만료 시간이 지났으면 store 초기화
        }
      };

      // 페이지 로드 시 남은 시간 확인
      checkCookie();

      // 1분마다 남은 시간 확인
      const interval = setInterval(checkCookie, 60 * 1000);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [expiresAt, clearUser]);

  return null;
}
