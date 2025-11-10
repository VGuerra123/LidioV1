'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-slate-800 shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN BAR */}
        <div className="flex items-center justify-between h-20">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-6 md:gap-10">
            {/* LOGO */}
            <Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <Image
                  src="/logo.webp"
                  alt="Lidio Logo"
                  width={80}
                  height={80}
                  priority
                  className="drop-shadow-[0_2px_12px_rgba(0,200,255,0.4)] group-hover:drop-shadow-[0_4px_20px_rgba(0,150,255,0.5)] transition-all duration-300"
                />
              </motion.div>
            </Link>

            {/* NAV LINKS (Desktop) */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              {[
                { name: 'Productos', href: '/productos' },
                { name: 'Categorías', href: '/categorias' },
                { name: 'Ofertas', href: '/ofertas' },
                { name: 'Sobre Lidio', href: '/about' }, // 🟦 nuevo enlace
              ].map((link) => (
                <motion.div key={link.href} whileHover={{ y: -2 }}>
                  <Link
                    href={link.href}
                    className="relative text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r from-cyan-400 to-blue-500 after:rounded-full after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* SEARCH */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-blue-600 rounded-full hover:bg-blue-50/60 dark:hover:bg-slate-800 transition-colors relative"
              aria-label="Buscar"
            >
              <motion.div whileTap={{ scale: 0.85 }}>
                <Search className="w-5 h-5" />
              </motion.div>
            </button>

            {/* LOGIN */}
            <Link href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Login"
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <User className="w-5 h-5 text-slate-700 dark:text-slate-200 hover:text-blue-600" />
                </motion.div>
              </Button>
            </Link>

            {/* CART */}
            <Link href="/carrito">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-blue-50/70 dark:hover:bg-slate-800 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Carrito"
              >
                <motion.div whileTap={{ scale: 0.9 }}>
                  <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-200 hover:text-blue-600" />
                </motion.div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md font-semibold"
                >
                  0
                </motion.span>
              </Button>
            </Link>

            {/* MENU MOBILE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-200 rounded-md hover:bg-blue-50/60 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="py-3 border-t border-gray-200 dark:border-slate-700"
            >
              <Input
                type="search"
                placeholder="Buscar productos, marcas o categorías..."
                className="w-full rounded-full px-5 py-3 shadow-inner bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm focus:ring-2 focus:ring-cyan-500 border border-gray-200 dark:border-slate-700 text-sm transition-all"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md shadow-lg"
          >
            <nav className="flex flex-col p-4 gap-3 text-sm font-medium">
              {[
                { name: 'Productos', href: '/productos' },
                { name: 'Categorías', href: '/categorias' },
                { name: 'Ofertas', href: '/ofertas' },
                { name: 'Sobre Lidio', href: '/about' }, // 🟦 también en mobile
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-700 dark:text-slate-200 hover:text-blue-600 py-2 px-2 rounded-md transition-colors hover:bg-blue-50/60 dark:hover:bg-slate-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Login inside menu */}
              <Link
                href="/login"
                className="text-slate-700 dark:text-slate-200 hover:text-blue-600 py-2 px-2 rounded-md transition-colors hover:bg-blue-50/60 dark:hover:bg-slate-800 flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="w-5 h-5" /> Iniciar sesión
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
