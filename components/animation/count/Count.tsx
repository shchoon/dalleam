'use client';
import { useState, useEffect } from 'react';

export default function CountAnimation(num: number, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increment = num / (duration / 100); // 증가량 계산
    const counter = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= num) {
          clearInterval(counter);
          return num; // 목표에 도달하면 num으로 설정
        }
        return Math.min(Math.ceil(prevCount + increment), num); // 증가
      });
    }, 100);
  }, []);

  return count;
}
