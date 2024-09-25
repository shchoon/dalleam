import { Gathering } from './definition';

const mockGathering: Gathering = {
  teamId: 'FESI3-3',
  id: 104,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-25T09:00:00Z',
  registrationEnd: '2024-09-24T08:00:00Z',
  location: '홍대입구',
  participantCount: 6,
  capacity: 6,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

const mockGathering2: Gathering = {
  teamId: 'FESI3-3',
  id: 104,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-29T09:00:00Z',
  registrationEnd: '2024-09-25T09:00:00Z',
  location: '홍대입구',
  participantCount: 4,
  capacity: 6,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

const mockGathering3: Gathering = {
  teamId: 'FESI3-3',
  id: 104,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-30T09:00:00Z',
  registrationEnd: '2024-09-26T09:00:00Z',
  location: '홍대입구',
  participantCount: 6,
  capacity: 6,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

const mockGathering4: Gathering = {
  teamId: 'FESI3-3',
  id: 104,
  type: 'WORKATION',
  name: '워크케이션 모임',
  dateTime: '2024-09-30T09:00:00Z',
  registrationEnd: '2024-09-28T08:00:00Z',
  location: '홍대입구',
  participantCount: 8,
  capacity: 10,
  image: 'https://example.com/image4.jpg',
  createdBy: 4,
  canceledAt: null,
};

const mockGatheringArr: Gathering[] = [
  mockGathering,
  mockGathering2,
  mockGathering3,

  mockGathering4,
];

export { mockGathering, mockGathering2, mockGathering3, mockGathering4, mockGatheringArr };
