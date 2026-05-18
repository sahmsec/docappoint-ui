'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../../lib/auth-context';
import api from '../../../lib/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Building2, Clock, Calendar, X, CheckCircle, ArrowLeft, Stethoscope } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bookingData, setBookingData] = useState({ patientName: '', gender: 'Male', phone: '', appointmentDate: '', appointmentTime: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { fetchDoctor(); }, [id]);

  const fetchDoctor = async () => {
    try {
      const { data } = await api.get('/api/doctors/' + id);
      if (data.success) setDoctor(data.data);
    } catch (error) {
      toast.error('Failed to load doctor details');
    } finally { setLoading(false); }
  };

  const handleBookClick = () => {
    if (!user) { router.push('/login?redirect=/doctors/' + id); return; }
    setShowModal(true);
    setBookingData(prev => ({ ...prev, patientName: user.name || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingData.patientName || !bookingData.phone || !bookingData.appointmentDate || !bookingData.appointmentTime) {
      toast.error('Please fill all required fields'); return;
    }
    try {
      setSubmitting(true);
      const { data } = await api.post('/api/appointments', { doctorId: doctor._id, doctorName: doctor.name, ...bookingData });
      if (data.success) {
        toast.success('Appointment booked successfully!');
        setShowModal(false);
        setBookingData({ patientName: '', gender: 'Male', phone: '', appointmentDate: '', appointmentTime: '' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally { setSubmitting(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20"><div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" /></div>;
  if (!doctor) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Doctor Not Found</h2>
        <p className="text-slate-500 mb-4">The doctor you are looking for does not exist.</p>
        <button onClick={() => router.push('/appointments')} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700">
          <ArrowLeft className="w-4 h-4" /> Back to Doctors
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FAF2] via-[#EAF7E8] to-[#F4FAF2] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => router.push('/appointments')} className="inline-flex items-center gap-2 text-slate-500 hover:text-green-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Doctors
        </motion.button>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="relative h-80">
                <Image src={doctor.image} alt={doctor.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-green-600 text-white text-sm font-medium">{doctor.specialty}</span>
                    <span className="px-3 py-1 rounded-full bg-yellow-500 text-white text-sm font-medium flex items-center gap-1"><Star className="w-3 h-3 fill-white" />{doctor.rating}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white">{doctor.name}</h1>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-2">About</h2>
                  <p className="text-slate-600 leading-relaxed">{doctor.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50"><Building2 className="w-5 h-5 text-green-600" /><div><div className="text-sm text-slate-500">Hospital</div><div className="font-medium text-slate-900">{doctor.hospital}</div></div></div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50"><MapPin className="w-5 h-5 text-green-600" /><div><div className="text-sm text-slate-500">Location</div><div className="font-medium text-slate-900">{doctor.location}</div></div></div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50"><Clock className="w-5 h-5 text-green-600" /><div><div className="text-sm text-slate-500">Experience</div><div className="font-medium text-slate-900">{doctor.experience}</div></div></div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50"><Stethoscope className="w-5 h-5 text-green-600" /><div><div className="text-sm text-slate-500">Fee</div><div className="font-medium text-slate-900">{doctor.fee} BDT</div></div></div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 mb-3">Availability</h2>
                  <div className="flex flex-wrap gap-3">
                    {doctor.availability && doctor.availability.map((slot) => (
                      <span key={slot} className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium border border-green-100">{slot}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-slate-900 mb-1">{doctor.fee} BDT</div>
                <div className="text-sm text-slate-500">per consultation</div>
              </div>
              <button onClick={handleBookClick} className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" /> Book Appointment
              </button>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> Instant confirmation</div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> Free cancellation</div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle className="w-4 h-4 text-green-500" /> Secure payment</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Book Appointment</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-slate-100"><X className="w-5 h-5 text-slate-500" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Doctor</label><input type="text" value={doctor.name} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Your Email</label><input type="email" value={user?.email || ''} disabled className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed" /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Patient Name <span className="text-red-500">*</span></label><input type="text" value={bookingData.patientName} onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none" placeholder="Patient name" required /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Gender</label><select value={bookingData.gender} onChange={(e) => setBookingData({...bookingData, gender: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none"><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone <span className="text-red-500">*</span></label><input type="tel" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none" placeholder="01XXXXXXXXX" required /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Date <span className="text-red-500">*</span></label><input type="date" value={bookingData.appointmentDate} onChange={(e) => setBookingData({...bookingData, appointmentDate: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none" required /></div>
                <div><label className="block text-sm font-medium text-slate-700 mb-1">Time <span className="text-red-500">*</span></label><select value={bookingData.appointmentTime} onChange={(e) => setBookingData({...bookingData, appointmentTime: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-green-500 outline-none" required><option value="">Select time</option><option value="09:00 AM">09:00 AM</option><option value="10:00 AM">10:00 AM</option><option value="11:00 AM">11:00 AM</option><option value="12:00 PM">12:00 PM</option><option value="02:00 PM">02:00 PM</option><option value="03:00 PM">03:00 PM</option><option value="04:00 PM">04:00 PM</option><option value="05:00 PM">05:00 PM</option></select></div>
                <button type="submit" disabled={submitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Booking...</> : <><Calendar className="w-5 h-5" />Confirm Booking</>}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
