'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../../lib/auth-context';
import api from '../../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  MapPin, 
  Building2, 
  Clock, 
  Calendar, 
  X, 
  CheckCircle,
  ArrowLeft,
  Stethoscope,
  Shield,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../../../components/Loader';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    patientName: '',
    gender: 'Male',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchDoctor();
  }, [id]);

  const fetchDoctor = async () => {
    try {
      const { data } = await api.get(`/api/doctors/${id}`);
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      toast.error('Failed to load doctor details');
    } finally {
      // Small timeout to give an incredibly smooth Pacman transition feel
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  const handleBookClick = () => {
    if (!user) {
      router.push(`/login?redirect=/doctors/${id}`);
      return;
    }
    setShowModal(true);
    // Pre-fill patient name if user is logged in
    setBookingData(prev => ({ ...prev, patientName: user.name || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.phone || !bookingData.appointmentDate || !bookingData.appointmentTime) {
      toast.error('Please fill all required fields');
      return;
    }

    // Simple validation for Bangladeshi phone numbers
    const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
    if (!phoneRegex.test(bookingData.phone)) {
      toast.error('Please enter a valid phone number (e.g. 01XXXXXXXXX)');
      return;
    }

    try {
      setSubmitting(true);
      const { data } = await api.post('/api/appointments', {
        doctorId: doctor._id,
        doctorName: doctor.name,
        ...bookingData,
      });

      if (data.success) {
        toast.success('Appointment booked successfully!');
        setShowModal(false);
        setBookingData({
          patientName: '',
          gender: 'Male',
          phone: '',
          appointmentDate: '',
          appointmentTime: '',
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  if (!loading && !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-[#F4FAF2]">
        <div className="text-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-[#11281F]/5 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#11281F] mb-2">Doctor Not Found</h2>
          <p className="text-slate-500 mb-6">The doctor you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => router.push('/appointments')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4E9B63] text-white font-bold hover:bg-[#3D8550] shadow-lg shadow-[#4E9B63]/25 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* High-Fidelity Page Entry Transition Loader */}
      <AnimatePresence>
        {loading && (
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
        {/* Dynamic Full-Width Dark Hero Section */}
        <section className="w-full relative overflow-hidden bg-gradient-to-br from-[#11281F] via-[#11281F] to-[#1A3B2E] pt-32 pb-36 md:pb-44 px-4 sm:px-6 lg:px-8">
          {/* Ambient Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Premium Frosted Back Navigation Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push('/appointments')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-[#DDF1D8] text-sm font-semibold hover:bg-white/[0.12] hover:border-white/[0.2] transition-all mb-8 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-[#B5E3B0]" />
              Back to All Doctors
            </motion.button>

            {doctor && (
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 text-center md:text-left">
                {/* Floating Glow Portrait Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative flex-shrink-0"
                >
                  <motion.div 
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr from-[#4E9B63] to-[#B5E3B0] shadow-[0_20px_40px_rgba(17,40,31,0.5)] flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full border-4 border-[#11281F] overflow-hidden relative bg-[#11281F]">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Glowing Rating Pill */}
                    <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-[#FFC107] text-[#11281F] text-xs font-black flex items-center gap-1 shadow-lg border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-[#11281F] stroke-none" />
                      {doctor.rating || '4.8'}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Staggered Profile Details */}
                <div className="flex-1 space-y-4 md:pt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08] text-[#B5E3B0] text-xs font-bold uppercase tracking-wider"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    {doctor.specialty}
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight"
                  >
                    {doctor.name}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#DDF1D8]/80 text-[15px] font-medium"
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#B5E3B0]" />
                      {doctor.experience} Experience
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E9B63]" />
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#B5E3B0]" />
                      {doctor.hospital}
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center md:justify-start gap-2 pt-1"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#B5E3B0] animate-pulse" />
                    <span className="text-[#B5E3B0] text-sm font-bold tracking-wide uppercase">Active Clinical Practice</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Curved Boundary Transition & Content Area */}
        <section className="relative z-20 -mt-16 md:-mt-24 bg-[#F4FAF2] rounded-t-[48px] md:rounded-t-[80px] pt-16 pb-24 px-4 sm:px-6 lg:px-8 shadow-[0_-20px_40px_rgba(17,40,31,0.06)] border-t border-[#B5E3B0]/10">
          {doctor && (
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 md:gap-12">
              {/* Left Side: Comprehensive Details Cards */}
              <div className="lg:col-span-2 space-y-8">
                {/* About Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-white p-8 rounded-3xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 space-y-4"
                >
                  <h2 className="text-xl font-extrabold text-[#11281F] flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-[#4E9B63]" />
                    About the Specialist
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-[16px] font-medium">
                    {doctor.description || `Dr. ${doctor.name} is a highly accomplished specialist, dedicated to providing complete, empathetic medical solutions using state-of-the-art procedures.`}
                  </p>
                </motion.div>

                {/* Quick Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  {/* Hospital */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-[#4E9B63]/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-[#F4FAF2] text-[#4E9B63] group-hover:bg-[#4E9B63] group-hover:text-white transition-all duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Affiliation</div>
                      <div className="text-base font-extrabold text-[#11281F] mt-1">{doctor.hospital}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-[#4E9B63]/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-[#F4FAF2] text-[#4E9B63] group-hover:bg-[#4E9B63] group-hover:text-white transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</div>
                      <div className="text-base font-extrabold text-[#11281F] mt-1">{doctor.location}</div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-[#4E9B63]/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-[#F4FAF2] text-[#4E9B63] group-hover:bg-[#4E9B63] group-hover:text-white transition-all duration-300">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</div>
                      <div className="text-base font-extrabold text-[#11281F] mt-1">{doctor.experience}</div>
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-[#4E9B63]/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-[#F4FAF2] text-[#4E9B63] group-hover:bg-[#4E9B63] group-hover:text-white transition-all duration-300">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Consult Fee</div>
                      <div className="text-base font-extrabold text-[#11281F] mt-1">৳{doctor.fee}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Availability Slots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-[#11281F]/5 space-y-6"
                >
                  <h2 className="text-xl font-extrabold text-[#11281F] flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-[#4E9B63]" />
                    Weekly Availability Slots
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availability && doctor.availability.length > 0 ? (
                      doctor.availability.map((slot) => (
                        <span
                          key={slot}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F4FAF2] text-[#11281F] text-sm font-bold border border-[#4E9B63]/10 hover:border-[#4E9B63]/30 hover:bg-[#EAF7E8] transition-all cursor-default shadow-sm"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#4E9B63] animate-pulse" />
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-slate-400 font-medium text-sm">Please inquire at booking for custom timing slots.</span>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Right Side: Sticky Ticket Booking Pass */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="sticky top-28 bg-white rounded-3xl shadow-[0_20px_50px_rgba(17,40,31,0.08)] border border-[#11281F]/5 p-8 relative overflow-hidden group"
                >
                  {/* Punch Holes for Ticket Aesthetic */}
                  <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F4FAF2] border-r border-[#11281F]/5 z-10" />
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#F4FAF2] border-l border-[#11281F]/5 z-10" />

                  <div className="text-center pb-6 border-b border-dashed border-[#11281F]/10 relative">
                    <div className="text-xs font-bold text-[#4E9B63] uppercase tracking-widest mb-1.5">Consultation Charge</div>
                    <div className="text-4xl font-black text-[#11281F] tracking-tight">৳{doctor.fee}</div>
                    <div className="text-xs font-semibold text-slate-400 mt-1.5">including complete clinical session</div>
                  </div>

                  <div className="py-6 space-y-4">
                    <button
                      onClick={handleBookClick}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#4E9B63] to-[#3D8550] text-white font-extrabold text-base tracking-wide hover:shadow-[0_12px_24px_rgba(78,155,99,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Appointment
                    </button>
                  </div>

                  <div className="pt-6 border-t border-[#11281F]/5 space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <div className="p-1 rounded-full bg-[#EAF7E8] text-[#4E9B63]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      Instant Confirmation
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <div className="p-1 rounded-full bg-[#EAF7E8] text-[#4E9B63]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      Free Cancellation Flexibility
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                      <div className="p-1 rounded-full bg-[#EAF7E8] text-[#4E9B63]">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      Secure Patient Data Guarantee
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-[0_30px_70px_rgba(17,40,31,0.25)] border border-white/20 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-[#11281F]/5 flex items-center justify-between bg-gradient-to-r from-[#11281F] to-[#1A3B2E] text-white">
                <div>
                  <h2 className="text-xl font-extrabold">Confirm Appointment</h2>
                  <p className="text-[#DDF1D8]/70 text-xs mt-1 font-medium">Securing session with Dr. {doctor?.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Specialist Read-only details */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F4FAF2] border border-[#4E9B63]/10">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consulting Specialist</div>
                    <div className="text-sm font-extrabold text-[#11281F] mt-0.5">{doctor?.name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consultation Charge</div>
                    <div className="text-sm font-extrabold text-[#4E9B63] mt-0.5">৳{doctor?.fee}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Patient Profile Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl border border-slate-100 bg-slate-50 text-slate-400 font-semibold cursor-not-allowed text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-[#4E9B63] focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all font-semibold text-[#11281F] text-sm"
                    placeholder="Enter patient full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                    <select
                      value={bookingData.gender}
                      onChange={(e) => setBookingData({ ...bookingData, gender: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-[#4E9B63] focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all font-semibold text-[#11281F] text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-[#4E9B63] focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all font-semibold text-[#11281F] text-sm"
                      placeholder="e.g. 01712345678"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={bookingData.appointmentDate}
                      onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-[#4E9B63] focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all font-semibold text-[#11281F] text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bookingData.appointmentTime}
                      onChange={(e) => setBookingData({ ...bookingData, appointmentTime: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 focus:border-[#4E9B63] focus:ring-4 focus:ring-[#4E9B63]/10 outline-none transition-all font-semibold text-[#11281F] text-sm"
                      required
                    >
                      <option value="">Select time slot</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#4E9B63] to-[#3D8550] text-white font-extrabold text-base tracking-wide hover:shadow-[0_12px_24px_rgba(78,155,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Securing Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Confirm Doctor Session
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
