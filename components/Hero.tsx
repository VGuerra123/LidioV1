'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, ShieldCheck, Truck } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-cyan-50">
      {/* Halo luminoso detrás */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-400/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXTOS PRINCIPALES */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold shadow-md"
            >
              Innovación que ilumina tu día
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
            >
              Tecnología que <br />
              <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                potencia tu mundo
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              En Lidio te conectamos con la innovación. Descubre lo último en tecnología con envío rápido y garantía extendida.
            </motion.p>

            {/* BOTONES */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/productos">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300 rounded-xl"
                >
                  Explorar productos
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/ofertas">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-xl transition-all duration-300"
                >
                  Ver ofertas
                </Button>
              </Link>
            </motion.div>

            {/* FEATURES */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4 }}
              className="grid grid-cols-3 gap-6 pt-10"
            >
              {[
                { icon: <Zap className="w-6 h-6" />, label: 'Envío rápido' },
                { icon: <ShieldCheck className="w-6 h-6" />, label: 'Garantía extendida' },
                { icon: <Truck className="w-6 h-6" />, label: 'Devolución gratis' },
              ].map(({ icon, label }, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 text-cyan-600 mb-2 shadow-inner hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* IMAGEN / MOCKUP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="absolute -inset-6 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <div className="relative bg-white/60 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/40">
              <div className="grid grid-cols-2 gap-5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-cyan-100 to-blue-50 rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-md"
                  >
                    <div className="w-16 h-16 bg-cyan-200/50 rounded-xl mb-4" />
                    <div className="h-3 bg-blue-300/60 rounded mb-2" />
                    <div className="h-3 bg-cyan-200/50 rounded w-2/3" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
