import MyProfile from '@/components/myProfile/Myprofile';
import ModifyProfile from '@/components/modal/ModifyProfile';
import CardList from '@/components/card/CardList';
import MyGathering from '@/components/myPage/MyGathering';
import { useEffect } from 'react';
import { getInstance } from '@/utils/axios';

const getInitialData = async () => {
  const instance = getInstance();
  const res = await instance('/gatherings', { params: { limit: 5 } });

  return res.data;
};

export default async function myPageLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const myPageMenu = ['나의 모임', '나의 리뷰', '내가 만든 모임'];

  const gatherings = await getInitialData();

  return (
    <div className="flex flex-col items-center pt-6 md:py-8">
      <div className="w-347pxr md:w-700pxr lg:w-996pxr gap-4 lg:gap-30pxr">
        <MyProfile />
        <div className="px-4 py-6 border-t-2 border-gray-900 flex flex-col gap-6">
          <div className="flex gap-3">
            {myPageMenu.map((menu, i) => {
              return (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-gray-900">{menu}</span>
                  <span className="w-full h-2pxr bg-gray-900" />
                </div>
              );
            })}
          </div>
          <MyGathering initialGathering={gatherings} />
        </div>
      </div>
    </div>
  );
}

// data
// :
// Array(12)
// 0
// :
// {teamId: 'FESI3-3', id: 962, type: 'OFFICE_STRETCHING', name: '모임 생성 테스트', dateTime: '2024-09-06T08:55:16.177Z', …}
// 1
// :
// {teamId: 'FESI3-3', id: 968, type: 'OFFICE_STRETCHING', name: '테스트', dateTime: '2024-09-06T06:38:43.975Z', …}
// 2
// :
// {teamId: 'FESI3-3', id: 971, type: 'OFFICE_STRETCHING', name: 'TEST1234', dateTime: '2024-09-08T06:17:34.184Z', …}
// 3
// :
// {teamId: 'FESI3-3', id: 973, type: 'WORKATION', name: 'TEST MEETING', dateTime: '2024-09-09T22:10:49.888Z', …}
// 4
// :
// {teamId: 'FESI3-3', id: 974, type: 'OFFICE_STRETCHING', name: '오피스 스트레칭', dateTime: '2024-09-10T07:28:13.437Z', …}
// 5
// :
// {teamId: 'FESI3-3', id: 975, type: 'OFFICE_STRETCHING', name: '오피스 스트레칭', dateTime: '2024-09-11T07:28:13.437Z', …}
// 6
// :
// {teamId: 'FESI3-3', id: 976, type: 'OFFICE_STRETCHING', name: '오피스 스트레칭', dateTime: '2024-09-11T07:28:13.437Z', …}
// 7
// :
// {teamId: 'FESI3-3', id: 994, type: 'OFFICE_STRETCHING', name: null, dateTime: '2024-09-25T08:49:41.925Z', …}
// 8
// :
// {teamId: 'FESI3-3', id: 998, type: 'OFFICE_STRETCHING', name: null, dateTime: '2024-09-26T07:09:39.550Z', …}
// 9
// :
// {teamId: 'FESI3-3', id: 999, type: 'MINDFULNESS', name: null, dateTime: '2024-09-29T07:09:39.550Z', …}
// 10
// :
// {teamId: 'FESI3-3', id: 1000, type: 'WORKATION', name: null, dateTime: '2024-10-03T07:09:39.550Z', …}
// 11
// :
// {teamId: 'FESI3-3', id: 1001, type: 'WORKATION', name: null, dateTime: '2024-10-04T07:09:39.550Z', …}
// length
// :
// 12
