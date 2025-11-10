'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="
        relative mt-20 overflow-hidden
        border-t border-slate-200/70 dark:border-slate-800/70
        bg-gradient-to-b from-white via-slate-50 to-slate-100
        dark:from-slate-950 dark:via-slate-950/80 dark:to-black
      "
    >
      {/* Halos suaves (motion-safe) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-24 h-72 w-72 rounded-full blur-[90px] opacity-60 bg-cyan-400/25 dark:bg-cyan-500/20 motion-safe:animate-pulse" />
        <div className="absolute -bottom-36 -right-24 h-80 w-80 rounded-full blur-[110px] opacity-60 bg-blue-500/20 dark:bg-blue-600/20 motion-safe:animate-pulse" />
      </div>

      {/* Línea luminosa superior */}
      <div aria-hidden className="absolute -top-px left-0 h-[2px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400" />

      {/* Contenido principal (mobile-first) */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-12 sm:py-14 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {/* Fila 1 */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Marca + sociales */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block group" aria-label="Ir al inicio">
              <div className="relative h-14 w-40 sm:h-16 sm:w-48">
                <Image
                  src="/logo.webp"
                  alt="Lidio"
                  fill
                  priority
                  className="
                    object-contain
                    drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]
                    group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.45)]
                    transition-all duration-500 ease-out
                  "
                />
              </div>
            </Link>

            <p className="mt-3 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300 max-w-md">
              Innovación, diseño y tecnología de vanguardia. En{' '}
              <span className="font-semibold text-blue-700 dark:text-cyan-400">Lidio</span>{' '}
              encuentras productos de alto rendimiento con soporte humano y entrega rápida en todo Chile.
            </p>

            {/* Trust badges: mejor toque y contraste para móvil */}
            <ul className="mt-5 grid grid-cols-3 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
              {[
                { Icon: ShieldCheck, label: 'Garantía' },
                { Icon: CreditCard, label: 'Pagos seguros' },
                { Icon: Clock, label: 'Despacho rápido' },
              ].map(({ Icon, label }) => (
                <li key={label}>
                  <div
                    className="
                      inline-flex items-center gap-2 rounded-xl border
                      border-slate-200/70 dark:border-slate-800/70
                      bg-white/80 dark:bg-white/5 backdrop-blur-md px-3 py-2
                      shadow-sm
                    "
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Sociales: targets cómodos al dedo */}
            <nav aria-label="Redes sociales" className="mt-5 flex gap-3">
              {[
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter, href: '#', label: 'X (Twitter)' },
                { Icon: Mail, href: 'mailto:hola@lidio.cl', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    relative inline-flex items-center justify-center
                    h-11 w-11 rounded-full border
                    border-slate-200/70 dark:border-slate-800
                    bg-white/80 dark:bg-white/5 backdrop-blur
                    transition-all duration-300 hover:scale-[1.04]
                    hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70
                    group
                  "
                >
                  <Icon className="h-5 w-5 text-slate-800 dark:text-slate-200 group-hover:text-white" />
                  <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 blur-md bg-gradient-to-r from-cyan-400 to-blue-600 transition-opacity" />
                </a>
              ))}
            </nav>
          </div>

          {/* Navegación rápida: dos columnas compactas en móvil */}
          <nav className="lg:col-span-3 grid grid-cols-2 gap-8" aria-label="Navegación secundaria">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Compra</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/productos', label: 'Todos los productos' },
                  { href: '/categorias', label: 'Categorías' },
                  { href: '/ofertas', label: 'Ofertas especiales' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        inline-flex items-center gap-2 rounded-md
                        text-[15px] text-slate-700 dark:text-slate-300
                        hover:text-blue-700 dark:hover:text-cyan-400
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70
                        transition-colors
                      "
                    >
                      <span className="h-[3px] w-[3px] rounded-full bg-slate-300 dark:bg-slate-600" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Ayuda</h3>
              <ul className="space-y-2.5">
                {[
                  { href: '/contacto', label: 'Contacto' },
                  { href: '/envios', label: 'Envíos' },
                  { href: '/devoluciones', label: 'Devoluciones' },
                  { href: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        inline-flex items-center gap-2 rounded-md
                        text-[15px] text-slate-700 dark:text-slate-300
                        hover:text-blue-700 dark:hover:text-cyan-400
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70
                        transition-colors
                      "
                    >
                      <span className="h-[3px] w-[3px] rounded-full bg-slate-300 dark:bg-slate-600" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Newsletter + contacto: inputs grandes y accesibles */}
          <div className="lg:col-span-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">Suscríbete</h3>
            <p className="text-[15px] text-slate-700 dark:text-slate-300 mb-4">
              Únete y recibe descuentos exclusivos y las últimas novedades tecnológicas.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              className="
                group flex items-stretch rounded-2xl overflow-hidden
                border border-slate-200/80 dark:border-slate-800
                bg-white/85 dark:bg-white/5 backdrop-blur
                focus-within:ring-2 focus-within:ring-cyan-500/70
                shadow-sm
              "
              aria-label="Formulario de suscripción"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                required
                aria-invalid="false"
                placeholder="Tu correo electrónico"
                className="
                  w-full px-4 py-3.5 text-[15px]
                  bg-transparent outline-none
                  placeholder:text-slate-400 dark:placeholder:text-slate-500
                  text-slate-900 dark:text-slate-100
                "
              />
              <button
                type="submit"
                className="
                  inline-flex items-center gap-2 px-4 sm:px-5
                  text-sm font-semibold text-white
                  bg-gradient-to-r from-cyan-600 to-blue-600
                  hover:from-cyan-700 hover:to-blue-700
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70
                  transition-all
                "
                aria-label="Enviar correo para suscripción"
              >
                Enviar <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <address className="not-italic mt-6 space-y-2.5 text-[15px]">
              <p className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <MapPin className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                RM, Chile
              </p>
              <p className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Phone className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                +56 9 0000 0000
              </p>
              <p className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                hola@lidio.cl
              </p>
            </address>
          </div>
        </div>

        {/* Pagos y apps */}
        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-6 lg:flex-row">
          <div className="flex flex-wrap items-center gap-3" aria-label="Medios de pago">
            {['visa', 'master', 'amex', 'debito'].map((key) => (
              <div
                key={key}
                className="
                  h-9 min-w-16 rounded-lg
                  border border-slate-200/80 dark:border-slate-800
                  bg-white/90 dark:bg-white/5 backdrop-blur
                  px-3 flex items-center justify-center
                  text-[12px] sm:text-[13px] font-semibold text-slate-800 dark:text-slate-200
                "
                role="img"
                aria-label={`Pago ${key}`}
              >
                {key.toUpperCase()}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#"
              className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-white/5 backdrop-blur px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
            >
              App Store
            </a>
            <a
              href="#"
              className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-white/5 backdrop-blur px-4 py-2.5 text-sm font-semibold text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70"
            >
              Google Play
            </a>
          </div>
        </div>

        {/* Separador fino */}
        <div aria-hidden className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

        {/* Legal */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p className="text-slate-600 dark:text-slate-400 text-center">
            © {year} <span className="font-semibold text-slate-900 dark:text-slate-100">Lidio</span>. Todos los derechos reservados.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-4 text-slate-700 dark:text-slate-300">
            <li>
              <Link
                href="/terminos"
                className="hover:text-blue-700 dark:hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded transition-colors"
              >
                Términos
              </Link>
            </li>
            <li>
              <Link
                href="/privacidad"
                className="hover:text-blue-700 dark:hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded transition-colors"
              >
                Privacidad
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="hover:text-blue-700 dark:hover:text-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70 rounded transition-colors"
              >
                Cookies
              </Link>
            </li>
          </ul>
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

      {/* Back to top flotante en móvil */}
      <div className="pointer-events-none fixed inset-x-0 bottom-[env(safe-area-inset-bottom)] z-40 flex justify-end px-4 pb-3 sm:hidden">
        <a
          href="#top"
          className="
            pointer-events-auto inline-flex items-center gap-2 rounded-full
            bg-slate-900/90 text-white px-4 py-2 shadow-lg
            focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/70
          "
          aria-label="Volver arriba"
        >
          ↑ Arriba
        </a>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes bgpos {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
      `}</style>
    </footer>
  );
}
