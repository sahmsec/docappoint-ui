'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User, Calendar, Home, LayoutDashboard, Sun, Moon } from 'lucide-react';
import Logo from '@/components/Logo';
import AnimatedButton from '@/components/AnimatedButton';
import UserAvatar from '@/components/UserAvatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border/40 shadow-sm transition-colors duration-300 ${theme === 'dark' ? 'bg-navbar-bg' : 'bg-bg-main'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity flex items-center z-50">
            <Logo className="!text-primary" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:text-accent hover:bg-bg-soft/40 transition-all duration-200 flex items-center gap-2 group"
              >
                <link.icon className="w-4 h-4 text-primary group-hover:scale-105 transition-transform" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg text-primary hover:bg-bg-soft/40 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (theme === 'dark' ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5" />)}
            </button>
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard?tab=profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-soft/30 border border-border hover:bg-bg-soft/50 transition-colors cursor-pointer">
                  <UserAvatar src={user.photoURL} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-primary">{user.name}</span>
                </Link>
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
            className="md:hidden p-2 rounded-lg text-primary hover:bg-bg-soft/30"
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
            className="md:hidden bg-bg-card border-t border-border"
          >
            <div className="px-4 py-4 space-y-2">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <span className="text-sm font-medium text-primary">Theme</span>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg text-primary hover:bg-bg-soft/40 transition-colors bg-gray-100 dark:bg-gray-800"
                >
                  {mounted && (theme === 'dark' ? <Sun className="w-5 h-5 text-accent" /> : <Moon className="w-5 h-5" />)}
                </button>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary hover:text-accent hover:bg-bg-soft/30 transition-all group"
                >
                  <link.icon className="w-5 h-5 text-primary" />
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link 
                    href="/dashboard?tab=profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-bg-soft/30 rounded-lg transition-colors cursor-pointer"
                  >
                    <UserAvatar src={user.photoURL} name={user.name} size="sm" />
                    <span className="font-medium text-primary">{user.name}</span>
                  </Link>
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
