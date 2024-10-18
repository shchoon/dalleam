import { gatheringSchema } from '@/constants/formSchema';
import { gatherings, locations, sortTabs } from './constants';
import { Control } from 'react-hook-form';

export type GatheringType = keyof typeof gatherings;
export type LocationType = keyof typeof locations;
export type sortType = keyof typeof sortTabs;

export type ControlProps = {
  control: Control<gatheringSchema>;
};

export type Gathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
};

export type User = {
  teamId: string;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
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
  User: {
    teamId: string;
    id: number;
    name: string;
    image: string | null;
  };
};

export type Points = {
  teamId: string;
  type: GatheringType;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  averageScore: number;
};

export type JoinedGathering = {
  teamId: string;
  id: number;
  type: GatheringType;
  name: null;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
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
    location?: LocationType;
    sortBy?: sortType;
    date?: string;
  },
];

export type reviewScoresQueryKeys = [
  ['reviews', 'scores'],
  {
    type: GatheringType;
    location?: LocationType;
    sortBy?: sortType;
    date?: string;
  },
];
