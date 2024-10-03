import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Saved = {
  [userId: number]: number[];
};

type Savedstore = {
  saved: Saved; // null 대신 Saved로 설정
  setSaved: (userId: number, gatheringId: number) => void;
  cancelSaved: (userId: number, gatheringId: number) => void;
  setSavedUserId: (userId: number) => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};

const useSavedStore = create(
  persist<Savedstore>(
    (set) => ({
      saved: {}, // 초기값을 빈 객체로 설정
      setSaved: (userId: number, gatheringId: number) =>
        set((state) => {
          const currentSaved = state.saved;
          return {
            saved: {
              ...currentSaved, // 기존 상태 유지
              [userId]: [...(currentSaved[userId] || []), gatheringId],
            },
          };
        }),
      cancelSaved: (userId: number, gatheringId: number) =>
        set((state) => {
          const currentSaved = state.saved;
          const updatedSaved = currentSaved[userId].filter((id) => id !== gatheringId);
          return { saved: { [userId]: updatedSaved } }; // saved 상태를 업데이트
        }),
      // 로그인 전에 찜한 경우(아직 userId가 없을 때)
      setSavedUserId: (userId: number) =>
        set((state) => {
          const currentSaved = state.saved;
          if (currentSaved[0]) {
            return {
              saved: {
                [userId]: [...currentSaved[0]],
              },
            };
          }
          return {};
        }),
      setHydrated: (hydrated: boolean) => set({ hydrated }),
      hydrated: false,
    }),
    {
      name: 'saved',
      onRehydrateStorage: () => (state) => {
        if (state && state.setHydrated) {
          state.setHydrated(true);
        }
      },
    },
  ),
);

export default useSavedStore;
