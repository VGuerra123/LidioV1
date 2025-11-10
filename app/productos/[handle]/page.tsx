'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

/* Utils */
const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
const money = (a: number, c: string) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency: c }).format(a);

/* Tipos */
type MoneyV = { amount: string; currencyCode: string };
type ImageEdge = { node: { url: string; altText?: string } };
type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: MoneyV;
  selectedOptions?: { name: string; value: string }[];
};
type Product = {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  productType?: string;
  description?: string;
  descriptionHtml?: string;
  availableForSale?: boolean;
  priceRange: { minVariantPrice: MoneyV };
  images?: { edges: ImageEdge[] };
  variants?: { edges: { node: Variant }[] };
};

/* ---------------- Component ---------------- */
export default function ProductPage() {
  const params = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    '👋 ¡Hola! Soy Lidio.',
    '🛍️ ¿Buscas algo en especial?',
    '💡 Puedo ayudarte a comparar opciones.',
    '⚡ Descubre más en la parte inferior.',
  ];

  /* Ciclo de mensajes del asistente */
  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  /* Carga del producto */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/products/${params.handle}`, { cache: 'no-store' });
        const data = (await res.json()) as Product;
        setProduct(data);
      } catch {
        toast.error('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    })();
  }, [params.handle]);

  /* Derivaciones */
  const images = useMemo(() => product?.images?.edges ?? [], [product]);
  const variants = useMemo(() => product?.variants?.edges?.map((e) => e.node) ?? [], [product]);
  const basePrice = parseFloat(
    variants?.[0]?.price?.amount ?? product?.priceRange?.minVariantPrice?.amount ?? '0'
  );
  const currency =
    variants?.[0]?.price?.currencyCode ??
    product?.priceRange?.minVariantPrice?.currencyCode ??
    'CLP';
  const inStock = Boolean(variants?.[0]?.availableForSale ?? product?.availableForSale);

  /* Funciones seguras para navegador */
  const addToCart = () => {
    if (!inStock) return toast.error('Sin stock');
    toast.success('Producto agregado al carrito 🛒');
  };

  const shareLink = () => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return;
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Enlace copiado 📎');
    } catch {
      toast.error('No se pudo copiar el enlace');
    }
  };

  /* ------------------ Loading ------------------ */
  if (loading)
    return (
      <div className="min-h-screen p-6 space-y-6">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-[400px] rounded-2xl" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Producto no encontrado</p>
      </div>
    );

  /* ------------------ Main ------------------ */
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white via-blue-50/40 to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-black overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center gap-2 p-4 bg-white/80 dark:bg-neutral-950/70 backdrop-blur-xl border-b border-gray-100 dark:border-neutral-800">
        <Link
          href="/productos"
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver
        </Link>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
          {product.title}
        </p>
      </div>

      {/* Imagen principal */}
      <section className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0.7, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <Image
              src={images[selectedImage]?.node.url ?? '/placeholder.png'}
              alt={product.title}
              fill
              priority
              className="object-cover select-none touch-none"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  selectedImage === i ? 'bg-blue-600 w-5' : 'bg-gray-300 w-2.5'
                )}
              />
            ))}
          </div>
        )}
      </section>

      {/* Info */}
      <main className="flex-1 px-5 py-6 sm:px-10 max-w-4xl mx-auto space-y-6">
        <div>
          <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm">
            {product.productType ?? 'Producto'}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
            <Star className="w-4 h-4 fill-amber-500" />
            <span>4.8 · 124 reseñas</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-3xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            {money(basePrice, currency)}
          </p>
          {inStock ? (
            <span className="flex items-center text-emerald-600 text-sm">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Disponible
            </span>
          ) : (
            <span className="text-rose-600 text-sm">Sin stock</span>
          )}
        </div>

        {(product.descriptionHtml || product.description) && (
          <div
            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml || `<p>${product.description}</p>`,
            }}
          />
        )}

        {/* Beneficios */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { icon: <Truck className="w-5 h-5 text-cyan-600" />, t: 'Envío rápido' },
            { icon: <Shield className="w-5 h-5 text-blue-600" />, t: 'Garantía 12 meses' },
          ].map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center rounded-xl bg-white/70 dark:bg-neutral-900/60 border border-gray-100 dark:border-neutral-800 py-3 backdrop-blur-sm"
            >
              {b.icon}
              <p className="text-xs mt-1 font-medium text-gray-700 dark:text-gray-300">{b.t}</p>
            </div>
          ))}
        </div>

        {/* Recomendaciones */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50 mb-4">
            Complementa tu compra
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: n * 0.1 }}
                className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm shadow-sm p-3 hover:shadow-md transition"
              >
                <div className="aspect-square bg-gradient-to-br from-sky-100 to-blue-100 dark:from-neutral-800 dark:to-neutral-900 rounded-lg mb-2" />
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                  Accesorio #{n}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">$9.990 CLP</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Bar */}
      <div className="sticky bottom-0 z-50 flex items-center justify-between gap-3 p-4 bg-white/90 dark:bg-neutral-950/80 backdrop-blur-xl border-t border-gray-200 dark:border-neutral-800">
        <Button
          onClick={addToCart}
          disabled={!inStock}
          className="flex-1 h-12 text-base rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-[1.02] transition-transform text-white font-medium"
        >
          <ShoppingCart className="w-5 h-5 mr-2" /> {inStock ? 'Agregar al carrito' : 'Sin stock'}
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsFavorite((v) => !v)}
          className="h-12 w-12 rounded-xl border-gray-300 dark:border-neutral-700"
        >
          <Heart className={cn('w-5 h-5', isFavorite && 'fill-rose-500 text-rose-500')} />
        </Button>
        <Button
          variant="outline"
          onClick={shareLink}
          className="h-12 w-12 rounded-xl border-gray-300 dark:border-neutral-700"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* 🤖 Asistente Lidio flotante */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="fixed bottom-24 right-4 sm:right-8 flex items-end gap-3"
      >
        <motion.div
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 dark:bg-neutral-900/90 text-sm px-3 py-2 rounded-2xl shadow-lg border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-gray-200 max-w-[220px] backdrop-blur-lg"
        >
          {messages[messageIndex]}
        </motion.div>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative w-16 h-16"
        >
          <Image
            src="/avatar3.png"
            alt="Lidio bot"
            fill
            className="object-contain drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
