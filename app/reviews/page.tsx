// app/reviews/page.tsx
import React from 'react';
import Reviews from './_components/Reviews';
import { HydrationBoundary } from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';
import { useReviewPrefetchQuery } from '@/services/reviews';

export default async function Page() {
  const queryClient = await useReviewPrefetchQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Reviews />
    </HydrationBoundary>
  );
}
