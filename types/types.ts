export type GatheringType = 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type Location = '건대입구' | '을지로3가' | '신림' | '홍대입구';

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
  image: string;
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
  teamId: 'FESI';
  type: GatheringType;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
};

export type reviewQueryKeys = [
  'reviews',
  {
    type: GatheringType;
    location?: Location;
  },
];

export type reviewScoresQueryKeys = [
  'reviews',
  'scores',
  {
    type: GatheringType;
    location?: Location;
  },
];
