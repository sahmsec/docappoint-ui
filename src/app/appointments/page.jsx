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
            className="fixed inset-0 z-[9999] bg-[#11281F] flex items-center justify-center"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#F4FAF2]">
        {/* Dark Hero Header */}
        <div className="w-full bg-gradient-to-br from-[#11281F] via-[#11281F] to-[#1A3B2E] pt-32 md:pt-40 pb-28 relative overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 tracking-tight">Our Specialists</h1>
              <p className="text-[#DDF1D8]/80 text-lg max-w-2xl mx-auto">
                Find the perfect doctor for your needs. Browse our comprehensive list of medical professionals.
              </p>
            </motion.div>
          </div>

          <div className="w-full h-16 md:h-24 bg-[#F4FAF2] rounded-t-[48px] md:rounded-t-[80px] absolute bottom-[-2px] left-0" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-20 pb-24">
          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-3 md:p-4 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#11281F]/40" />
                <input
                  type="text"
                  placeholder="Search by doctor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 rounded-[16px] bg-[#F4FAF2]/50 border border-[#4E9B63]/10 focus:border-[#4E9B63]/30 focus:bg-white focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all text-[#111111] font-medium placeholder:text-[#11281F]/30"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-4 rounded-[16px] bg-[#F4FAF2]/50 border border-[#4E9B63]/10 focus:border-[#4E9B63]/30 focus:bg-white focus:ring-4 focus:ring-[#4E9B63]/10 outline-none text-[#111111] font-medium transition-all appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="">Sort by</option>
                  <option value="rating">Highest Rated</option>
                  <option value="fee-low">Fee: Low to High</option>
                  <option value="fee-high">Fee: High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <div className="mb-8 px-2 text-[#11281F]/60 font-medium text-sm">
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
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
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
                className="group relative flex w-full max-w-[280px] h-[360px] flex-col rounded-[32px] rounded-tl-[55px] bg-white border border-[#DDF1D8] p-[3px] shadow-[0_30px_60px_-5px_rgba(17,40,31,0.12),0_10px_30px_-10px_rgba(78,155,99,0.1)] cursor-pointer overflow-hidden"
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 z-10 shadow-sm border border-gray-100">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-bold text-slate-900">{doctor.rating}</span>
                </div>

                {/* Bottom Mint Green Panel */}
                <div className="absolute bottom-[3px] left-[3px] right-[3px] top-[22%] rounded-[55px_29px_29px_29px] bg-[#DDF1D8] shadow-[0_10px_30px_0px_rgba(0,0,0,0.1)] px-5 pb-4 pt-[75px] flex flex-col justify-between">
                  <div className="flex flex-col">
                    <h5 className="mb-1 block font-sans text-lg font-bold leading-snug tracking-normal text-[#111111] line-clamp-1">
                      {doctor.name}
                    </h5>
                    <p className="block font-sans text-[13px] font-semibold leading-relaxed text-[#11281F] mb-1">
                      {doctor.specialty}
                    </p>
                    <p className="block font-sans text-[12px] font-medium leading-relaxed text-[#11281F] line-clamp-3">
                      {doctor.description || `${doctor.hospital} • ${doctor.location}`}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-[#11281F] tracking-wider">Fee</span>
                      <span className="text-lg font-bold text-[#111111] leading-tight">৳{doctor.fee}</span>
                    </div>
                    <AnimatedButton
                      text="Book"
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
