'use client';
import { useRouter, usePathname } from 'next/navigation';

import MyProfile from '@/components/myProfile/MyProfile';

export default function MyPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
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
    <div className="flex flex-col items-center pt-6 md:pt-8 w-screen max-w-1200pxr min-h-screen bg-gray-50">
      <div className="w-347pxr md:w-700pxr lg:w-996pxr gap-4 lg:gap-30pxr">
        <MyProfile />
        <div className="flex flex-col px-4 md:px-6 py-6 border-t-2 border-gray-900 bg-white">
          <div className="flex gap-3">
            {myPageMenu.map((menu, i) => {
              return (
                <div key={i} className="flex flex-col gap-1">
                  <span
                    className={`text-lg font-semibold ${menu.path.includes(pathName) ? 'text-gray-900' : 'text-gray-400'} cursor-pointer`}
                    onClick={() => {
                      router.push(menu.path[0]);
                    }}
                  >
                    {menu.title}
                  </span>
                  <span
                    className={`w-full h-2pxr ${!menu.path.includes(pathName) && 'hidden'} bg-gray-900`}
                  />
                </div>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
