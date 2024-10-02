import { create } from 'zustand';
import { GatheringType } from '@/lib/definition';
import { Location } from '@/lib/definition';

type sortType = 'createdAt' | 'participantCount' | 'score';

export type ReviewStoreType = {
  typeTab: GatheringType;
  locationTab?: Location;
  dateTab?: string;
  sortTab: sortType;
  setTypeTab: (tab: GatheringType) => void;
  setLocationTab: (tab: Location) => void;
  setDateTab: (tab: string) => void;
  setSortTab: (tab: sortType) => void;
};

export const reviewStore = create<ReviewStoreType>()((set) => ({
  typeTab: 'DALLAEMFIT',
  locationTab: undefined,
  dateTab: undefined,
  sortTab: 'createdAt',
  setTypeTab: (tab) => set(() => ({ typeTab: tab })),
  setLocationTab: (tab) => set(() => ({ locationTab: tab })),
  setDateTab: (tab) => set(() => ({ dateTab: tab })),
  setSortTab: (tab) => set(() => ({ sortTab: tab })),
}));
