'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Cpu,
  ShieldCheck,
  Globe,
} from 'lucide-react';

const steps = [
  {
    icon: <Laptop className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: 'Todo en un solo lugar',
    text: 'Lidio es un marketplace de tecnología que reúne miles de productos de las mejores marcas: laptops, smartphones, audio, wearables y más.',
  },
  {
    icon: <Cpu className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: 'Innovación y rendimiento',
    text: 'Cada producto en Lidio es cuidadosamente seleccionado para ofrecerte el mejor equilibrio entre diseño, potencia y eficiencia.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: 'Confianza y seguridad',
    text: 'Tu compra está protegida. Contamos con métodos de pago seguros, garantía oficial y soporte técnico verificado.',
  },
  {
    icon: <Globe className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: 'Conectamos innovación global',
    text: 'Desde Chile al mundo, Lidio acerca la tecnología más avanzada a cada persona, impulsando la transformación digital.',
  },
  {
    icon: <Headphones className="w-6 h-6 sm:w-7 sm:h-7" />,
    title: 'Experiencia inteligente',
    text: 'Navega fácilmente, compara, compra y recibe en tu hogar con una experiencia digital rápida, fluida y transparente.',
  },
];

export default function Page() {
  return (
    <section
      id="about-lidio"
      className="relative py-24 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-white via-cyan-50/30 to-blue-50/20 
                 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 overflow-hidden"
    >
      {/* 🔹 Fondo luminoso */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-transparent blur-2xl" />
        <div className="absolute -bottom-20 right-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* 🧭 Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-400 bg-clip-text text-transparent">
          Conectamos tecnología con personas
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          En <span className="font-semibold text-blue-600 dark:text-cyan-400">Lidio</span> creemos que la innovación debe ser accesible para todos.  
          Creamos un espacio donde la tecnología, la confianza y la experiencia convergen.
        </p>
      </motion.div>

      {/* 🔷 Timeline limpio y moderno */}
      <div className="relative max-w-4xl mx-auto">
        {/* Línea vertical */}
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-cyan-400 via-blue-400 to-cyan-300 opacity-40"
        />

        <div className="flex flex-col gap-16 sm:gap-24 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative grid sm:grid-cols-[1fr_2rem_1fr] gap-10 items-center ${
                i % 2 === 0 ? '' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Texto */}
              <div
                className={`order-2 sm:order-${i % 2 === 0 ? '1' : '3'} ${
                  i % 2 === 0 ? 'text-right' : 'text-left'
                }`}
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.text}
                </p>
              </div>

              {/* Nodo central */}
              <div className="order-1 sm:order-2 flex justify-center relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center 
                             bg-gradient-to-br from-cyan-500 to-blue-600 text-white 
                             shadow-[0_0_20px_rgba(0,150,255,0.4)] border border-white/30 dark:border-slate-800/50"
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Imagen (sutil opcional / decorativa) */}
              <div
                className={`hidden sm:block order-3 sm:order-${
                  i % 2 === 0 ? '3' : '1'
                } opacity-80`}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-40 rounded-2xl bg-gradient-to-br from-cyan-100/40 to-blue-100/20 
                             dark:from-slate-800/40 dark:to-slate-900/20 border border-gray-200/40 dark:border-slate-700/40 
                             flex items-center justify-center backdrop-blur-sm shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
                >
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {step.title}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cierre */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base">
          Tecnología. Conexión. Confianza. <br />
          <span className="font-semibold text-blue-600 dark:text-cyan-400">
            Eso es Lidio.
          </span>
        </p>
      </motion.div>
    </section>
  );
}
