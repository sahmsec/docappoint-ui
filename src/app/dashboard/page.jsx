'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '../../lib/auth-context';
import api from '../../lib/axios';
import { motion } from 'framer-motion';
import { Calendar, User, Edit2, Trash2, X, Save, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Dashboard3DCard from '@/components/Dashboard3DCard';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { if (!authLoading && !user) router.push('/login?redirect=/dashboard'); }, [user, authLoading, router]);
  useEffect(() => { if (user) fetchBookings(); }, [user]);

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const { data } = await api.get('/api/appointments');
      if (data.success) setBookings(data.data);
    } catch (error) { toast.error('Failed to load bookings'); }
    finally { setBookingsLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      const { data } = await api.delete('/api/appointments/' + id);
      if (data.success) { setBookings(bookings.filter(b => b._id !== id)); toast.success('Deleted!'); }
    } catch (error) { toast.error('Failed to delete'); }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setEditForm({ patientName: booking.patientName, gender: booking.gender, phone: booking.phone, appointmentDate: booking.appointmentDate, appointmentTime: booking.appointmentTime });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const { data } = await api.put('/api/appointments/' + selectedBooking._id, editForm);
      if (data.success) { setBookings(bookings.map(b => b._id === selectedBooking._id ? data.data : b)); toast.success('Updated!'); setShowEditModal(false); }
    } catch (error) { toast.error('Failed to update'); }
    finally { setSubmitting(false); }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center pt-20"><div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F4FAF2] to-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
          <p className="text-slate-500 mt-1">Manage your appointments and profile</p>
        </div>
        <div className="flex gap-3 mb-8">
          <button onClick={() => setActiveTab('bookings')} className={'px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ' + (activeTab === 'bookings' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50')}>
            <Calendar className="w-4 h-4" /> My Bookings
          </button>
          <button onClick={() => setActiveTab('profile')} className={'px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ' + (activeTab === 'profile' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50')}>
            <User className="w-4 h-4" /> My Profile
          </button>
        </div>
        {activeTab === 'bookings' && (
          <div>
            {bookingsLoading ? (
              <div className="flex justify-center py-20"><div className="w-12 h-12 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" /></div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <Calendar className="w-16 h-16 text-green-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Appointments Yet</h3>
                <p className="text-slate-500 mb-6">Book your first appointment with a specialist.</p>
                <button onClick={() => router.push('/appointments')} className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-colors">Browse Doctors</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {bookings.map((booking, index) => (
                  <motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="flex justify-center w-full">
                    <Dashboard3DCard booking={booking} onEdit={handleEdit} onDelete={handleDelete} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              {user.photoURL ? (
                <Image src={user.photoURL} alt={user.name} width={100} height={100} className="w-24 h-24 rounded-full object-cover border-4 border-green-100" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-green-500 to-green-300 flex items-center justify-center"><User className="w-10 h-10 text-white" /></div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500">{user.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50"><label className="text-xs text-slate-400 block mb-1">Full Name</label><p className="font-semibold text-slate-900">{user.name}</p></div>
              <div className="p-4 rounded-xl bg-slate-50"><label className="text-xs text-slate-400 block mb-1">Email</label><p className="font-semibold text-slate-900">{user.email}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
