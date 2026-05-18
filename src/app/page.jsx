'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Stethoscope, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-[#F4FAF2] min-h-screen">
      <section className="w-full relative overflow-hidden min-h-[100svh] pt-28 pb-16 flex items-center justify-center bg-gradient-to-br from-[#11281F] via-[#11281F] to-[#1A3B2E]">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative h-[350px] md:h-[450px] w-full max-w-[500px]">
              <Image src="/doctor-bro.svg" alt="Doctor illustration" fill className="object-contain" priority />
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md py-2 px-4 rounded-full border border-white/10 mb-6">
                <Stethoscope className="w-5 h-5 text-[#B5E3B0]" />
                <span className="text-[#DDF1D8] text-sm font-bold uppercase tracking-wide">Your Health, Our Priority</span>
              </div>
            </motion.div>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="text-5xl lg:text-7xl font-medium text-white leading-tight tracking-tighter mb-6">
              <span className="text-[#B5E3B0]">Medical</span> Care You Can Trust
            </motion.h1>
            <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#DDF1D8]/80 text-lg max-w-lg leading-relaxed mb-8">
              Connect with verified medical professionals and book appointments instantly.
            </motion.p>
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link href="/appointments" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4E9B63] text-white font-bold hover:bg-[#3D8551] transition-colors shadow-lg">
                Book an Appointment <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
