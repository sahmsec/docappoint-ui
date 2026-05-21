'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';

// Import extracted sections
import HeroSection from '@/components/home/HeroSection';
import TopDoctorsSection from '@/components/home/TopDoctorsSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection';

// Main Home Page
export default function HomePage() {
  const containerWrapperRef = useRef(null);
  const unifiedContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for the browser to paint and hydration to complete
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Large Screens (Desktop)
        mm.add("(min-width: 1024px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerWrapperRef.current,
              start: 'top bottom', // Start exactly at the bottom
              end: 'top 15%',      // Increased distance so it takes more scrolling to finish
              scrub: 0.5,
            }
          });

          // Use scale instead of width to prevent layout "breaking"
          tl.fromTo(unifiedContainerRef.current, {
            scale: 0.5,
            borderTopLeftRadius: '80px',
            borderTopRightRadius: '80px',
          }, {
            scale: 1,
            borderTopLeftRadius: '0px',
            borderTopRightRadius: '0px',
            ease: 'none' // Linear ease ensures it moves slowly and consistently on every small scroll
          }, 0);
        });

        // Disabled GSAP ScrollTrigger entirely for small screens
        // Mobile stays at full width naturally as per user request.
      });

      return () => ctx.revert();
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-bg-main flex items-center justify-center"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-bg-main min-h-screen">
        {/* Sticky Overlap Container */}
        <div className="relative w-full">

          {/* Pinned Hero Section using CSS Sticky */}
          <div className="w-full sticky top-0 z-0">
            <HeroSection />
          </div>

          {/* GSAP Trigger Wrapper */}
          <div ref={containerWrapperRef} className="relative z-10 w-full flex justify-center">
            
            {/* Unified Container for all sections below Hero */}
            <div 
              ref={unifiedContainerRef}
              className="relative w-full bg-bg-main rounded-t-[48px] md:rounded-t-[80px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden origin-top"
            >
              
              <div className="pt-12 md:pt-20">
                <TopDoctorsSection />
              </div>
              
              <MarqueeSection />
              <ServicesSection />

              {/* Seamless Curved CSS Divider Reversed (U-shape) */}
              <div className="w-full h-24 md:h-40 bg-primary rounded-b-[48px] md:rounded-b-[80px] relative mt-8 md:mt-0">
                {/* Top Concave Curve (Dark page background curving downwards into the center) */}
                <div
                  className="w-full h-8 md:h-16 bg-bg-main rounded-b-[48px] md:rounded-b-[80px] absolute top-[-2px] left-0"
                />
              </div>

              <WhyChooseUsSection />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
