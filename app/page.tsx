import Card from '@/components/card/Card';
import CardList from '@/components/card/CardList';
import { Gathering } from '@/types/types';

const mockGatherings: Gathering[] = [
  {
    teamId: 'DALLAEMFIT-001',
    id: 101,
    type: 'DALLAEMFIT',
    name: '달램핏 오피스 스트레칭',
    dateTime: '2024-09-10 18:00:00Z',
    registrationEnd: '2024-09-20T13:00:00Z',
    location: '건대입구',
    participantCount: 15,
    capacity: 20,
    image: 'https://example.com/image1.jpg',
    createdBy: 1,
    canceledAt: null,
  },
  {
    teamId: 'OFFICE-STRETCH-002',
    id: 102,
    type: 'OFFICE_STRETCHING',
    name: '오피스 스트레칭 세션',
    dateTime: '2024-09-15T12:00:00Z',
    registrationEnd: '2024-09-07T12:00:00Z',
    location: '을지로3가',
    participantCount: 8,
    capacity: 10,
    image: 'https://example.com/image2.jpg',
    createdBy: 2,
    canceledAt: '무작위',
  },
  {
    teamId: 'FESI3-3',
    id: 973,
    type: 'WORKATION',
    name: 'TEST MEETING',
    dateTime: '2024-09-09T22:10:49.888Z',
    registrationEnd: '2024-09-09T21:00:00.888Z',
    location: '신림',
    participantCount: 0,
    capacity: 7,
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1725858736260_tv.svg',
    createdBy: 697,
    canceledAt: null,
  },
  {
    teamId: 'WORKATION-004',
    id: 104,
    type: 'WORKATION',
    name: '워크케이션 모임',
    dateTime: '2024-09-25T09:00:00Z',
    registrationEnd: '2024-09-24T09:00:00Z',
    location: '홍대입구',
    participantCount: 4,
    capacity: 6,
    image: 'https://example.com/image4.jpg',
    createdBy: 4,
    canceledAt: '무작위',
  },
];

const test: Gathering = {
  teamId: 'FESI3-3',
  id: 973,
  type: 'DALLAEMFIT',
  name: 'TEST MEETING',
  dateTime: '2024-09-09T22:10:49.888Z',
  registrationEnd: '2024-09-09T21:00:00.888Z',
  location: '신림',
  participantCount: 0,
  capacity: 7,
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1725858736260_tv.svg',
  createdBy: 697,
  canceledAt: null,
};

export default function Home() {
  return (
    <div className="container pt-20 mx-auto">
      <div className="text-center">
        <CardList gatherings={mockGatherings} />
        <Card gathering={test} normal={true} />
      </div>
    </div>
  );
}
