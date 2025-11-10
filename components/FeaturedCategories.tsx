'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Laptop, Smartphone, Headphones, Watch, Camera, Gamepad } from 'lucide-react';

const categories = [
  { name: 'Laptops', icon: Laptop, href: '/categorias/laptops', color: 'from-cyan-500 to-blue-600' },
  { name: 'Smartphones', icon: Smartphone, href: '/categorias/smartphones', color: 'from-blue-500 to-cyan-400' },
  { name: 'Audio', icon: Headphones, href: '/categorias/audio', color: 'from-cyan-400 to-indigo-500' },
  { name: 'Wearables', icon: Watch, href: '/categorias/wearables', color: 'from-indigo-500 to-cyan-500' },
  { name: 'Cámaras', icon: Camera, href: '/categorias/camaras', color: 'from-blue-400 to-indigo-500' },
  { name: 'Gaming', icon: Gamepad, href: '/categorias/gaming', color: 'from-cyan-500 to-blue-500' },
];

export default function FeaturedCategories() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo dinámico tipo App Copec */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/40" />
      <div className="absolute inset-0 blur-3xl opacity-70 bg-gradient-to-r from-cyan-400/30 via-blue-400/20 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent drop-shadow-sm">
            Explora por categoría
          </h2>
          <p className="mt-4 text-lg text-gray-700/80 max-w-2xl mx-auto leading-relaxed">
            Encuentra exactamente lo que buscas en nuestras categorías especializadas.
          </p>
        </motion.div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group relative block p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  {/* Efecto de halo */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/0 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />

                  <div className="flex flex-col items-center justify-center gap-4 relative z-10">
                    {/* Ícono con efecto */}
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}
                    >
                      <Icon className="w-8 h-8 text-white drop-shadow-md" />
                    </div>

                    {/* Nombre */}
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors text-center">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decoraciones animadas */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />
    </section>
  );
}
