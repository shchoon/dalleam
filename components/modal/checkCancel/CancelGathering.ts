import { Gathering } from '@/types/types';

export function CancelGathering(data: Gathering[], id: number) {
  const updateData = data.filter((data) => data.id !== id);

  return updateData;
}
