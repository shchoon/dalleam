'use client';
import { useState, useEffect } from 'react';

export default function CountAnimation(num: number) {
  const [count, setCount] = useState(1);
  const duration = 2000;
  const frameRate = 1000 / 60; // 한 프레임의 시간
  const totalFrame = duration / frameRate; // 전체 프레임
  const increment = num / totalFrame;

  useEffect(() => {
    let currentCount = 1;
    const counter = setInterval(() => {
      setCount((prevCount) => {
        currentCount += increment;
        if (prevCount >= num) {
          clearInterval(counter);
          return num; // 목표에 도달하면 num으로 설정
        }
        return Math.round(currentCount); // 증가
      });
    }, frameRate);
  }, []);

  return count;
}
