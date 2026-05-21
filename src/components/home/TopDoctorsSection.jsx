'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/axios';
import Loader from '@/components/Loader';
import AnimatedButton from '@/components/AnimatedButton';
import DoctorCard from '@/components/DoctorCard';

export default function TopDoctorsSection() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);

  const autoRotateIntervalRef = useRef(null);
  const touchTimeoutRef = useRef(null);

  const startAutoRotation = () => {
    if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current);
    autoRotateIntervalRef.current = setInterval(() => {
      setActiveDoctorIndex((currentIndex) => (currentIndex + 1) % doctors.length);
    }, 3200);
  };

  const stopAutoRotation = () => {
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
      autoRotateIntervalRef.current = null;
    }
    if (touchTimeoutRef.current) {
      clearTimeout(touchTimeoutRef.current);
      touchTimeoutRef.current = null;
    }
  };

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
    if (doctors.length > 1) {
      startAutoRotation();
    }
    return () => stopAutoRotation();
  }, [doctors]);

  const handleTouchStart = () => {
    stopAutoRotation();
  };

  const handleTouchEnd = () => {
    stopAutoRotation();
    touchTimeoutRef.current = setTimeout(() => {
      setActiveDoctorIndex((currentIndex) => (currentIndex + 1) % doctors.length);
      startAutoRotation();
    }, 2000);
  };

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
    <section className="w-full py-8 lg:py-10 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 flex flex-col items-center">

        <div className="text-center mb-4 flex flex-col items-center">
          <div className="overflow-hidden mb-2 pb-1">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* <span className="inline-block px-4 py-1 rounded-full bg-bg-soft text-primary text-xs font-bold border border-primary/25">
                Top Rated
              </span> */}
            </motion.div>
          </div>
          <div className="overflow-hidden mb-2 pb-1">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-[32px] md:text-[40px] font-semibold text-text-main tracking-tight leading-tight"
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
              className="text-text-secondary max-w-xl mx-auto text-sm md:text-base"
            >
              Meet our highly-rated medical professionals dedicated to exceptional healthcare.
            </motion.p>
          </div>
        </div>

        {errorMsg ? (
          <div className="flex justify-center py-4 text-red-500 font-bold">
            API Error: {errorMsg}
          </div>
        ) : loading ? (
          <div className="flex justify-center py-6">
            <Loader />
          </div>
        ) : (
          <>
            {/* Desktop Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="hidden lg:grid lg:grid-cols-3 gap-4 w-full transform scale-[0.82] origin-center"
            >
              {doctors.map((doctor) => (
                <motion.div
                  key={doctor._id}
                  variants={cardVariants}
                  className="flex justify-center w-full"
                >
                  <DoctorCard doctor={doctor} />
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile & Tablet Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="block w-full lg:hidden transform scale-[0.85] md:scale-[0.9] origin-center"
            >
              <div className="mx-auto flex max-w-[360px] flex-col items-center px-4">
                <div
                  className="relative h-[340px] w-full overflow-hidden rounded-[40px]"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleTouchStart}
                  onMouseUp={handleTouchEnd}
                  onMouseLeave={handleTouchEnd}
                >
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
                  <div className="mt-4 flex items-center gap-2">
                    {doctors.map((doctor, index) => (
                      <button
                        key={doctor._id}
                        type="button"
                        onClick={() => setActiveDoctorIndex(index)}
                        aria-label={`Show doctor ${index + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${index === activeDoctorIndex
                          ? 'w-8 bg-primary'
                          : 'w-2.5 bg-primary/20 hover:bg-primary/40'
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
          className="text-center mt-4"
        >
          <AnimatedButton
            text="View All Doctors"
            href="/appointments"
            variant="secondary"
            className="py-2.5 px-10 md:py-3 md:px-14 text-sm md:text-base"
          />
        </motion.div>
      </div>
    </section>
  );
}
