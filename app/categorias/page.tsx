'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Laptop, Smartphone, Headphones, Watch, Camera,
  Gamepad, Tablet, Monitor, Keyboard, Speaker, Printer, Mouse,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const categories = [
  { name: 'Laptops', icon: Laptop, href: '/productos?categoria=laptops', description: 'Potencia y portabilidad de nueva generación', color: 'from-cyan-500 to-blue-500' },
  { name: 'Smartphones', icon: Smartphone, href: '/productos?categoria=smartphones', description: 'Diseño inteligente y rendimiento extremo', color: 'from-blue-500 to-cyan-500' },
  { name: 'Audio', icon: Headphones, href: '/productos?categoria=audio', description: 'Sonido inmersivo y tecnología Hi-Fi', color: 'from-cyan-500 to-blue-500' },
  { name: 'Wearables', icon: Watch, href: '/productos?categoria=wearables', description: 'Tecnología que se adapta a ti', color: 'from-blue-500 to-cyan-500' },
  { name: 'Cámaras', icon: Camera, href: '/productos?categoria=camaras', description: 'Captura cada detalle con precisión', color: 'from-cyan-500 to-blue-500' },
  { name: 'Gaming', icon: Gamepad, href: '/productos?categoria=gaming', description: 'Equipamiento gamer de élite', color: 'from-blue-500 to-cyan-500' },
  { name: 'Tablets', icon: Tablet, href: '/productos?categoria=tablets', description: 'Creatividad sin límites', color: 'from-cyan-500 to-blue-500' },
  { name: 'Monitores', icon: Monitor, href: '/productos?categoria=monitores', description: 'Visuales hiperrealistas y precisas', color: 'from-blue-500 to-cyan-500' },
  { name: 'Teclados', icon: Keyboard, href: '/productos?categoria=teclados', description: 'Mecánicos, ergonómicos y gamer', color: 'from-cyan-500 to-blue-500' },
  { name: 'Altavoces', icon: Speaker, href: '/productos?categoria=altavoces', description: 'Sonido envolvente de alta fidelidad', color: 'from-blue-500 to-cyan-500' },
  { name: 'Impresoras', icon: Printer, href: '/productos?categoria=impresoras', description: 'Impresión precisa y eficiente', color: 'from-cyan-500 to-blue-500' },
  { name: 'Ratones', icon: Mouse, href: '/productos?categoria=ratones', description: 'Precisión, ergonomía y velocidad', color: 'from-blue-500 to-cyan-500' },
];

export default function CategoriesPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ✨ Partículas futuristas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles: { x: number; y: number; r: number; s: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.2,
          s: Math.random() * 0.8 + 0.2,
        });
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 200, 255, 0.12)';
        ctx.fill();
        p.y += p.s;
        if (p.y > canvas.height) p.y = -p.r;
      });
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-100 via-blue-50 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-black">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* 💫 HEADER */}
      <header className="relative z-10 text-center py-20 sm:py-24 bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.15),transparent_70%)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
        >
          Explora las Categorías 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg sm:text-xl text-cyan-100 font-light max-w-xl mx-auto px-6"
        >
          Vive la experiencia tecnológica más avanzada del 2025.
        </motion.p>

        {/* Luz inferior animada */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[120%] h-24 bg-gradient-to-t from-white/10 to-transparent blur-2xl" />
      </header>

      {/* 🧩 GRID (3 columnas móvil) */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <Link
                  href={category.href}
                  className="group relative block overflow-hidden rounded-3xl border border-white/60 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_45px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500"
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.color} blur-2xl`}
                  />
                  <div className="relative flex flex-col items-center justify-center text-center py-6 sm:py-10 space-y-4">
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.4)]`}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]" />
                    </motion.div>
                    <div className="px-2">
                      <h3 className="font-semibold text-sm sm:text-lg text-gray-900 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="hidden sm:block text-xs text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      {/* 🤖 Lidio más elegante */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 left-4 flex items-end gap-3 z-50"
      >
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="relative w-16 h-16 sm:w-20 sm:h-20"
        >
          <Image
            src="/avatar3.png"
            alt="Lidio"
            fill
            className="object-contain drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/90 dark:bg-neutral-900/90 border border-gray-200 dark:border-neutral-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-2xl shadow-[0_0_12px_rgba(0,255,255,0.2)] text-sm backdrop-blur-lg"
        >
          👋 Hola, soy Lidio. <br />¿Te muestro lo nuevo hoy?
        </motion.div>
      </motion.div>

      {/* ⚡ Footer */}
      <footer className="relative z-10 text-center py-12 text-gray-500 dark:text-gray-400 text-sm mt-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        © 2025 Lidio Store — Tecnología con alma ⚡
      </footer>
    </div>
  );
}
