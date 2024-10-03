import { Gathering } from './definition';
import { Review } from './definition';

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

const mockGatheringReviews: Review[] = [
  {
    teamId: 'FESI3-3',
    id: 337,
    score: 5,
    comment: 'DDDDDDDDDQWDWQDWQDASDZCDZFWERFWEFWEFEWFEWFEWFWEQ',
    createdAt: '2024-09-26T08:47:42.121Z',
    Gathering: {
      teamId: 'FESI3-3',
      id: 1062,
      type: 'MINDFULNESS',
      name: '어딘가',
      dateTime: '2024-10-10T00:03:23.473Z',
      location: '신림',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727309080173_question-mark.png',
    },
    User: { teamId: 'FESI3-3', id: 715, name: '김시몬', image: null },
  },
  {
    teamId: 'FESI3-4',
    id: 338,
    score: 4,
    comment: '재미있었어요!',
    createdAt: '2024-09-27T09:17:12.981Z',
    Gathering: {
      teamId: 'FESI3-4',
      id: 1063,
      type: 'WORKATION',
      name: '주말 요가',
      dateTime: '2024-10-11T12:00:00.000Z',
      location: '홍대입구',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727309080173_yoga.png',
    },
    User: { teamId: 'FESI3-4', id: 716, name: '이영희', image: null },
  },
  {
    teamId: 'FESI3-4',
    id: 338,
    score: 4,
    comment: '재미있었어요!',
    createdAt: '2024-09-27T09:17:12.981Z',
    Gathering: {
      teamId: 'FESI3-4',
      id: 1063,
      type: 'MINDFULNESS',
      name: '주말 요가',
      dateTime: '2024-10-11T12:00:00.000Z',
      location: '을지로3가',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727309080173_yoga.png',
    },
    User: { teamId: 'FESI3-4', id: 716, name: '이영희', image: null },
  },
  {
    teamId: 'FESI3-4',
    id: 338,
    score: 4,
    comment: '재미있었어요!',
    createdAt: '2024-09-27T09:17:12.981Z',
    Gathering: {
      teamId: 'FESI3-4',
      id: 1063,
      type: 'DALLAEMFIT',
      name: '주말 요가',
      dateTime: '2024-10-11T12:00:00.000Z',
      location: '신림',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/together-dallaem/1727309080173_yoga.png',
    },
    User: { teamId: 'FESI3-4', id: 716, name: '이영희', image: null },
  },
];

export {
  mockGathering,
  mockGathering2,
  mockGathering3,
  mockGathering4,
  mockGatheringArr,
  mockGatheringReviews,
};
