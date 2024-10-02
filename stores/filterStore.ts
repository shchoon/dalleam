import { create } from 'zustand';

type FilterState = {
  location: string;
  date: string;
  sortBy: string;
  type: string;
  setType: (type: string) => void;
  setLocation: (location: string) => void;
  setDate: (date: string) => void;
  setSortBy: (orderBy: string) => void;
  resetFilters: () => void; // 리셋 함수 추가
};

const useFilterStore = create<FilterState>((set) => ({
  location: '지역 선택',
  date: '날짜 선택',
  sortBy: '마감 임박',
  type: 'DALLAEMFIT',
  setType: (type) => set({ type }),
  setLocation: (location) => set({ location }),
  setDate: (date) => set({ date }),
  setSortBy: (sortBy) => set({ sortBy }),
  resetFilters: () =>
    set({ location: '지역 선택', date: '날짜 선택', sortBy: '마감 임박', type: 'DALLAEMFIT' }), // 필터 초기화 함수
}));

export default useFilterStore;
