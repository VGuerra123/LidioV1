'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  ArrowLeft, ShoppingCart, Heart, Share2, Truck, Shield, Star, Info, Cpu, Zap, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

/** Helpers */
const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');
const money = (amount: number, currency: string) =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency }).format(amount);

/** Tipos defensivos mínimos (adaptables a tu /api/products/:handle) */
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
  tags?: string[];
  sku?: string; // a veces viene en variant, lo resolvemos indirectamente
  description?: string;
  descriptionHtml?: string;
  availableForSale?: boolean;
  priceRange: { minVariantPrice: MoneyV };
  images?: { edges: ImageEdge[] };
  variants?: { edges: { node: Variant }[] };
  metafields?: { edges: { node: { key: string; value: string } }[] };
  seo?: { title?: string; description?: string };
};

export default function ProductPage() {
  const params = useParams<{ handle: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${params.handle}`, { cache: 'no-store' });
        const data = (await res.json()) as Product;
        setProduct(data);
        // seleccionar primera variante disponible
        const first = data?.variants?.edges?.[0]?.node?.id ?? null;
        setSelectedVariantId(first);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (params.handle) fetchProduct();
  }, [params.handle]);

  const images = useMemo(() => product?.images?.edges ?? [], [product]);
  const variants = useMemo(() => product?.variants?.edges?.map(e => e.node) ?? [], [product]);
  const currentVariant = useMemo(
    () => variants.find(v => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId],
  );

  const basePrice = parseFloat(
    currentVariant?.price?.amount ?? product?.priceRange?.minVariantPrice?.amount ?? '0',
  );
  const currency = currentVariant?.price?.currencyCode ?? product?.priceRange?.minVariantPrice?.currencyCode ?? 'CLP';

  const inStock = Boolean(currentVariant?.availableForSale ?? product?.availableForSale);

  const specs = useMemo(
    () => product?.metafields?.edges?.map(m => m.node).filter(Boolean) ?? [],
    [product],
  );

  const optionsMap = useMemo(() => {
    // Mapa de opciones (Color, Capacidad, etc.) -> valores únicos
    const map = new Map<string, Set<string>>();
    variants.forEach(v =>
      v.selectedOptions?.forEach(o => {
        if (!map.has(o.name)) map.set(o.name, new Set());
        map.get(o.name)!.add(o.value);
      }),
    );
    return Array.from(map.entries()).map(([name, set]) => ({
      name,
      values: Array.from(set),
    }));
  }, [variants]);

  const currentSelections = useMemo(() => {
    const sel = new Map<string, string>();
    currentVariant?.selectedOptions?.forEach(o => sel.set(o.name, o.value));
    return sel;
  }, [currentVariant]);

  function pickVariant(nextKey: string, nextVal: string) {
    // calcula la combinación más cercana con ese cambio
    const desired = new Map(currentSelections);
    desired.set(nextKey, nextVal);
    const found = variants.find(v => {
      const allOk =
        v.selectedOptions?.every(o => desired.get(o.name) === o.value) ?? false;
      return allOk;
    });
    if (found) setSelectedVariantId(found.id);
  }

  function addToCart() {
    if (!inStock) return toast.error('Este producto no está disponible ahora.');
    // integra aquí tu lógica real de carrito
    toast.success('Producto agregado al carrito');
  }

  function shareLink() {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Enlace copiado al portapapeles');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-950/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Skeleton className="h-6 w-24 mb-6" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Producto no encontrado
          </h1>
          <Link href="/productos">
            <Button>Volver a productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      {/* Cabecera / Migas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-8">
        <Link
          href="/productos"
          className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-4 sm:mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>

        <nav aria-label="breadcrumbs" className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
          <ol className="flex flex-wrap gap-1 items-center">
            <li><Link href="/" className="hover:underline">Inicio</Link></li>
            <li>›</li>
            <li><Link href="/productos" className="hover:underline">Productos</Link></li>
            {product.productType && (<><li>›</li><li className="capitalize">{product.productType}</li></>)}
            <li className="hidden sm:inline">›</li>
            <li className="truncate max-w-[60%] sm:max-w-none">{product.title}</li>
          </ol>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Galería */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-white dark:from-neutral-800 dark:to-neutral-800/70 shadow-sm ring-1 ring-black/5 dark:ring-white/5">
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage].node.url}
                  alt={images[selectedImage].node.altText || product.title}
                  fill
                  priority
                  className="object-cover will-change-transform hover:scale-[1.03] transition-transform duration-500 ease-out"
                />
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 snap-x">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border transition-all duration-200 snap-start',
                      selectedImage === i
                        ? 'border-blue-600 ring-2 ring-blue-200 dark:ring-blue-900/40'
                        : 'border-transparent hover:border-gray-300 dark:hover:border-neutral-700',
                    )}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <Image
                      src={img.node.url}
                      alt={img.node.altText || product.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.section>

          {/* Panel de compra / detalles */}
          <motion.aside
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="lg:col-span-5"
          >
            <div className="sticky lg:top-8 space-y-6">
              {/* Etiquetas y título */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  {product.productType && (
                    <Badge className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-sm">
                      {product.productType}
                    </Badge>
                  )}
                  {product.vendor && (
                    <Badge variant="outline" className="border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200">
                      {product.vendor}
                    </Badge>
                  )}
                </div>

                <h1 className="text-[1.9rem] sm:text-[2.4rem] leading-tight font-semibold text-gray-900 dark:text-gray-50">
                  {product.title}
                </h1>

                {/* Rating / trust */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-0.5">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <span>4.0 · 128 opiniones</span>
                </div>
              </div>

              {/* Precio + disponibilidad */}
              <div className="flex items-center justify-between">
                <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  {money(basePrice, currency)}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  {inStock ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 dark:text-emerald-400">Disponible</span>
                    </>
                  ) : (
                    <span className="text-rose-600">Sin stock</span>
                  )}
                </div>
              </div>

              {/* Selector de variantes (si aplica) */}
              {optionsMap.length > 0 && (
                <div className="space-y-4">
                  {optionsMap.map(({ name, values }) => (
                    <div key={name} className="space-y-2">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</p>
                      <div className="flex flex-wrap gap-2">
                        {values.map(val => {
                          const active = currentSelections.get(name) === val;
                          return (
                            <button
                              key={val}
                              onClick={() => pickVariant(name, val)}
                              className={cn(
                                'px-3 h-9 rounded-lg border text-sm transition',
                                active
                                  ? 'border-blue-600 text-blue-700 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-300'
                                  : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 text-gray-700 dark:text-gray-300',
                              )}
                              aria-pressed={active}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Cantidad + acciones */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-200 dark:border-neutral-700 rounded-lg">
                  <button
                    className="w-9 h-10 text-lg hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-l-lg"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    className="w-9 h-10 text-lg hover:bg-gray-50 dark:hover:bg-neutral-800 rounded-r-lg"
                    onClick={() => setQuantity(q => q + 1)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={addToCart}
                  disabled={!inStock}
                  className="flex-1 h-11 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {inStock ? 'Agregar al carrito' : 'No disponible'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setIsFavorite(v => !v)}
                  className="h-11 rounded-xl border-gray-300 dark:border-neutral-700"
                  aria-pressed={isFavorite}
                >
                  <Heart className={cn('w-5 h-5', isFavorite && 'fill-rose-500 text-rose-500')} />
                </Button>

                <Button
                  variant="outline"
                  onClick={shareLink}
                  className="h-11 rounded-xl border-gray-300 dark:border-neutral-700"
                  aria-label="Compartir producto"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {/* Beneficios / confianza */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    icon: <Truck className="w-5 h-5 text-cyan-600" />,
                    title: 'Envío rápido',
                    desc: '2–5 días hábiles a todo Chile',
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-blue-600" />,
                    title: 'Garantía 12 meses',
                    desc: 'Directa con fabricante',
                  },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-gray-100 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-sm p-3"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{b.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Secciones inferiores */}
        <div className="mt-12 space-y-10">
          {/* Highlights compactos (tech vibes) */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">Destacados</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: <Cpu className="w-5 h-5" />, title: 'Tecnología avanzada', text: 'Componentes de alto rendimiento preparados para multitarea y gaming.' },
                { icon: <Zap className="w-5 h-5" />, title: 'Eficiencia energética', text: 'Optimizado para menor consumo sin sacrificar potencia.' },
                { icon: <Info className="w-5 h-5" />, title: 'Soporte experto', text: 'Asesoría y guía de configuración para sacar el máximo provecho.' },
              ].map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 p-4 backdrop-blur-sm hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                    {f.icon}
                    <p className="text-sm font-semibold">{f.title}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Especificaciones técnicas (metafields) */}
          {specs.length > 0 && (
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                Especificaciones técnicas
              </h2>
              <div className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 p-4 sm:p-6 backdrop-blur-sm">
                <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                  {specs.map((mf, i) => (
                    <div key={`${mf.key}-${i}`} className="flex justify-between gap-4">
                      <dt className="text-sm font-medium text-gray-700 dark:text-gray-300">{mf.key}</dt>
                      <dd className="text-sm text-gray-600 dark:text-gray-400">{mf.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </section>
          )}

          {/* Descripción detallada */}
          {(product.descriptionHtml || product.description) && (
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
                Descripción detallada
              </h2>
              <div
                className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: product.descriptionHtml || `<p>${product.description}</p>`,
                }}
              />
            </section>
          )}

          {/* Política simple (devoluciones/envíos) */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-50 mb-3">
              Envíos & Devoluciones
            </h2>
            <div className="rounded-2xl border border-gray-100 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/50 p-4 sm:p-6 backdrop-blur-sm">
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Envíos a todo Chile entre 2 y 5 días hábiles.</li>
                <li>Devoluciones dentro de 10 días si el producto no fue utilizado.</li>
                <li>Garantía de 12 meses por defectos de fabricación.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
