'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { ShopifyProduct } from '@/lib/shopify'; // ✅ Tipo oficial

// Tipo base para edges
type Edge = { node: ShopifyProduct };

type FiltersState = {
  categories: string[];
  priceRange?: [number, number];
  inStock?: boolean;
};

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function ProductsPage() {
  const [products, setProducts] = useState<Edge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortKey>('featured');
  const [filters, setFilters] = useState<FiltersState>({ categories: [] });
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  // 🧠 Fetch de productos desde la API
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

  // 🏷️ Generar lista de categorías únicas
  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((p) => p.node.productType ?? '') // evitar undefined
            .filter(Boolean)
        )
      ).sort(),
    [products]
  );

  // 🧮 Aplicar filtros y ordenamientos
  const filteredAndSorted = useMemo(() => {
    let list = products;

    // Filtrado por categorías
    if (filters.categories?.length) {
      list = list.filter((p) =>
        filters.categories.includes(p.node.productType ?? '')
      );
    }

    // Filtrado por rango de precios
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      list = list.filter((p) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= min && price <= max;
      });
    }

    // Filtrado por stock
    if (filters.inStock) {
      list = list.filter((p) => p.node.availableForSale);
    }

    // Ordenamiento
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

  const handleFilterChange = (f: FiltersState) => setFilters(f);
  const handleSort = (value: string) => setSortBy(value as SortKey);
  const clearFilters = () => setFilters({ categories: [] });

  // 💅 UI principal
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-cyan-50/40 to-blue-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      {/* FONDO SUTIL */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[380px] w-[380px] rounded-full bg-blue-500/20 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold tracking-tight sm:text-5xl"
          >
            Catálogo Tecnológico
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-cyan-50/95 text-lg"
          >
            Innovación y diseño a tu alcance.
          </motion.p>
        </div>
      </header>

      {/* TOOLBAR SUPERIOR */}
      <div className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-900/70">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* FILTROS */}
          <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
            <SheetTrigger asChild>
              <Button
                size="sm"
                className="rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 active:scale-95"
                variant="secondary"
              >
                <Filter className="mr-2 h-4 w-4" /> Filtros
              </Button>
            </SheetTrigger>

            <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
              <SheetHeader className="p-4 pb-2">
                <SheetTitle className="text-left">Refinar búsqueda</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(85vh-120px)] overflow-y-auto px-4 pb-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl border border-white/60 bg-white/70 p-4 shadow-[0_6px_28px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60"
                >
                  <Filters categories={categories} onFilterChange={handleFilterChange} />
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

          {/* ORDENAR */}
          <div className="ml-auto">
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="h-9 w-40 rounded-full border-gray-200 bg-white/70 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-800/70">
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

      {/* CONTENIDO */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60"
              >
                <Skeleton className="aspect-square" />
                <div className="space-y-3 p-3 sm:p-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-9 w-full rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-300">
            {error} Intenta nuevamente.
          </div>
        ) : filteredAndSorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/60 bg-white/70 p-10 text-center shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/60"
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
