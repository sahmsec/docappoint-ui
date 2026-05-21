'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Shield, Star, Clock } from 'lucide-react';

export default function WhyChooseUsSection() {
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
              Why choose us?
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-text-secondary text-[16px] max-w-2xl mx-auto font-medium"
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
              <div className="mb-6 w-20 h-20 rounded-2xl bg-bg-soft/60 border border-primary/10 flex items-center justify-center text-primary mx-auto transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="text-[20px] font-bold text-text-main mb-4">{feature.title}</h3>
              <p className="text-text-secondary text-[15px] leading-relaxed max-w-[280px]">
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
                <div className="flex flex-col items-center text-center group bg-bg-card/85 backdrop-blur-md rounded-[24px] p-8 border border-primary/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] w-full max-w-[310px] min-h-[250px] justify-center">
                  <div className="mb-5 w-16 h-16 rounded-2xl bg-bg-soft/60 border border-primary/10 flex items-center justify-center text-primary mx-auto transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-[18px] font-bold text-text-main mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-[14px] leading-relaxed max-w-[240px]">
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
