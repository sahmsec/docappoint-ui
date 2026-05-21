'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';

export default function HeroSection() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const baseDelay = hasLoaded ? 0 : 0.8;

  const avatars = [
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop'
  ];

  return (
    <section className="w-full relative overflow-hidden min-h-[700px] md:min-h-[100svh] pt-28 pb-16 md:py-24 flex items-center justify-center transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>

      {/* Ambient Glows directly on the section */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">

        {/* Left Side: Hero Image */}
        <div className="w-full md:w-[44.4%] h-[260px] sm:h-[320px] md:h-[450px] flex items-center justify-center pointer-events-auto z-10 relative order-2 md:order-1 pt-4 md:pt-0">
          <motion.div
            initial={{ y: "20%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 45, damping: 18, delay: baseDelay + 0.3 }}
            className="relative h-full w-full max-w-[540px] flex items-center"
          >
            <Image
              src="/doctor-bro.svg"
              alt="DocAppoint Best Doctor SVG"
              fill
              className="object-contain object-center select-none scale-105 md:scale-110 origin-center brightness-110 saturate-[0.85] contrast-105 drop-shadow-2xl"
              priority
            />
          </motion.div>
        </div>

        {/* Right Side: Texts */}
        <div className="w-full md:w-[55.6%] h-full flex flex-col justify-center items-start pl-0 md:pl-6 lg:pl-12 relative z-10 order-1 md:order-2">
          {/* Badge */}
          <div className="overflow-hidden mb-6 pb-2">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: baseDelay + 0.1, ease: "easeOut" }}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-full shadow-sm border pointer-events-none transition-all duration-300"
              style={{ background: 'var(--hero-badge-bg)', borderColor: 'var(--hero-badge-border)' }}
            >
              <Stethoscope className="w-5 h-5 transition-colors duration-300 text-hero-badge-text" />
              <span className="text-[14px] font-bold tracking-wide uppercase transition-colors duration-300 text-hero-badge-text">Your Health, Our Priority</span>
            </motion.div>
          </div>

          {/* Title with staggered line reveal entrance */}
          <h1 className="text-5xl lg:text-[68px] xl:text-[76px] font-medium leading-[0.95] tracking-tighter mb-6 transition-colors duration-300 text-hero-title">
            <div className="overflow-hidden pb-1 lg:pb-2">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: baseDelay + 0.2, ease: "easeOut" }}
                className="mb-1 flex max-w-full flex-nowrap items-center gap-2 lg:gap-3 whitespace-nowrap"
              >
                <span className="text-hero-highlight">Medical</span>
                <div className="inline-flex shrink-0 -space-x-3 md:-space-x-4">
                  {avatars.map((src, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ delay: baseDelay + 0.4 + (idx * 0.1), type: "spring" }}
                      className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full border-[3px] overflow-hidden shadow-md"
                      style={{ borderColor: 'var(--hero-bg)' }}
                    >
                      <Image src={src} alt="Patient avatar" width={80} height={80} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
                <span className="text-hero-highlight">Care</span>
              </motion.div>
            </div>
            <div className="overflow-hidden pb-1 lg:pb-2">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, delay: baseDelay + 0.3, ease: "easeOut" }}
                className="inline-block"
              >
                You Can Trust
              </motion.div>
            </div>
          </h1>

          {/* Description */}
          <div className="overflow-hidden mb-8">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: baseDelay + 0.4, ease: "easeOut" }}
              className="text-[16px] md:text-[18px] max-w-lg leading-relaxed font-medium transition-colors duration-300 text-hero-text inline-block"
            >
              Every patient receives accurate diagnosis and effective treatment from our experienced doctors. Connect instantly with verified local medical professionals.
            </motion.p>
          </div>

          {/* Button */}
          <div className="overflow-hidden pb-2">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, delay: baseDelay + 0.5, ease: "easeOut" }}
              className="inline-block"
            >
              <AnimatedButton text="Book an Appointment" href="/appointments" variant="light" />
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
