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

export type Review = {
  teamId: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: string;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
  User: {
    teamId: string;
    id: number;
    name: string;
    image: string | null;
  };
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
    image: string | null;
  };
};
