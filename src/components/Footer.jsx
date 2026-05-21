'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-footer-bg text-footer-text border-t border-footer-border/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Redesigned to a cleaner 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-5 lg:pr-12"
          >
            <Link href="/" className="flex items-center gap-2 mb-6">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-accent">
                <path d="M14 2h-4a1 1 0 00-1 1v7H2a1 1 0 00-1 1v4a1 1 0 001 1h7v7a1 1 0 001 1h4a1 1 0 001-1v-7h7a1 1 0 001-1v-4a1 1 0 00-1-1h-7V3a1 1 0 00-1-1z" />
              </svg>
              <span className="text-2xl font-extrabold tracking-tight text-footer-title">
                DocAppoint
              </span>
            </Link>
            <p className="text-footer-text-secondary text-[15px] leading-relaxed">
              Your trusted healthcare companion. Book appointments with top-rated doctors easily and securely.
            </p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4"
          >
            <h3 className="text-lg font-bold mb-6 text-footer-title">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-footer-text-secondary text-[15px]">
                <div className="w-8 h-8 rounded-full bg-footer-icon-bg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                +880 1234-567890
              </li>
              <li className="flex items-center gap-3 text-footer-text-secondary text-[15px]">
                <div className="w-8 h-8 rounded-full bg-footer-icon-bg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                support@docappoint.com
              </li>
              <li className="flex items-center gap-3 text-footer-text-secondary text-[15px]">
                <div className="w-8 h-8 rounded-full bg-footer-icon-bg flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                Dhaka, Bangladesh
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-3"
          >
            <h3 className="text-lg font-bold mb-6 text-footer-title">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-footer-icon-bg hover:bg-footer-icon-hover-bg flex items-center justify-center transition-colors duration-300 text-footer-text"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-footer-border mt-12 pt-8">
          <p className="text-footer-text-secondary/70 text-sm text-left">
            © 2026 DocAppoint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
