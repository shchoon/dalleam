import { User } from '@/lib/definition';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      hydrated: false,
      setHydrated: (hydrated: boolean) => set({ hydrated }),
      setUser: (user: User) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user',
      onRehydrateStorage: () => (state) => {
        if (state && state.setHydrated) {
          state.setHydrated(true);
        }
      },
    },
  ),
);

export default useUserStore;
