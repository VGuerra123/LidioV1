'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black border-t border-gray-200/60 dark:border-gray-800/60 mt-24 shadow-[inset_0_1px_10px_rgba(0,0,0,0.05)]">
      {/* EFECTO DE AURA DIGITAL */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.15),transparent_60%)] animate-pulse blur-3xl" />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* LOGO + DESCRIPCIÓN */}
          <div className="relative">
            <Link href="/" className="group inline-block">
              <div className="relative w-64 h-32">
                <Image
                  src="/logo.webp"
                  alt="Lidio Logo"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:drop-shadow-[0_0_25px_rgba(56,189,248,0.4)] group-hover:scale-[1.04] transition-all duration-500 ease-out animate-fadeUp"
                />
              </div>
              {/* Reflejo dinámico */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-60 rounded-2xl blur-md transition-opacity duration-500" />
            </Link>

            <p className="text-gray-600 dark:text-gray-400 mt-6 leading-relaxed max-w-sm">
              Innovación, diseño y tecnología de vanguardia. En <span className="font-semibold text-blue-600 dark:text-cyan-400">Lidio</span> encuentras productos de alto rendimiento con soporte humano y entrega rápida en todo Chile.
            </p>

            {/* REDES SOCIALES */}
            <div className="flex gap-4 mt-8">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="relative group p-2 rounded-full border border-gray-300/50 dark:border-gray-700/50 bg-white/40 dark:bg-white/10 backdrop-blur-md hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
                  <span className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 bg-gradient-to-r from-cyan-400 to-blue-600 transition-opacity" />
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA: COMPRA */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r from-cyan-500 to-blue-600 after:rounded-full after:mt-1">
              Compra
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/productos', label: 'Todos los productos' },
                { href: '/categorias', label: 'Categorías' },
                { href: '/ofertas', label: 'Ofertas especiales' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA: AYUDA */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r from-cyan-500 to-blue-600 after:rounded-full after:mt-1">
              Ayuda
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/contacto', label: 'Contacto' },
                { href: '/envios', label: 'Envíos' },
                { href: '/devoluciones', label: 'Devoluciones' },
                { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA: SUSCRIPCIÓN */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-4 relative after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[2px] after:bg-gradient-to-r from-cyan-500 to-blue-600 after:rounded-full after:mt-1">
              Suscríbete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Sé parte de nuestra comunidad. Recibe descuentos exclusivos y las últimas novedades tecnológicas.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex bg-white/70 dark:bg-gray-900/60 backdrop-blur-md rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-400 dark:focus-within:ring-cyan-500 transition-all"
            >
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-semibold hover:brightness-110 transition-all"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div className="mt-14 border-t border-gray-200/70 dark:border-gray-800/70 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-500 text-sm tracking-wide">
            © {new Date().getFullYear()}{' '}
            <span className="font-semibold text-gray-800 dark:text-gray-200">Lidio</span> · Todos los derechos reservados
            <br className="block sm:hidden" />

          </p>
        </div>
      </div>

      {/* LÍNEA INFERIOR BRILLANTE */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 animate-gradient-x" />
    </footer>
  );
}
