import { create } from 'zustand';

type GatheringId = {
  id: number;
  setId: (id: number) => void;
  clearId: () => void;
};

const useGatheringId = create<GatheringId>((set) => ({
  id: 0,
  setId: (id: number) => set({ id: id }),
  clearId: () => set({ id: 0 }),
}));

export default useGatheringId;
