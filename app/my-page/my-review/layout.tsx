'use client';
import { useRouter, usePathname } from 'next/navigation';

import Chip from '@/components/chip/Chip';

export default function ReviewLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 pt-4">
        <Chip
          color={`${pathName.includes('new') ? 'navy' : 'gray'}`}
          size="lg"
          onClick={() => {
            router.push('new');
          }}
        >
          작성 가능한 리뷰
        </Chip>
        <Chip
          color={`${pathName.includes('written') ? 'navy' : 'gray'}`}
          size="lg"
          onClick={() => {
            router.push('written');
          }}
        >
          작성한 리뷰
        </Chip>
      </div>
      {children}
    </div>
  );
}
