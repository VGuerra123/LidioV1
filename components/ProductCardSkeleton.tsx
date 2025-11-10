// Skeleton placeholder for ProductCard
// This component displays a simple card skeleton while product data or images are loading.
// It ensures smooth visual experience on slower connections and during lazy loading.

'use client';

import { cn } from '@/lib/utils';

interface ProductCardSkeletonProps {
  className?: string;
}

export default function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100',
        className,
      )}
    >
      <div className="aspect-square bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/2 bg-gray-200 rounded" />
        <div className="h-8 w-full bg-gray-200 rounded" />
      </div>
    </div>
  );
}