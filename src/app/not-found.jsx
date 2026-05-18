'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, Calendar } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-mint-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mb-6">
            <Search className="w-16 h-16 text-primary-600" />
          </div>
        </motion.div>

        <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Page Not Found</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/30"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/appointments"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-medium hover:border-primary-500 hover:text-primary-600 transition-all"
          >
            <Calendar className="w-5 h-5" />
            Browse Doctors
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
