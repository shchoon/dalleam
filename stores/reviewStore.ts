import { create } from 'zustand';
import { GatheringType } from '@/lib/definition';
import { Location } from '@/lib/definition';

export type sortType = '최신 순' | '참여 인원 순' | '리뷰 높은 순';

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
  locationTab: '지역 선택',
  dateTab: '날짜 선택',
  sortTab: '최신 순',
  setTypeTab: (tab) => set(() => ({ typeTab: tab })),
  setLocationTab: (tab) => set(() => ({ locationTab: tab })),
  setDateTab: (tab) => set(() => ({ dateTab: tab })),
  setSortTab: (tab) => set(() => ({ sortTab: tab })),
}));
