import Container from '@/components/container/Container';
import { Gathering } from '@/types/types';

export default function Home() {
  const testData1: Gathering = {
    teamId: 'FESI3-3',
    id: 104,
    type: 'WORKATION',
    name: '워크케이션 모임',
    dateTime: '2024-09-25T09:00:00Z',
    registrationEnd: '2024-09-24T09:00:00Z',
    location: '홍대입구',
    participantCount: 10,
    capacity: 20,
    image: 'https://example.com/image4.jpg',
    createdBy: 4,
    canceledAt: null,
  };

  const testData2 = { ...testData1, id: 105 };
  const testData3 = { ...testData1, id: 106 };

  return (
    <div className="flex flex-col gap-5 items-center">
      <Container gatheringDetails={testData1} />
      <Container gatheringDetails={testData2} />
      <Container gatheringDetails={testData3} />
    </div>
  );
}
