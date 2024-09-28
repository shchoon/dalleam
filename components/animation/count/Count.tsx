'use client';
import { useState, useEffect } from 'react';

export default function CountAnimation(num: number) {
  const [count, setCount] = useState(0);
  const duration = 2000;

  useEffect(() => {
    const counter = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= num) {
          clearInterval(counter);
          return num; // 목표에 도달하면 num으로 설정
        }
        return prevCount + 1; // 증가
      });
    }, duration / num);
  }, []);

  return count;
}
