'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import ProductGrid from '@/components/ProductGrid';
import Filters from '@/components/Filters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Filter, ArrowUpDown } from 'lucide-react';
import type { ShopifyProduct } from '@/lib/types';

type Edge = { node: ShopifyProduct };
type FiltersState = { categories: string[]; priceRange?: [number, number]; inStock?: boolean };
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function ProductsPage() {
  const [products, setProducts] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [filters, setFilters] = useState<FiltersState>({ categories: [] });
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const mouseX = useMotionValue(0);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-6, 6]);

  // 🔄 Fetch productos
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('No se pudo cargar el catálogo.');
        const data: Edge[] = await res.json();
        setProducts(data);
      } catch (e: any) {
        setError(e?.message ?? 'Error inesperado.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(
    () =>
      Array.from(new Set(products.map((p) => p.node.productType ?? '').filter(Boolean))).sort(),
    [products]
  );

  const filteredAndSorted = useMemo(() => {
    let list = products;
    if (filters.categories?.length)
      list = list.filter((p) => filters.categories.includes(p.node.productType ?? ''));
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      list = list.filter((p) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= min && price <= max;
      });
    }
    if (filters.inStock) list = list.filter((p) => p.node.availableForSale);

    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort(
          (a, b) =>
            parseFloat(a.node.priceRange.minVariantPrice.amount) -
            parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'price-desc':
        sorted.sort(
          (a, b) =>
            parseFloat(b.node.priceRange.minVariantPrice.amount) -
            parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }
    return sorted;
  }, [products, filters, sortBy]);

  const clearFilters = () => setFilters({ categories: [] });

  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-white via-sky-50/40 to-blue-50/40 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden"
      onMouseMove={(e) => mouseX.set(e.clientX)}
    >
      {/* ✨ Fondo dinámico de partículas */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,rgba(0,200,255,0.08),transparent_60%)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[160px]"
        animate={{ y: [0, -30, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ repeat: Infinity, duration: 9 }}
      />

      {/* 🎬 HEADER CINEMÁTICO */}
      <header className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-12">
          {/* Texto principal */}
          <div className="space-y-3 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight 
              bg-gradient-to-r from-white via-cyan-100 to-sky-200 bg-clip-text text-transparent 
              drop-shadow-[0_2px_20px_rgba(0,255,255,0.3)]"
            >
              Catálogo Global Lidio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-lg sm:text-xl text-cyan-50/95 font-light"
            >
              Innovación, diseño y tecnología que conectan al mundo.
            </motion.p>
          </div>

          {/* 🤖 Robot Interactivo */}
          <motion.div
            style={{ rotateY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-8 md:mt-0 relative"
          >
            <Image
              src="/avatar3.png"
              alt="Lidio Bot"
              width={200}
              height={200}
              priority
              className="drop-shadow-[0_10px_50px_rgba(0,255,255,0.4)] hover:scale-105 transition-transform duration-500"
            />
            {/* Reflejo */}
            <motion.div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-36 h-6 bg-cyan-400/30 rounded-full blur-2xl"
              animate={{ scaleX: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.div>
        </div>

        {/* 💬 Mensaje flotante */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-4 left-1/2 md:left-16 transform -translate-x-1/2 md:translate-x-0 
          bg-white/20 backdrop-blur-lg text-white px-4 py-2 rounded-full border border-white/40 text-sm 
          shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          👋 ¡Hola! Soy Lidio. ¿Buscas algo en especial hoy?
        </motion.div>
      </header>

      {/* 🧭 TOOLBAR */}
      <div className="sticky top-0 z-40 border-b border-white/50 bg-white/70 backdrop-blur-2xl dark:bg-slate-900/70 shadow-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-3 py-3 sm:px-6 lg:px-8">
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full px-3 py-2 font-medium shadow-md hover:shadow-xl 
                hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
              <SheetHeader className="p-4 pb-2">
                <SheetTitle className="text-left font-semibold text-lg">Refinar búsqueda</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(85vh-110px)] overflow-y-auto px-4 pb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg 
                  backdrop-blur-2xl dark:border-slate-700/60 dark:bg-slate-900/60"
                >
                  <Filters categories={categories} onFilterChange={setFilters} />
                </motion.div>
              </div>
              <SheetFooter className="grid grid-cols-2 gap-3 p-4">
                <Button variant="outline" onClick={clearFilters} className="rounded-xl">
                  Limpiar
                </Button>
                <Button onClick={() => setMobileSheetOpen(false)} className="rounded-xl">
                  Aplicar
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <div className="ml-auto">
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
              <SelectTrigger className="h-9 w-44 rounded-full border-gray-200 bg-white/90 shadow-md 
                backdrop-blur hover:shadow-lg transition-all duration-200">
                <ArrowUpDown className="mr-2 h-4 w-4 opacity-70" />
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="price-asc">Menor precio</SelectItem>
                <SelectItem value="price-desc">Mayor precio</SelectItem>
                <SelectItem value="name-asc">Nombre A-Z</SelectItem>
                <SelectItem value="name-desc">Nombre Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 🛒 PRODUCTOS */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/50 bg-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] 
                backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/60"
              >
                <Skeleton className="aspect-square" />
                <div className="space-y-3 p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800 
          dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {error} Intenta nuevamente.
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/60 bg-white/80 p-10 text-center shadow-sm 
            backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60"
          >
            <p className="text-lg font-semibold text-gray-800 dark:text-slate-200">
              Sin resultados
            </p>
            <p className="mt-1 text-gray-500 dark:text-slate-400">
              Ajusta los filtros o límpialos.
            </p>
            <Button onClick={clearFilters} className="mt-4 rounded-xl">
              Limpiar filtros
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <ProductGrid products={filteredAndSorted} />
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
