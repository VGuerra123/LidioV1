'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Truck, ShieldCheck, CreditCard, Receipt, Star, Clock } from 'lucide-react';

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-b from-white via-sky-50 to-cyan-50
        dark:from-[#0b1220] dark:via-[#0b1220] dark:to-black
      "
      aria-label="Sección destacada Lidio"
    >
      {/* Halos + malla sutil (no invasivos) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[720px] rounded-full blur-[160px] bg-cyan-400/28 dark:bg-cyan-500/18" />
        <div className="absolute bottom-[-30%] -left-24 w-[520px] h-[520px] rounded-full blur-[120px] bg-blue-500/15 dark:bg-blue-600/12" />
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07] [background:radial-gradient(circle_at_1px_1px,#000_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* ===== PERSONAJE SOLO (protagonista) ===== */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: 1,
                ...(reduce ? {} : { y: [0, -6, 0] }),
              }}
              transition={{
                duration: 0.1,
                ...(reduce ? {} : { repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', duration: 5 }),
              }}
              className="relative"
            >
              {/* Glow suave detrás */}
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[28px] bg-gradient-to-r from-cyan-500/24 via-blue-600/24 to-cyan-500/24 blur-2xl"
              />
              <div className="relative h-44 w-44 sm:h-56 sm:w-56 lg:h-72 lg:w-72">
                <Image
                  src="/avatar1.webp"
                  alt="Personaje Lidio"
                  fill
                  priority
                  sizes="(max-width: 1024px) 224px, 288px"
                  className="object-contain drop-shadow-[0_20px_40px_rgba(56,189,248,0.35)]"
                />
              </div>
            </motion.div>
          </div>

          {/* ===== COPY COMERCIAL CHILE 2025 ===== */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
            {/* Chip país/año (sutil y útil en mobile) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="flex justify-center lg:justify-start"
            >
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white"
            >
              Tecnología,{' '}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Conexión
              </span>{' '}
              y Confianza
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mx-auto max-w-xl lg:mx-0 text-[15.5px] sm:text-lg leading-relaxed text-gray-600 dark:text-slate-300"
            >
              En Lidio te conectamos con la innovación. Descubre lo último en tecnología con despacho ágil y garantía extendida. Todo, con soporte humano real.
            </motion.p>

            {/* CTAs (mobile-first) */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link href="/productos" aria-label="Explorar productos">
                <Button
                  size="lg"
                  className="
                    w-full sm:w-auto rounded-xl text-white
                    bg-gradient-to-r from-cyan-600 to-blue-600
                    hover:from-cyan-700 hover:to-blue-700
                    shadow-lg hover:shadow-blue-500/30 transition-all duration-300
                  "
                >
                  Explorar productos
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/ofertas" aria-label="Ver ofertas">
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    w-full sm:w-auto rounded-xl border-2 border-gray-300 dark:border-slate-700
                    hover:border-blue-600 hover:text-blue-600 dark:hover:text-cyan-400
                    transition-all duration-300
                  "
                >
                  Ver ofertas
                </Button>
              </Link>
            </motion.div>

            {/* Beneficios comerciales (texto refinado y compacto) */}
            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              className="
                grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 pt-3
              "
              aria-label="Beneficios de la tienda"
            >
              {[
                {
                  Icon: Truck,
                  title: 'Despacho ágil',
                  desc: 'RM 24–48 h · Regiones vía courier',
                },
                {
                  Icon: CreditCard,
                  title: 'Cuotas sin interés',
                  desc: 'Hasta 12x con bancos adheridos',
                },
                {
                  Icon: Receipt,
                  title: 'Boleta o factura',
                  desc: 'Precios con IVA incluido',
                },
                {
                  Icon: ShieldCheck,
                  title: 'Garantía extendida',
                  desc: '12 meses + soporte humano',
                },
              ].map(({ Icon, title, desc }, i) => (
                <li
                  key={i}
                  className="
                    rounded-2xl border border-slate-200/70 dark:border-slate-800/70
                    bg-white/85 dark:bg-white/5 backdrop-blur
                    p-3.5 text-left shadow-sm
                    flex items-start gap-3
                  "
                >
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-slate-900 dark:text-white">{title}</p>
                    <p className="text-[12.5px] text-slate-600 dark:text-slate-400 leading-snug">{desc}</p>
                  </div>
                </li>
              ))}
            </motion.ul>

            {/* Barra de confianza (rating + horario) */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1.5"
            >
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                4.9/5
              </span>
              <span aria-hidden className="hidden sm:inline text-slate-400">•</span>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                +10.000 pedidos entregados
              </span>
              <span aria-hidden className="hidden sm:inline text-slate-400">•</span>
              <span className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400">
                Atención Lun–Sáb <Clock className="inline h-4 w-4 ml-1" />
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Línea inferior animada (motion-safe) */}
      <div
        aria-hidden
        className="
          absolute bottom-0 left-0 h-[3px] w-full
          bg-[linear-gradient(90deg,theme(colors.cyan.500),theme(colors.blue.500),theme(colors.cyan.500))]
          [background-size:200%_100%]
          motion-safe:animate-[bgpos_6s_linear_infinite]
        "
      />

      <style jsx>{`
        @keyframes bgpos {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </section>
  );
}
