import Button from '@/components/Button';
import React, { useMemo } from 'react';
import { ControlProps } from '@/lib/definition'; // ControlProps 타입 임포트

export default function GatheringModalButton({ isValid }: { isValid: boolean }) {
  // 컴포넌트를 useMemo로 메모이제이션
  const memoizedComponent = useMemo(() => {
    return (
      <div className="w-full mt-auto">
        <Button
          type="submit"
          className="w-full h-10 min-h-10"
          variant={isValid ? 'orange' : 'invalidate'}
          fillState="full"
        >
          확인
        </Button>
      </div>
    );
  }, [isValid]);

  return memoizedComponent;
}
