'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  console.log(pathName);

  return (
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
  );
}
