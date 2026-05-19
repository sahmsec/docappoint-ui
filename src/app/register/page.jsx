'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Calendar, ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '@/components/Logo';
import Loader from '@/components/Loader';
import AnimatedButton from '@/components/AnimatedButton';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { register, user } = useAuth();
  const router = useRouter();

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const validatePassword = (pass) => {
    if (pass.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(pass)) return 'Password must contain at least 1 uppercase letter';
    if (!/[a-z]/.test(pass)) return 'Password must contain at least 1 lowercase letter';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validatePassword(password);
    if (error) {
      setPasswordError(error);
      toast.error(error);
      return;
    }

    if (!name || !email) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      const data = await register(name, email, password, photoURL);
      if (data.success) {
        toast.success('Registration successful! Please login.');
        router.push('/login');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.error('Google OAuth requires setup. Please use email registration for now.');
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-[#11281F] relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[#4E9B63]/10 rounded-full filter blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10 mt-8"
        >
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
            <h1 className="text-2xl font-bold text-white text-center mb-2">Create Account</h1>
            <p className="text-[#DDF1D8]/80 text-center mb-6">Join DocAppoint today</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#DDF1D8] mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-[16px] bg-white/10 border border-white/10 focus:border-[#4E9B63]/50 focus:bg-white/15 focus:ring-4 focus:ring-[#4E9B63]/20 outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#DDF1D8] mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-[16px] bg-white/10 border border-white/10 focus:border-[#4E9B63]/50 focus:bg-white/15 focus:ring-4 focus:ring-[#4E9B63]/20 outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#DDF1D8] mb-1">Photo URL (Optional)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="url"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-[16px] bg-white/10 border border-white/10 focus:border-[#4E9B63]/50 focus:bg-white/15 focus:ring-4 focus:ring-[#4E9B63]/20 outline-none transition-all text-white placeholder:text-white/40"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#DDF1D8] mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(validatePassword(e.target.value));
                    }}
                    className={`w-full pl-12 pr-12 py-3 rounded-[16px] bg-white/10 outline-none transition-all text-white placeholder:text-white/40 ${
                      passwordError && password ? 'border border-red-400 focus:border-red-400 focus:bg-white/15 focus:ring-4 focus:ring-red-400/20' : 'border border-white/10 focus:border-[#4E9B63]/50 focus:bg-white/15 focus:ring-4 focus:ring-[#4E9B63]/20'
                    }`}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && password && (
                  <p className="mt-1 text-sm text-red-400">{passwordError}</p>
                )}
                <p className="mt-1 text-xs text-white/40">
                  Must contain 1 uppercase, 1 lowercase, and be at least 6 characters
                </p>
              </div>

              <div className="pt-2">
                <AnimatedButton
                  text={loading ? "Registering..." : "Register"}
                  type="submit"
                  disabled={loading || !!(passwordError && password)}
                  fullWidth
                  variant="light"
                />
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#11281F] text-[#DDF1D8]/60">Or sign up with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignup}
              className="w-full py-3 rounded-[16px] bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.85 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm text-[#DDF1D8]/80">
              Already have an account?{' '}
              <Link href="/login" className="text-[#B5E3B0] hover:text-white font-medium transition-colors">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
