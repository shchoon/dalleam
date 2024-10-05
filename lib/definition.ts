export type GatheringType = 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION' | 'DALLAEMFIT';

export type Location = '건대입구' | '을지로3가' | '신림' | '홍대입구' | '지역 선택';

export type sortType = '최신 순' | '참여 인원 순' | '리뷰 높은 순' | '마감 임박';

export type Gathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: Location;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
};

export type User = {
  teamId: string;
  id: number;
  name: string;
  image: string | null;
};
export type Review = {
  teamId: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: Omit<
    Gathering,
    'registrationEnd' | 'participantCount' | 'capacity' | 'createdBy' | 'canceledAt'
  >;
  User: User;
};

export type Points = {
  teamId: string;
  type: GatheringType;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

export type JoinedGathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: null;
  dateTime: string;
  registrationEnd: string;
  location: Location;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
};

export type Participant = {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id: number;
    email: string;
    name: string;
    companyName: string;
    image?: string;
  };
};
export type reviewQueryKeys = [
  ['reviews'],
  {
    type: GatheringType;
    location?: Location;
    sortBy?: sortType;
    date?: string;
  },
];

export type reviewScoresQueryKeys = [
  ['reviews', 'scores'],
  {
    type: GatheringType;
    location?: Location;
    sortBy?: sortType;
    date?: string;
  },
];
