import { create } from 'zustand';
import { GatheringType, Location, sortType } from '@/lib/definition';

type FilterState = {
  location: Location;
  date: string;
  sortBy: string;
  reviewSortBy: sortType;
  type: GatheringType;
  setType: (type: GatheringType) => void;
  setLocation: (location: Location) => void;
  setDate: (date: string) => void;
  setSortBy: (orderBy: string) => void;
  setReviewSortBy: (orderBy: sortType) => void;
  resetFilters: () => void; // 리셋 함수 추가
};

const useFilterStore = create<FilterState>((set) => ({
  location: '지역 선택',
  date: '날짜 선택',
  sortBy: '마감 임박',
  reviewSortBy: '최신 순',
  type: 'DALLAEMFIT',
  setType: (type: GatheringType) => set({ type }),
  setLocation: (location: Location) => set({ location }),
  setDate: (date: string) => set({ date }),
  setSortBy: (sortBy) => set({ sortBy }),
  setReviewSortBy: (sortBy: sortType) => set({ sortBy }),
  resetFilters: () =>
    set({
      location: '지역 선택',
      date: '날짜 선택',
      sortBy: '마감 임박',
      type: 'DALLAEMFIT',
      reviewSortBy: '최신 순',
    }), // 필터 초기화 함수
}));

export default useFilterStore;
