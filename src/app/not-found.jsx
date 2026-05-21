'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedButton from '@/components/AnimatedButton';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6 lg:p-12 transition-colors duration-300 relative overflow-hidden">
      
      {/* Ambient Glows to perfectly match the background vibe of other pages */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24 mt-16 md:mt-0 relative z-10">
        
        {/* Left Side: Animated Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          {/* Increased size significantly (max-w-lg to max-w-2xl) */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[350px] md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-square"
          >
            <Image
              src="/doctor-404.svg"
              alt="404 Illustration"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Text and Button (Perfectly centered as requested) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col items-center text-center"
        >
          {/* Huge 404 Text - Primary color with a glassy 3D gradient/shadow effect */}
          <h1 
            className="text-[120px] lg:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/80 to-primary/30 tracking-[0.1em] mb-4"
            style={{ filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.15)) drop-shadow(0px 4px 6px rgba(0,0,0,0.1))' }}
          >
            404
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold text-text-secondary mb-10 max-w-sm mt-2">
            Looks like this page is still in the waiting room!
          </p>

          <AnimatedButton
            text="Go Back"
            href="/"
            variant="dark"
            className="!py-4 !px-12"
          />
        </motion.div>
      </div>
    </div>
  );
}
