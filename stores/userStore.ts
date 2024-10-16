import { User } from '@/lib/definition';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  expiresAt: number | null;
};

const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      hydrated: false,
      expiresAt: null,
      setHydrated: (hydrated: boolean) => set({ hydrated }),
      setUser: (user: User) => {
        const maxAge = 60 * 60 * 1000;
        const expiresAt = Date.now() + maxAge;
        set({ user, expiresAt });
      },
      clearUser: () => set({ user: null, expiresAt: null }),
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
