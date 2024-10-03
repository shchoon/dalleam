import { create } from 'zustand';

type GatheringId = {
  type: string;
  setType: (type: string) => void;
  clearType: () => void;
};

const useModalType = create<GatheringId>((set) => ({
  type: '',
  setType: (type: string) => set({ type: type }),
  clearType: () => set({ type: '' }),
}));

export default useModalType;
