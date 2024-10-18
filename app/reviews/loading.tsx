import SkeletonReviews from './_components/skeletonComponents/SkeletonReviews';

import DeferredComponent from '@/components/DeferredComponent';

export default function Loading() {
  return (
    <DeferredComponent>
      <SkeletonReviews />
    </DeferredComponent>
  );
}
