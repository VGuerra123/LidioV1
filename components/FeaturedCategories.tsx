'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Camera,
  Gamepad,
} from 'lucide-react';

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
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* 🎨 Fondo dinámico */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/40 to-blue-50/40" />
      <div className="absolute inset-0 blur-3xl opacity-70 bg-gradient-to-r from-cyan-400/30 via-blue-400/20 to-transparent" />

      {/* 📦 Contenedor */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ✨ Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent drop-shadow-sm">
            Explora por categoría
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-700/80 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Encuentra fácilmente lo que buscas en nuestras secciones especializadas.
          </p>
        </motion.div>

        {/* 🔹 Grid adaptable */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
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
                  className="group relative block p-5 sm:p-6 bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/50 shadow-[0_2px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] transition-all duration-500 overflow-hidden"
                >
                  {/* 💫 Halo animado */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/0 via-blue-500/0 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500" />

                  <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 relative z-10">
                    {/* Ícono con efecto 3D */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 3 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-cyan-400/30`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                    </motion.div>

                    {/* Texto */}
                    <span className="font-semibold text-gray-800 group-hover:text-blue-700 text-sm sm:text-base text-center transition-colors duration-300">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🌈 Decoraciones flotantes */}
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
