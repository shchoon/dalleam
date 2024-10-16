'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Chip from '@/components/chip/Chip';

export default function Menu() {
  const pathName = usePathname();

  const myPageMenu = [
    {
      title: '나의 모임',
      path: ['/my-page'],
    },
    {
      title: '나의 리뷰',
      path: ['/my-page/my-review/new', '/my-page/my-review/written'],
    },
    {
      title: '내가 만든 모임',
      path: ['/my-page/created-gatherings'],
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex gap-3">
        {myPageMenu.map((menu, i) => {
          return (
            <Link href={menu.path[0]} key={i} className="flex flex-col gap-1">
              <span
                className={`text-lg font-semibold ${menu.path.includes(pathName) ? 'text-gray-900' : 'text-gray-400'} cursor-pointer`}
              >
                {menu.title}
              </span>
              <span
                className={`w-full h-2pxr ${!menu.path.includes(pathName) && 'hidden'} bg-gray-900`}
              />
            </Link>
          );
        })}
      </div>
      {pathName.includes('review') && (
        <div className="flex flex-col gap-6 pt-4 pb-6">
          <div className="flex gap-2 ">
            <Link href={myPageMenu[1].path[0]}>
              <Chip color={`${pathName.includes('new') ? 'navy' : 'gray'}`} size="lg">
                작성 가능한 리뷰
              </Chip>
            </Link>
            <Link href={myPageMenu[1].path[1]}>
              <Chip color={`${pathName.includes('written') ? 'navy' : 'gray'}`} size="lg">
                작성한 리뷰
              </Chip>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
