'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShopifyProduct } from '@/lib/types';

interface ProductCardProps {
  product: ShopifyProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currency = product.priceRange.minVariantPrice.currencyCode;
  const image = product.images?.edges?.[0]?.node;

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="
        group relative w-full bg-white/80 backdrop-blur-md
        rounded-3xl overflow-hidden border border-gray-100/70
        shadow-[0_2px_10px_rgba(0,0,0,0.05)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        hover:border-cyan-100/80
        transition-all duration-400 ease-out
      "
    >
      {/* 🖼 Imagen */}
      <Link href={`/productos/${product.handle}`} className="block relative overflow-hidden rounded-t-3xl">
        <div className="relative aspect-[4/5] sm:aspect-square bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
          )}

          {image && (
            <Image
              src={image.url}
              alt={image.altText || product.title}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[1deg] ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {!product.availableForSale && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-xs px-2 py-1 rounded-md shadow-md">
              Agotado
            </Badge>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="
              absolute top-4 right-4 p-2 bg-white/90 rounded-full
              shadow-md hover:shadow-lg backdrop-blur-md
              hover:scale-110 active:scale-95 transition-all duration-300
              opacity-0 group-hover:opacity-100
            "
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
              }`}
            />
          </button>
        </div>
      </Link>

      {/* 📦 Contenido */}
      <div className="p-5 sm:p-6 flex flex-col justify-between h-full">
        <Link href={`/productos/${product.handle}`}>
          {product.productType && (
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
              {product.productType}
            </span>
          )}

          <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 leading-snug group-hover:text-blue-700 transition-colors">
            {product.title}
          </h3>

          {product.description && (
            <p className="text-xs sm:text-sm text-gray-600/90 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}
        </Link>

        {/* 💰 Precio y botón */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <p className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {formatPrice(price)}
          </p>

          <Button
            size="icon"
            className="
              rounded-full shadow-md hover:shadow-xl 
              bg-gradient-to-br from-cyan-500 to-blue-600
              hover:from-cyan-600 hover:to-blue-700
              text-white transition-all duration-300
              scale-95 group-hover:scale-100
            "
            disabled={!product.availableForSale}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
