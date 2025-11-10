// Mobile-first bottom navigation bar. Displays sticky navigation icons
// for quick access to the main sections of the store on small screens.
// On larger screens it remains hidden.

'use client';

import Link from 'next/link';
import { Home, Grid2x2, ShoppingCart, User } from 'lucide-react';

export default function BottomNav() {
  const items = [
    { href: '/', icon: Home, label: 'Inicio' },
    { href: '/categorias', icon: Grid2x2, label: 'Categorías' },
    { href: '/carrito', icon: ShoppingCart, label: 'Carrito' },
    { href: '/cuenta', icon: User, label: 'Cuenta' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 dark:bg-neutral-800/90 dark:border-neutral-700 z-50 sm:hidden">
      <ul className="flex justify-around items-center py-2">
        {items.map(({ href, icon: Icon, label }) => (
          <li key={href} className="flex flex-col items-center text-gray-700 dark:text-gray-300">
            <Link href={href} className="flex flex-col items-center">
              <Icon className="w-6 h-6 mb-0.5" />
              <span className="text-xs leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}