'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {
  Heart,
  Activity,
  Shield,
  Users,
  Award,
  Clock
} from 'lucide-react';

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
                  className="w-full h-full relative rounded-sm overflow-hidden bg-primary cursor-pointer"
                  onClick={() => setIsExpanded(false)}
                >
                  <Image src={service.image} alt={service.title} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/30" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-sm flex items-center justify-center bg-accent border border-accent backdrop-blur-sm flex-shrink-0 shadow-lg shadow-accent/20">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-extrabold m-0 text-white text-[22px] leading-tight">{service.title}</h3>
                    </div>
                    <p className="text-bg-soft/90 text-[14px] leading-relaxed m-0 font-medium pr-2 mb-4">{service.description}</p>

                    {/* Mobile details list */}
                    <ul className="flex flex-col gap-2 list-none p-0 m-0 border-t border-accent/30 pt-3">
                      {service.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-bg-soft text-[13px] flex items-center gap-2 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
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
            className="relative flex-1 rounded-sm overflow-hidden cursor-pointer bg-primary border border-accent/20 hover:bg-[#1a3b2e] transition-colors"
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-[0.15]">
              <Image src={service.image} alt={service.title} fill className="object-cover grayscale" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-between pb-6 pt-6 z-10">
              {/* Vertical text */}
              <div className="flex-1 flex items-center justify-center overflow-hidden w-full px-1">
                <span
                  className="text-bg-soft font-bold text-xs tracking-[0.15em] uppercase whitespace-nowrap"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {service.title}
                </span>
              </div>

              {/* Icon at bottom */}
              <div className="mt-4 w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center backdrop-blur-sm">
                <Icon className="w-[18px] h-[18px] text-accent" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesSection() {
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
              </motion.div>
            </div>
            <div className="overflow-hidden mb-4 pb-2">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-[44px] md:text-[48px] font-semibold text-text-main tracking-tight leading-tight"
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
                className="text-text-secondary max-w-2xl mx-auto"
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
                          <div className="w-8 h-[1px] bg-accent/40 my-2 mx-auto" />
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
