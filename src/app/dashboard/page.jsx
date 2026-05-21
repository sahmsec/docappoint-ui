'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../lib/auth-context';
import api from '../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Edit2, 
  Trash2, 
  X, 
  Save,
  Clock,
  MapPin,
  Building2,
  Stethoscope,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '@/components/Loader';
import Dashboard3DCard from '@/components/Dashboard3DCard';
import UserAvatar from '@/components/UserAvatar';

export default function DashboardPage() {
  const { user, jwtToken, loading: authLoading, updateProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [profileForm, setProfileForm] = useState({ name: '', photoURL: '' });
  const [submitting, setSubmitting] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    
    // Check URL for active tab
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/dashboard');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const { data } = await api.get('/api/appointments');
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;

    try {
      const { data } = await api.delete(`/api/appointments/${id}`, {
        headers: { Authorization: `Bearer ${jwtToken}` }
      });
      if (data.success) {
        setBookings(bookings.filter(b => b._id !== id));
        toast.success('Appointment deleted successfully!');
      }
    } catch (error) {
      toast.error('Failed to delete appointment');
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditForm({
      patientName: booking.patientName,
      gender: booking.gender,
      phone: booking.phone,
      appointmentDate: booking.appointmentDate,
      appointmentTime: booking.appointmentTime,
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { data } = await api.put(`/api/appointments/${selectedBooking._id}`, editForm);
      if (data.success) {
        setBookings(bookings.map(b => b._id === selectedBooking._id ? data.data : b));
        toast.success('Appointment updated successfully!');
        setShowEditModal(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update appointment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = await updateProfile(profileForm);
      if (data.success) {
        toast.success('Profile updated successfully!');
        setShowProfileModal(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const openProfileModal = () => {
    setProfileForm({
      name: user?.name || '',
      photoURL: user?.photoURL || '',
    });
    setShowProfileModal(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader />
      </div>
    );
  }

  if (!user) return null;

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

      <div className="min-h-screen bg-bg-main relative overflow-hidden">
        {/* Dark Hero Header */}
        <div className="pt-32 pb-20 relative overflow-hidden transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>
          {/* Ambient green glows */}
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[60%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[60%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header Title */}
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="overflow-hidden mb-4 pb-1">
                <motion.span
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: isInitialLoad ? 0.8 : 0, ease: "easeOut" }}
                  className="inline-block px-4 py-1.5 rounded-full bg-bg-card/40 border border-primary/10 text-accent text-sm font-medium tracking-wide uppercase"
                >
                  Patient Portal
                </motion.span>
              </div>
              <div className="overflow-hidden pb-1 lg:pb-2">
                <motion.h1
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: isInitialLoad ? 0.9 : 0.1, ease: "easeOut" }}
                  className="text-4xl font-bold text-hero-title inline-block"
                >
                  Welcome Back, {user.name}
                </motion.h1>
              </div>
              <div className="overflow-hidden mt-1">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, delay: isInitialLoad ? 1.0 : 0.2, ease: "easeOut" }}
                  className="text-hero-text inline-block"
                >
                  Manage your appointments, health bookings, and profile
                </motion.p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  activeTab === 'bookings'
                    ? 'bg-primary text-bg-main border-primary shadow-lg shadow-primary/25'
                    : 'bg-bg-card/40 backdrop-blur-md text-hero-text border-primary/10 hover:bg-bg-card/60'
                }`}
              >
                <Calendar className="w-4 h-4" />
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  activeTab === 'profile'
                    ? 'bg-primary text-bg-main border-primary shadow-lg shadow-primary/25'
                    : 'bg-bg-card/40 backdrop-blur-md text-hero-text border-primary/10 hover:bg-bg-card/60'
                }`}
              >
                <User className="w-4 h-4" />
                My Profile
              </button>
            </div>
          </div>
        </div>

        {/* Curved Transition */}
        <div className="-mt-1 h-12 w-full relative z-20 transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>
          <div className="h-full w-full bg-bg-main rounded-t-[48px] md:rounded-t-[80px]" />
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">

        {/* My Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {bookingsLoading ? (
              <div className="flex justify-center py-20">
                <Loader />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-bg-card border border-border shadow-[0_8px_30px_rgb(78,155,99,0.05)] rounded-[32px] p-8 max-w-2xl mx-auto">
                <Calendar className="w-16 h-16 text-accent/40 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">No Appointments Yet</h3>
                <p className="text-text-secondary mb-6 max-w-md mx-auto">Book your first appointment with a medical specialist today and start your wellness journey.</p>
                <button
                  onClick={() => router.push('/appointments')}
                  className="px-8 py-3.5 rounded-2xl bg-primary text-bg-main font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Browse Doctors
                </button>
              </div>
            ) : (
              <div className="bg-bg-card/80 border border-border/50 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(78,155,99,0.04)] backdrop-blur-md">
                <div className="flex flex-col gap-6">
                  {bookings.map((booking, index) => (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full"
                    >
                      <Dashboard3DCard
                        booking={booking}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* My Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-bg-card border border-border rounded-[32px] p-8 shadow-[0_20px_50px_rgba(78,155,99,0.06)]">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                  <UserAvatar
                    src={user.photoURL}
                    name={user.name}
                    size="lg"
                    className="border-4 border-[#B5E3B0]/40 shadow-md"
                    fallbackClassName="bg-gradient-to-tr from-accent to-[#B5E3B0] border-4 border-[#B5E3B0]/40 shadow-md"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-primary">{user.name}</h2>
                    <p className="text-text-secondary">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-bg-main border border-border">
                    <label className="text-xs text-text-secondary font-medium block mb-1">Full Name</label>
                    <p className="font-semibold text-primary">{user.name}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-bg-main border border-border">
                    <label className="text-xs text-text-secondary font-medium block mb-1">Email Address</label>
                    <p className="font-semibold text-primary">{user.email}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-bg-main border border-border">
                    <label className="text-xs text-text-secondary font-medium block mb-1">Profile Photo</label>
                    <p className="font-semibold text-primary truncate">{user.photoURL || 'Not set'}</p>
                  </div>
                </div>

                <button
                  onClick={openProfileModal}
                  className="mt-8 w-full py-4 rounded-2xl bg-primary text-bg-main font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Edit2 className="w-5 h-5" />
                  Update Profile
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Booking Modal */}
      <AnimatePresence>
        {showEditModal && selectedBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-card border border-border rounded-[32px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">Update Appointment</h2>
                <button onClick={() => setShowEditModal(false)} className="p-2 rounded-xl hover:bg-bg-soft/30 text-text-secondary hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Doctor</label>
                  <input type="text" value={selectedBooking.doctorName} disabled className="w-full px-4 py-3 rounded-2xl border border-border bg-bg-main text-text-secondary cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Your Email</label>
                  <input type="email" value={user.email} disabled className="w-full px-4 py-3 rounded-2xl border border-border bg-bg-main text-text-secondary cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Patient Name</label>
                  <input
                    type="text"
                    value={editForm.patientName}
                    onChange={(e) => setEditForm({ ...editForm, patientName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-bg-card"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={editForm.appointmentDate}
                    onChange={(e) => setEditForm({ ...editForm, appointmentDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Appointment Time</label>
                  <select
                    value={editForm.appointmentTime}
                    onChange={(e) => setEditForm({ ...editForm, appointmentTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-bg-card"
                    required
                  >
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

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-primary text-bg-main font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Changes
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Update Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowProfileModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-bg-card border border-border rounded-[32px] shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">Update Profile</h2>
                <button onClick={() => setShowProfileModal(false)} className="p-2 rounded-xl hover:bg-bg-soft/30 text-text-secondary hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleProfileUpdate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-bg-main text-text-main"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Photo URL</label>
                  <input
                    type="url"
                    value={profileForm.photoURL}
                    onChange={(e) => setProfileForm({ ...profileForm, photoURL: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all bg-bg-main text-text-main"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-2xl bg-primary text-bg-main font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Update Profile
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
