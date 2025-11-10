// Skeleton for the product grid. Renders a grid of ProductCardSkeletons
// to provide a consistent layout while product data is loading.

'use client';

import ProductCardSkeleton from '@/components/ProductCardSkeleton';

interface ProductGridSkeletonProps {
  count?: number;
}

export default function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  // Render a grid with a default of 8 skeleton cards
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}