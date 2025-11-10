import ProductCard from './ProductCard';
import { ShopifyProduct } from '@/lib/types';

interface ProductGridProps {
  products: Array<{ node: ShopifyProduct }>;
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 text-lg">No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div
      className="
        grid 
        grid-cols-2            /* 🔹 Base: 2 columnas en mobile */
        sm:grid-cols-2         /* 🔹 Mantiene 2 columnas en small */
        md:grid-cols-3         /* 🔹 3 columnas en tablet */
        lg:grid-cols-4         /* 🔹 4 columnas en desktop */
        gap-4 sm:gap-6 lg:gap-8 
        place-items-center 
        w-full
        px-2 sm:px-4 md:px-6
      "
    >
      {products.map(({ node: product }) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
