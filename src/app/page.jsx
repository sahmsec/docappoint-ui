'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import {
  Stethoscope,
  Heart,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Activity,
  Users,
  Award,
  ChevronRight,
  Search,
  Phone,
  ArrowUpRight
} from 'lucide-react';


import api from '@/lib/axios';
import { useAuth } from '@/lib/auth-context';
import Loader from '@/components/Loader';
import AnimatedButton from '@/components/AnimatedButton';
import DoctorCard from '@/components/DoctorCard';
import styled from 'styled-components';

// Hero Section
function HeroSection() {
  const avatars = [
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop'
  ];

  return (
    <section className="w-full relative overflow-hidden min-h-[700px] md:min-h-[100svh] pt-28 pb-16 md:py-24 flex items-center justify-center bg-gradient-to-br from-[#11281F] via-[#11281F] to-[#1A3B2E]">
      
      {/* Ambient Glows directly on the section */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Hero Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">

        {/* Left Side: Hero Image */}
            <div className="w-full md:w-[44.4%] h-[260px] sm:h-[320px] md:h-[450px] flex items-center justify-center pointer-events-auto z-10 relative order-2 md:order-1 pt-4 md:pt-0">
              <motion.div
                initial={{ y: "20%", opacity: 0 }}
                whileInView={{ y: "0%", opacity: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 45, damping: 18, delay: 0.3 }}
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
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-md py-2 px-4 rounded-full shadow-sm border border-white/[0.08] pointer-events-none"
                >
                  <Stethoscope className="w-5 h-5 text-[#B5E3B0]" />
                  <span className="text-[#DDF1D8] text-[14px] font-bold tracking-wide uppercase">Your Health, Our Priority</span>
                </motion.div>
              </div>

              {/* Title with staggered line reveal entrance */}
              <h1 className="text-5xl lg:text-[68px] xl:text-[76px] font-medium text-[#ffffff] leading-[0.95] tracking-tighter mb-6">
                <div className="overflow-hidden pb-1 lg:pb-2">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="mb-1 flex max-w-full flex-wrap items-center gap-2 lg:gap-3 sm:flex-nowrap sm:whitespace-nowrap"
                  >
                    <span className="text-[#B5E3B0]">Medical</span>
                    <div className="inline-flex -space-x-3 md:-space-x-4">
                      {avatars.map((src, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: false }}
                          transition={{ delay: 0.4 + (idx * 0.1), type: "spring" }}
                          className="w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] border-[#11281F] overflow-hidden shadow-md"
                        >
                          <Image src={src} alt="Doctor avatar" width={80} height={80} className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-[#B5E3B0]">Care</span>
                  </motion.div>
                </div>
                <div className="overflow-hidden pb-1 lg:pb-2">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: "0%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
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
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="text-[#DDF1D8]/80 text-[16px] md:text-[18px] max-w-lg leading-relaxed font-medium"
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
                  transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                >
                  <AnimatedButton text="Book an Appointment" href="/appointments" variant="light" />
                </motion.div>
              </div>
            </div>

      </div>
    </section>
  );
}

// Top Rated Doctors Section
function TopDoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get('/api/doctors?sort=rating');
        if (data.success) {
          setDoctors(data.data.slice(0, 3));
        } else {
          setErrorMsg('API returned success: false');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (doctors.length <= 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setActiveDoctorIndex((currentIndex) => (currentIndex + 1) % doctors.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, [doctors]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="overflow-hidden mb-4 pb-1">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-[#DDF1D8] text-[#11281F] text-sm font-bold border border-[#11281F]/25">
                Top Rated
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-4 pb-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-[44px] md:text-[48px] font-semibold text-[#111111] tracking-tight leading-tight"
            >
              Our Best Doctors
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-[#6B7280] max-w-2xl mx-auto"
            >
              Meet our highly-rated medical professionals who are dedicated to providing exceptional healthcare services.
            </motion.p>
          </div>
        </div>

        {errorMsg ? (
          <div className="flex justify-center py-12 text-red-500 font-bold">
            API Error: {errorMsg}
          </div>
        ) : loading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : (
          <>
            {/* Desktop Grid Layout (Large screens only) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              className="hidden lg:grid lg:grid-cols-3 gap-8"
            >
              {doctors.map((doctor) => (
                <motion.div
                  key={doctor._id}
                  variants={cardVariants}
                  className="flex justify-center"
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile & Tablet Fixed Stage (Hidden on large screens) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="block w-full lg:hidden"
            >
              <div className="mx-auto flex max-w-[360px] flex-col items-center px-4">
                <div className="relative h-[360px] w-full overflow-hidden rounded-[40px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={doctors[activeDoctorIndex]?._id}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <DoctorCard doctor={doctors[activeDoctorIndex]} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {doctors.length > 1 && (
                  <div className="mt-6 flex items-center gap-2">
                    {doctors.map((doctor, index) => (
                      <button
                        key={doctor._id}
                        type="button"
                        onClick={() => setActiveDoctorIndex(index)}
                        aria-label={`Show doctor ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeDoctorIndex
                            ? 'w-8 bg-[#11281F]'
                            : 'w-2.5 bg-[#11281F]/20 hover:bg-[#11281F]/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center mt-12"
        >
          <AnimatedButton
            text="View All Doctors"
            href="/appointments"
            variant="secondary"
            className="py-3 px-14 text-base"
          />
        </motion.div>
      </div> {/* Close page max-w-7xl container to allow full-width marquee bar */}

    </section>
  );
}

// Trusted Partners Marquee Section
function MarqueeSection() {
  return (
    <section className="w-full bg-[#FFFFFF] rounded-t-[48px] md:rounded-t-[80px] relative py-20 md:py-28 z-20">
      
      {/* Marquee Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden py-8">
        {/* Fade overlays for the edges of the container margins */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex gap-20 items-center">
          {/* Double mapping of partner list to ensure seamless endless loop */}
          {[
            { name: 'Apollo Hospitals', icon: Shield },
            { name: 'Square Hospital', icon: Heart },
            { name: 'Evercare Group', icon: Stethoscope },
            { name: 'Labaid Group', icon: Activity },
            { name: 'Ibn Sina Group', icon: Award },
            { name: 'United Hospital', icon: Star },
            { name: 'Square Pharma', icon: Clock }
          ].concat([
            { name: 'Apollo Hospitals', icon: Shield },
            { name: 'Square Hospital', icon: Heart },
            { name: 'Evercare Group', icon: Stethoscope },
            { name: 'Labaid Group', icon: Activity },
            { name: 'Ibn Sina Group', icon: Award },
            { name: 'United Hospital', icon: Star },
            { name: 'Square Pharma', icon: Clock }
          ]).map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 transition-all duration-300 select-none group opacity-40 hover:opacity-100 cursor-pointer"
            >
              <partner.icon className="w-7 h-7 text-[#11281F] group-hover:text-[#4E9B63] transition-all duration-300 flex-shrink-0" />
              <span className="text-[#11281F] font-extrabold text-lg tracking-tight group-hover:text-[#4E9B63] transition-colors duration-300 whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Concave Curve (Light page background curving upwards into the white corners) */}
      <div 
        className="w-full h-12 md:h-20 bg-[#F4FAF2] rounded-t-[48px] md:rounded-t-[80px] absolute bottom-[-2px] left-0"
      />
    </section>
  );
}

// Deleted styled-component to prevent Next.js 15 App Router CSS-in-JS hydration breakdown.
// The styles are now injected via a bulletproof inline style tag in the component.

// Mobile Vertical Interactive Accordion (Pillars -> Swiper)
function MobileServicesAccordion({ services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  if (isExpanded) {
    return (
      <div className="w-full h-[520px] mt-8 lg:hidden px-2 relative animate-fade-in">
        <Swiper
          initialSlide={activeIndex}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={16}
          slidesPerView={1}
          className="w-full h-full rounded-sm"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <SwiperSlide key={idx} className="w-full h-full">
                <div 
                  className="w-full h-full relative rounded-sm overflow-hidden bg-[#11281F] cursor-pointer"
                  onClick={() => setIsExpanded(false)}
                >
                  <Image src={service.image} alt={service.title} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11281F] via-[#11281F]/80 to-[#11281F]/30" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-[#4E9B63] border border-[#4E9B63] backdrop-blur-sm flex-shrink-0 shadow-lg shadow-[#4E9B63]/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-extrabold m-0 text-white text-[22px] leading-tight">{service.title}</h3>
                    </div>
                    <p className="text-[#DDF1D8]/90 text-[14px] leading-relaxed m-0 font-medium pr-2 mb-4">{service.description}</p>
                    
                    {/* Mobile details list */}
                    <ul className="flex flex-col gap-2 list-none p-0 m-0 border-t border-[#4E9B63]/30 pt-3">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-[#DDF1D8] text-[13px] flex items-center gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4E9B63] flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    
                    {/* Hint text to close */}
                    <div className="absolute top-4 right-4 bg-black/40 px-3 py-1.5 rounded-sm backdrop-blur-md border border-white/10 flex items-center gap-2">
                      <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Tap to close</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-1 w-full h-[450px] mt-8 lg:hidden px-2 animate-fade-in">
      {services.map((service, idx) => {
        const Icon = service.icon;
        
        return (
          <div
            key={idx}
            onClick={() => {
              setActiveIndex(idx);
              setIsExpanded(true);
            }}
            className="relative flex-1 rounded-sm overflow-hidden cursor-pointer bg-[#11281F] border border-[#4E9B63]/20 hover:bg-[#1a3b2e] transition-colors"
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-[0.15]">
              <Image src={service.image} alt={service.title} fill className="object-cover grayscale" />
            </div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-between pb-6 pt-6 z-10">
               {/* Vertical text */}
               <div className="flex-1 flex items-center justify-center overflow-hidden w-full px-1">
                 <span 
                   className="text-[#DDF1D8] font-bold text-xs tracking-[0.15em] uppercase whitespace-nowrap"
                   style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                 >
                   {service.title}
                 </span>
               </div>
               
               {/* Icon at bottom */}
               <div className="mt-4 w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center backdrop-blur-sm">
                 <Icon className="w-[18px] h-[18px] text-[#4E9B63]" />
               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Deleted styled-component to prevent SSR hydration errors in Next.js 15.
// The styles are injected globally inside the component itself.

function ServicesSection() {
  const services = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostics and treatment options.',
      image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&h=400&fit=crop',
      details: ['Advanced ECG & Echo', 'Coronary Care Unit', 'Heart Failure Clinic']
    },
    {
      icon: Activity,
      title: 'Neurology',
      description: 'Expert care for brain, spine, and nervous system conditions.',
      image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=300&h=400&fit=crop',
      details: ['Stroke Response Care', 'Comprehensive Epilepsy', 'Diagnostic EEG & EMG']
    },
    {
      icon: Shield,
      title: 'General Medicine',
      description: 'Primary healthcare services for all age groups and conditions.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=300&h=400&fit=crop',
      details: ['Chronic Care Control', 'Preventative Screenings', 'Wellness Vaccinations']
    },
    {
      icon: Users,
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents.',
      image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=300&h=400&fit=crop',
      details: ['Growth Assessment', 'Childhood Vaccines', 'Newborn Screening']
    },
    {
      icon: Award,
      title: 'Orthopedics',
      description: 'Bone, joint, and muscle care with surgical and non-surgical options.',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&h=400&fit=crop',
      details: ['Joint Replacement', 'Sports Injury Clinic', 'Fracture Recovery']
    },
    {
      icon: Clock,
      title: '24/7 Emergency',
      description: 'Round-the-clock emergency medical services when you need them most.',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=300&h=400&fit=crop',
      details: ['Trauma Response', 'Critical Care Support', 'Ambulance Dispatch']
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neumorphic-section-custom">
          <div className="text-center mb-6 flex flex-col items-center">
            <div className="overflow-hidden mb-4 pb-1">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-[#DDF1D8] text-[#11281F] text-sm font-bold border border-[#11281F]/25">
                  Our Services
                </span>
              </motion.div>
            </div>
            <div className="overflow-hidden mb-4 pb-2">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-[44px] md:text-[48px] font-semibold text-[#111111] tracking-tight leading-tight"
              >
                Specialized Medical Care
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-[#6B7280] max-w-2xl mx-auto"
              >
                We offer a wide range of medical specialties to cater to all your healthcare needs under one roof.
              </motion.p>
            </div>
          </div>

          {/* Desktop 3D Spinning Cylinder Carousel */}
          <div className="hidden lg:block py-10">
            <div className="service-carousel-container">
              <div className="card-3d">
                {[...services, ...services.slice(0, 4)].map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <div key={`${service.title}-${idx}`} className="card-item">
                      <div className="img-wrapper">
                        <img src={service.image} className="img" alt={service.title} />
                      </div>
                      <div className="overlay">
                        <div className="icon-box">
                          <Icon className="icon-svg" />
                        </div>
                        <h4 className="card-title">{service.title}</h4>
                        
                        {/* Rich details & Sub-specialties */}
                        <div className="card-details-box">
                          <div className="w-8 h-[1px] bg-[#4E9B63]/40 my-2 mx-auto" />
                          <ul className="details-list">
                            {service.details.map((detail, dIdx) => (
                              <li key={dIdx} className="details-item">
                                <span className="bullet-dot">•</span> {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile Vertical Interactive Accordion */}
          <MobileServicesAccordion services={services} />
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section (Additional Section 2)
function WhyChooseUsSection() {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is protected with enterprise-grade security and encryption.',
    },
    {
      icon: Star,
      title: 'Verified Doctors',
      description: 'All doctors are verified professionals with proven track records.',
    },
    {
      icon: Clock,
      title: 'Instant Booking',
      description: 'Book appointments in seconds with our streamlined booking process.',
    },
  ];

  return (
    <section className="pt-12 pb-20 md:pt-16 md:pb-28 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16 flex flex-col items-center">
          <div className="overflow-hidden mb-4 pb-1">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-block px-4 py-1 rounded-full bg-[#DDF1D8] text-[#11281F] text-sm font-bold border border-[#11281F]/25">
                Why Choose Us
              </span>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-4 pb-2">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-[44px] md:text-[48px] font-semibold text-[#111111] tracking-tight leading-tight"
            >
              Why choose us?
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-[#6B7280] text-[16px] max-w-2xl mx-auto font-medium"
            >
              We combine cutting-edge technology with compassionate care to deliver an unmatched healthcare experience.
            </motion.p>
          </div>
        </div>

        {/* Desktop Grid Layout (Hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-3 gap-12 lg:gap-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 w-20 h-20 rounded-2xl bg-[#DDF1D8]/60 border border-[#11281F]/10 flex items-center justify-center text-[#11281F] mx-auto transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#111111] mb-4">{feature.title}</h3>
              <p className="text-[#6B7280] text-[15px] leading-relaxed max-w-[280px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider Layout (Visible on mobile/tablet, hidden on desktop) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="block md:hidden w-full px-2"
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              }
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="w-full overflow-hidden py-4"
          >
            {features.map((feature) => (
              <SwiperSlide key={feature.title} className="flex justify-center">
                <div className="flex flex-col items-center text-center group bg-white/85 backdrop-blur-md rounded-[24px] p-8 border border-[#11281F]/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] w-full max-w-[310px] min-h-[250px] justify-center">
                  <div className="mb-5 w-16 h-16 rounded-2xl bg-[#DDF1D8]/60 border border-[#11281F]/10 flex items-center justify-center text-[#11281F] mx-auto transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-[#111111] mb-2">{feature.title}</h3>
                  <p className="text-[#6B7280] text-[14px] leading-relaxed max-w-[240px]">
                    {feature.description}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}

// Main Home Page
export default function HomePage() {
  const heroWrapperRef = useRef(null);
  const heroRef = useRef(null);
  const topDoctorsRef = useRef(null);
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
        // GSAP Timeline for overlapping Top Doctors card
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: topDoctorsRef.current,
          start: 'top bottom', // Start when the top of the card hits the bottom of the viewport
          end: 'top top',      // End when the top of the card hits the top of the viewport
          scrub: 1,
        }
      });

      tl.fromTo(topDoctorsRef.current, {
        scale: 0.5,
        borderRadius: '48px',
        boxShadow: '0px -20px 40px rgba(0,0,0,0.12)'
      }, {
        scale: 1,
        borderRadius: '0px',
        boxShadow: '0px 0px 0px rgba(0,0,0,0)',
        ease: 'none'
      });
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
            className="fixed inset-0 z-[9999] bg-[#11281F] flex items-center justify-center"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-[#F4FAF2] min-h-screen">
      {/* Sticky Overlap Container */}
      <div className="relative w-full">
        
        {/* Pinned Hero Section using CSS Sticky */}
        <div className="w-full sticky top-0 z-0">
          <HeroSection />
        </div>

        {/* Top Doctors Section (Overlapping) */}
        <div 
          ref={topDoctorsRef} 
          className="relative w-full z-10 bg-[#F4FAF2] origin-top will-change-transform"
        >
          <TopDoctorsSection />
        </div>

      </div>
      <MarqueeSection />
      <ServicesSection />
      
      {/* Seamless Curved CSS Divider (Exact Design, No Lines) */}
      <div className="w-full h-24 md:h-40 bg-[#11281F] rounded-t-[48px] md:rounded-t-[80px] relative">
        {/* Bottom Concave Curve (Light page background curving upwards into the corners) */}
        <div 
          className="w-full h-8 md:h-16 bg-[#F4FAF2] rounded-t-[48px] md:rounded-t-[80px] absolute bottom-[-2px] left-0"
        />
      </div>

      <WhyChooseUsSection />
    </div>
    </>
  );
}
