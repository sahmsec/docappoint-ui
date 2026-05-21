'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '@/components/Logo';
import Loader from '@/components/Loader';
import AnimatedButton from '@/components/AnimatedButton';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user, googleLogin } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user) {
      router.push(redirect);
    }
  }, [user, router, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const data = await login(email, password);
      if (data.success) {
        toast.success('Login successful!');
        router.push(redirect);
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(redirect);
    } catch (error) {
      toast.error(error.message || 'Google login failed. Please try again.');
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
      <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden transition-all duration-300" style={{ background: 'var(--hero-bg)' }}>
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[50%] bg-[#B5E3B0]/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-accent/10 rounded-full filter blur-[120px] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="flex justify-center mb-8">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Card */}
          <div className="bg-gradient-to-br from-bg-card/90 to-bg-main/90 backdrop-blur-xl border border-white/20 dark:border-primary/10 rounded-[32px] p-8 shadow-[0_20px_60px_-15px_rgba(78,155,99,0.15)] relative overflow-hidden">
            {/* Subtle inner gradient decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <h1 className="text-2xl font-extrabold text-hero-title text-center mb-2">Welcome Back</h1>
            <p className="text-text-secondary font-medium text-center mb-8">Login to your account</p>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-bg-main/60 border border-primary/10 focus:border-accent focus:bg-bg-card focus:ring-4 focus:ring-accent/15 outline-none transition-all text-text-main font-medium placeholder:text-text-secondary/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-main mb-1.5 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-bg-main/60 border border-primary/10 focus:border-accent focus:bg-bg-card focus:ring-4 focus:ring-accent/15 outline-none transition-all text-text-main font-medium placeholder:text-text-secondary/50"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-text-secondary cursor-pointer hover:text-primary transition-colors">
                  <input type="checkbox" className="rounded border-primary/20 bg-bg-main text-accent focus:ring-accent/50" />
                  Remember me
                </label>
                <button type="button" className="text-accent hover:text-accent-hover font-medium transition-colors">
                  Forgot Password?
                </button>
              </div>

              <div className="pt-2">
                <AnimatedButton
                  text={loading ? "Logging in..." : "Login"}
                  type="submit"
                  disabled={loading}
                  fullWidth
                  variant="light"
                />
              </div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-primary/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-bg-card text-text-secondary">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 rounded-[16px] bg-bg-main/50 border border-primary/10 text-text-main font-medium hover:bg-bg-main transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.85 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.86-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center mt-6 text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link href="/register" className="text-accent hover:text-accent-hover font-medium transition-colors">
                Register
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
