import Link from 'next/link';
import Logo from './Logo';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#11281F] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <Logo />
            <p className="text-[#DDF1D8]/70 mt-4 text-sm leading-relaxed">
              Your trusted platform for booking doctor appointments seamlessly and securely.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#B5E3B0] mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-[#DDF1D8]/70 hover:text-white transition-colors">Home</Link>
              <Link href="/appointments" className="block text-sm text-[#DDF1D8]/70 hover:text-white transition-colors">All Doctors</Link>
              <Link href="/dashboard" className="block text-sm text-[#DDF1D8]/70 hover:text-white transition-colors">Dashboard</Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#B5E3B0] mb-4">Contact</h3>
            <p className="text-sm text-[#DDF1D8]/70">support@docappoint.com</p>
            <p className="text-sm text-[#DDF1D8]/70 mt-1">+880 1700-000000</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-[#DDF1D8]/50 flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> DocAppoint &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
