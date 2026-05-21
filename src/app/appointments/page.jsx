'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../lib/auth-context';
import api from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ChevronRight, Filter, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';
import AnimatedButton from '@/components/AnimatedButton';

export default function AllAppointmentsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [searchQuery, sortBy]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (sortBy) params.append('sort', sortBy);

      const { data } = await api.get(`/api/doctors?${params.toString()}`);
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (doctorId) => {
    if (!user) {
      router.push(`/login?redirect=/doctors/${doctorId}`);
    } else {
      router.push(`/doctors/${doctorId}`);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isInitialLoad && (
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

      <div className="min-h-screen bg-bg-main">
        {/* Theme-Aware Hero Header */}
        <div className="w-full pt-32 md:pt-40 pb-28 relative overflow-hidden transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="overflow-hidden pb-1 lg:pb-2 mb-6">
                <motion.h1
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: isInitialLoad ? 0.8 : 0, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-medium text-hero-title tracking-tight transition-colors duration-300 inline-block"
                >
                  Our Specialists
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: isInitialLoad ? 0.9 : 0.1, ease: "easeOut" }}
                  className="text-hero-text text-lg max-w-2xl mx-auto transition-colors duration-300 inline-block"
                >
                  Find the perfect doctor for your needs. Browse our comprehensive list of medical professionals.
                </motion.p>
              </div>
            </div>
          </div>

          <div className="w-full h-16 md:h-24 bg-bg-main rounded-t-[48px] md:rounded-t-[80px] absolute bottom-[-2px] left-0" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-20 pb-24">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-3xl mx-auto mb-8 relative z-20"
          >
            <div className="flex items-center bg-primary backdrop-blur-xl rounded-[100px] shadow-[0_20px_40px_rgba(17,40,31,0.15)] p-2 focus-within:ring-2 focus-within:ring-accent/50 transition-all duration-300">
              <div className="flex-1 flex items-center pl-5 pr-3 border-r border-bg-main opacity-90">
                <Search className="w-5 h-5 text-bg-main opacity-70 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by doctor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-3 bg-transparent border-none outline-none text-bg-main font-medium placeholder:text-bg-main placeholder:opacity-60 text-sm md:text-base"
                />
              </div>
              <div className="flex items-center pl-3 pr-2 md:pl-5 flex-shrink-0 relative opacity-90">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-2 pr-8 py-3 bg-transparent border-none outline-none text-bg-main font-bold appearance-none cursor-pointer text-xs md:text-sm w-[110px] md:w-[150px]"
                >
                  <option value="" className="bg-primary text-bg-main">Sort by</option>
                  <option value="rating" className="bg-primary text-bg-main">Highest Rated</option>
                  <option value="fee-low" className="bg-primary text-bg-main">Fee: Low to High</option>
                  <option value="fee-high" className="bg-primary text-bg-main">Fee: High to Low</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowUpDown className="w-4 h-4 text-bg-main opacity-80" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8 px-2 text-primary/60 font-medium text-sm">
            Showing {doctors.length} doctor{doctors.length !== 1 ? 's' : ''}
          </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : doctors.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-bg-soft/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-text-main mb-2">No doctors found</h3>
            <p className="text-text-secondary">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 pt-6 justify-items-center"
          >
            {doctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -8 }}
                className="group relative flex w-full max-w-[280px] h-[360px] flex-col rounded-[32px] rounded-tl-[55px] bg-bg-card border border-bg-soft p-[3px] shadow-[0_30px_60px_-5px_rgba(17,40,31,0.12),0_10px_30px_-10px_rgba(78,155,99,0.1)] cursor-pointer overflow-hidden"
              >
                {/* Profile Pic */}
                <div className="absolute w-[80px] h-[80px] top-[14px] left-[14px] rounded-full z-[3] border-[4px] border-white shadow-[0_8px_24px_0px_rgba(17,40,31,0.15)] overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-bg-card/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-10 shadow-sm border border-border">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-text-main">{doctor.rating}</span>
                </div>

                {/* Bottom Mint Green Panel */}
                <div className="absolute bottom-[3px] left-[3px] right-[3px] top-[22%] rounded-[55px_29px_29px_29px] bg-bg-soft shadow-[0_10px_30px_0px_rgba(0,0,0,0.1)] px-5 pb-4 pt-[75px] flex flex-col justify-between">
                  <div className="flex flex-col">
                    <h5 className="mb-1 block font-sans text-lg font-bold leading-snug tracking-normal text-text-main line-clamp-1">
                      {doctor.name}
                    </h5>
                    <p className="block font-sans text-[13px] font-semibold leading-relaxed text-primary mb-1">
                      {doctor.specialty}
                    </p>
                    <p className="block font-sans text-[12px] font-medium leading-relaxed text-primary line-clamp-3">
                      {doctor.description || `${doctor.hospital} • ${doctor.location}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Fee</span>
                      <span className="text-lg font-bold text-text-main leading-tight">${doctor.fee}</span>
                    </div>
                    <AnimatedButton
                      text="View Details"
                      onClick={() => handleViewDetails(doctor._id)}
                      className="!py-1.5 !px-5 !text-[12px]"
                      variant="dark"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
}
