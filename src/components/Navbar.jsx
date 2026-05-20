'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Calendar, Home, LayoutDashboard } from 'lucide-react';
import Logo from '@/components/Logo';
import AnimatedButton from '@/components/AnimatedButton';
import UserAvatar from '@/components/UserAvatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/appointments', label: 'All Appointments', icon: Calendar },
  ];

  if (user) {
    navLinks.push({ href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard });
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F4]/40 backdrop-blur-md border-b border-[#E5E7EB]/40 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo className="text-green-800" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#11281F] hover:text-[#4E9B63] hover:bg-[#DDF1D8]/40 transition-all duration-200 flex items-center gap-2 group"
              >
                <link.icon className="w-4 h-4 text-[#11281F] group-hover:scale-105 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#DDF1D8]/30 border border-[#E5E7EB]">
                  <UserAvatar src={user.photoURL} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-[#11281F]">{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-650 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2 scale-90">
                <AnimatedButton
                  text="Login"
                  href="/login"
                  variant="light"
                />
                <AnimatedButton
                  text="Register"
                  href="/register"
                  variant="dark"
                />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#11281F] hover:bg-[#DDF1D8]/30"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFFFFF] border-t border-[#E5E7EB]"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#11281F] hover:text-[#4E9B63] hover:bg-[#DDF1D8]/30 transition-all group"
                >
                  <link.icon className="w-5 h-5 text-[#11281F]" />
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <UserAvatar src={user.photoURL} name={user.name} size="sm" />
                    <span className="font-medium text-[#11281F]">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-650 hover:bg-red-50 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <AnimatedButton
                    text="Login"
                    href="/login"
                    variant="light"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                  <AnimatedButton
                    text="Register"
                    href="/register"
                    variant="dark"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
