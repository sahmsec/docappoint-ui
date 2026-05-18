'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/appointments', label: 'All Appointments' },
  ];
  if (user) links.push({ href: '/dashboard', label: 'Dashboard' });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <Link key={link.href} href={link.href} className={'text-sm font-medium transition-colors ' + (pathname === link.href ? 'text-green-600' : 'text-slate-600 hover:text-green-600')}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <span className="text-sm font-semibold text-slate-900">{user.name}</span>
              <button onClick={logout} className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors">Logout</button>
            </>
          ) : (
            <Link href="/login" className="px-5 py-2 rounded-full bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors">Login</Link>
          )}
        </div>
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3">
          {links.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 py-2">{link.label}</Link>
          ))}
          {user ? (
            <button onClick={() => { logout(); setMobileOpen(false); }} className="block text-sm font-medium text-red-500 py-2 w-full text-left">Logout</button>
          ) : (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block text-center py-2 rounded-xl bg-green-600 text-white text-sm font-bold">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
