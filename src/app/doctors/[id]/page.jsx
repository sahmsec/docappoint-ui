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
  Award,
  MessageSquare
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

  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchDoctor();
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/api/reviews/${id}`);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('You must be logged in to review');
    try {
      setSubmittingReview(true);
      const { data } = await api.post('/api/reviews', {
        doctorId: id,
        rating: reviewRating,
        comment: reviewComment
      });
      if (data.success) {
        toast.success('Review added successfully!');
        setReviewComment('');
        setReviewRating(5);
        fetchReviews();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!loading && !doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-bg-main">
        <div className="text-center bg-bg-card p-8 sm:p-12 rounded-3xl shadow-xl border border-primary/5 max-w-md mx-4">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <X className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Doctor Not Found</h2>
          <p className="text-text-secondary mb-6">The doctor you are looking for does not exist or has been removed.</p>
          <button
            onClick={() => router.push('/appointments')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-bg-main font-bold hover:bg-primary-hover shadow-lg shadow-accent/25 transition-all"
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
            className="fixed inset-0 z-[9999] bg-bg-main flex items-center justify-center"
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="min-h-screen bg-bg-main">
        {/* Dynamic Full-Width Theme-Aware Hero Section */}
        <section className="w-full relative overflow-hidden pt-32 pb-36 md:pb-44 px-4 sm:px-6 lg:px-8 transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>
          {/* Ambient Glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Premium Theme-Aware Back Navigation Button */}
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.push('/appointments')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all mb-8 shadow-sm text-hero-badge-text"
              style={{ background: 'var(--hero-badge-bg)', borderColor: 'var(--hero-badge-border)' }}
            >
              <ArrowLeft className="w-4 h-4 transition-colors duration-300" style={{ color: 'var(--hero-badge-text)' }} />
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
                    className="relative w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr from-accent to-[#B5E3B0] shadow-[0_20px_40px_rgba(17,40,31,0.25)] flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full border-4 border-bg-card overflow-hidden relative bg-bg-card">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    {/* Glowing Rating Pill */}
                    <div className="absolute bottom-2 right-2 px-3 py-1 rounded-full bg-[#FFC107] text-primary text-xs font-black flex items-center gap-1 shadow-lg border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-primary stroke-none" />
                      {doctor.rating || '4.8'}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Staggered Profile Details */}
                <div className="flex-1 space-y-4 md:pt-4">
                  <div className="overflow-hidden pb-1">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.6, delay: loading ? 0.8 : 0, ease: "easeOut" }}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-colors duration-300 text-hero-badge-text"
                      style={{ background: 'var(--hero-badge-bg)', borderColor: 'var(--hero-badge-border)' }}
                    >
                      <Stethoscope className="w-3.5 h-3.5" />
                      {doctor.specialty}
                    </motion.div>
                  </div>

                  <div className="overflow-hidden pb-1 lg:pb-2">
                    <motion.h1
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.7, delay: loading ? 0.9 : 0.1, ease: "easeOut" }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-hero-title tracking-tight leading-tight transition-colors duration-300 inline-block"
                    >
                      {doctor.name}
                    </motion.h1>
                  </div>

                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.7, delay: loading ? 1.0 : 0.2, ease: "easeOut" }}
                      className="inline-flex flex-wrap items-center justify-center md:justify-start gap-4 text-hero-text text-[15px] font-medium transition-colors duration-300"
                    >
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" style={{ color: 'var(--hero-highlight)' }} />
                      {doctor.experience} Experience
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" style={{ color: 'var(--hero-highlight)' }} />
                      {doctor.hospital}
                    </span>
                  </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center md:justify-start gap-2 pt-1"
                  >
                    <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--hero-highlight)' }} />
                    <span className="text-sm font-bold tracking-wide uppercase" style={{ color: 'var(--hero-highlight)' }}>Active Clinical Practice</span>
                  </motion.div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Curved Boundary Transition & Content Area */}
        <section className="relative z-20 -mt-16 md:-mt-24 bg-bg-main rounded-t-[48px] md:rounded-t-[80px] pt-16 pb-24 px-4 sm:px-6 lg:px-8 shadow-[0_-20px_40px_rgba(17,40,31,0.06)] border-t border-[#B5E3B0]/10">
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
                  className="bg-bg-card p-8 rounded-3xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 space-y-4"
                >
                  <h2 className="text-xl font-extrabold text-primary flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-accent" />
                    About the Specialist
                  </h2>
                  <p className="text-text-secondary leading-relaxed text-[16px] font-medium">
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
                  <div className="bg-bg-card p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-accent/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-bg-main text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">Affiliation</div>
                      <div className="text-base font-extrabold text-primary mt-1">{doctor.hospital}</div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="bg-bg-card p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-accent/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-bg-main text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">Location</div>
                      <div className="text-base font-extrabold text-primary mt-1">{doctor.location}</div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-bg-card p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-accent/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-bg-main text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">Experience</div>
                      <div className="text-base font-extrabold text-primary mt-1">{doctor.experience}</div>
                    </div>
                  </div>

                  {/* Fees */}
                  <div className="bg-bg-card p-5 sm:p-6 rounded-2xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 flex items-start gap-4 hover:shadow-[0_15px_40px_rgba(17,40,31,0.05)] hover:border-accent/20 transition-all group duration-300">
                    <div className="p-3.5 rounded-2xl bg-bg-main text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <Stethoscope className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-text-secondary uppercase tracking-widest">Consult Fee</div>
                      <div className="text-base font-extrabold text-primary mt-1">৳{doctor.fee}</div>
                    </div>
                  </div>
                </motion.div>

                {/* Availability Slots */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-bg-card p-8 rounded-3xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 space-y-6"
                >
                  <h2 className="text-xl font-extrabold text-primary flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-accent" />
                    Weekly Availability Slots
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availability && doctor.availability.length > 0 ? (
                      doctor.availability.map((slot) => (
                        <span
                          key={slot}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-bg-main text-primary text-sm font-bold border border-accent/10 hover:border-accent/30 hover:bg-bg-soft transition-all cursor-default shadow-sm"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                          {slot}
                        </span>
                      ))
                    ) : (
                      <span className="text-text-secondary font-medium text-sm">Please inquire at booking for custom timing slots.</span>
                    )}
                  </div>
                </motion.div>

                {/* Patient Reviews Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-bg-card p-8 rounded-3xl shadow-[0_10px_35px_rgba(17,40,31,0.02)] border border-primary/5 space-y-6"
                >
                  <h2 className="text-xl font-extrabold text-primary flex items-center gap-3">
                    <span className="w-1.5 h-6 rounded-full bg-accent" />
                    Patient Reviews
                  </h2>

                  {/* Review Submission Form */}
                  {user && (
                    <form onSubmit={handleReviewSubmit} className="bg-bg-main p-6 rounded-2xl border border-accent/10 space-y-4">
                      <h3 className="text-sm font-bold text-primary">Write a Review</h3>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewRating(star)}
                            className={`focus:outline-none transition-colors ${star <= reviewRating ? 'text-yellow-500' : 'text-text-secondary'}`}
                          >
                            <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-yellow-500' : ''}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your experience with this doctor..."
                        className="w-full px-4 py-3 rounded-xl border border-accent/20 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm resize-none h-24 text-text-main"
                        required
                      />
                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-[#1B3A2D] disabled:opacity-50 transition-colors flex items-center gap-2"
                      >
                        {submittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-4 mt-6">
                    {reviews.length > 0 ? (
                      reviews.map((review) => (
                        <div key={review._id} className="p-5 rounded-2xl bg-bg-card border border-border shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-bold text-primary text-sm">{review.userName}</h4>
                              <div className="text-xs text-text-secondary mt-0.5">{new Date(review.createdAt).toLocaleDateString()}</div>
                            </div>
                            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-md">
                              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-bold text-yellow-700">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-text-secondary text-sm text-center py-4">No reviews yet. Be the first to share your experience!</p>
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
                  className="sticky top-28 bg-bg-card rounded-3xl shadow-[0_20px_50px_rgba(17,40,31,0.08)] border border-primary/5 p-8 relative overflow-hidden group"
                >
                  {/* Punch Holes for Ticket Aesthetic */}
                  <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-bg-main border-r border-primary/5 z-10" />
                  <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-bg-main border-l border-primary/5 z-10" />

                  <div className="text-center pb-6 border-b border-dashed border-primary/10 relative">
                    <div className="text-xs font-bold text-accent uppercase tracking-widest mb-1.5">Consultation Charge</div>
                    <div className="text-4xl font-black text-primary tracking-tight">৳{doctor.fee}</div>
                    <div className="text-xs font-semibold text-text-secondary mt-1.5">including complete clinical session</div>
                  </div>

                  <div className="py-6 space-y-4">
                    <button
                      onClick={handleBookClick}
                      className="w-full py-4 rounded-2xl bg-primary text-bg-main font-extrabold text-base tracking-wide hover:bg-primary-hover hover:shadow-[0_12px_24px_rgba(17,40,31,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 duration-300"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Appointment
                    </button>
                  </div>

                  <div className="pt-6 border-t border-primary/5 space-y-4">
                    <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                      <div className="p-1 rounded-full bg-bg-soft text-accent">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      Instant Confirmation
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                      <div className="p-1 rounded-full bg-bg-soft text-accent">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      Free Cancellation Flexibility
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-text-secondary">
                      <div className="p-1 rounded-full bg-bg-soft text-accent">
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
              className="bg-bg-card rounded-3xl shadow-[0_30px_70px_rgba(17,40,31,0.25)] border border-white/20 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-primary/5 flex items-center justify-between bg-gradient-to-r from-primary to-[#1A3B2E] text-white">
                <div>
                  <h2 className="text-xl font-extrabold">Confirm Appointment</h2>
                  <p className="text-bg-soft/70 text-xs mt-1 font-medium">Securing session with Dr. {doctor?.name}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500 hover:text-white text-text-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Specialist Read-only details */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-bg-main border border-accent/10">
                  <div>
                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Consulting Specialist</div>
                    <div className="text-sm font-extrabold text-primary mt-0.5">{doctor?.name}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Consultation Charge</div>
                    <div className="text-sm font-extrabold text-accent mt-0.5">৳{doctor?.fee}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">Patient Profile Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 rounded-2xl border border-border bg-bg-main text-text-secondary font-semibold cursor-not-allowed text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">
                    Patient Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={bookingData.patientName}
                    onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-semibold text-primary text-sm"
                    placeholder="Enter patient full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">Gender</label>
                    <select
                      value={bookingData.gender}
                      onChange={(e) => setBookingData({ ...bookingData, gender: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-semibold text-primary text-sm"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-semibold text-primary text-sm"
                      placeholder="e.g. 01712345678"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={bookingData.appointmentDate}
                      onChange={(e) => setBookingData({ ...bookingData, appointmentDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-semibold text-primary text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-text-secondary uppercase tracking-wider mb-2">
                      Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={bookingData.appointmentTime}
                      onChange={(e) => setBookingData({ ...bookingData, appointmentTime: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all font-semibold text-primary text-sm"
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
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent to-[#3D8550] text-white font-extrabold text-base tracking-wide hover:shadow-[0_12px_24px_rgba(78,155,99,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300"
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
