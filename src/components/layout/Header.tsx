'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Car, ExternalLink, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isAdminLoggedIn } from '@/lib/storage';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/como-funciona', label: 'Cómo Funciona' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setAdminLoggedIn(isAdminLoggedIn());
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setAdminLoggedIn(isAdminLoggedIn());
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#07070d]/95 backdrop-blur-xl border-b border-[rgba(200,169,110,0.12)] py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-lg shadow-[rgba(200,169,110,0.3)] group-hover:shadow-[rgba(200,169,110,0.5)] transition-shadow duration-300">
              <Car className="w-5 h-5 text-[#07070d]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg leading-none tracking-tight">
                Miami<span className="text-[var(--primary)]">Drive</span>
              </span>
              <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase leading-none mt-0.5">
                Car Rentals
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-[var(--primary)] bg-[rgba(200,169,110,0.08)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Demo badge */}
            <a
              href="https://fedini.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(200,169,110,0.2)] bg-[rgba(200,169,110,0.05)] hover:border-[rgba(200,169,110,0.4)] hover:bg-[rgba(200,169,110,0.1)] transition-all duration-200 group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[11px] font-medium text-gray-400 group-hover:text-[var(--primary)] transition-colors">
                Demo by Fedini
              </span>
              <ExternalLink className="w-3 h-3 text-gray-500 group-hover:text-[var(--primary)] transition-colors" />
            </a>

            {adminLoggedIn ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.2)] text-[var(--primary)] text-sm font-medium hover:bg-[rgba(200,169,110,0.2)] transition-all duration-200"
              >
                Panel Admin
              </Link>
            ) : (
              <Link
                href="/admin/login"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Admin
              </Link>
            )}

            <Link
              href="/catalogo"
              className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
            >
              Reservar Ahora
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#07070d]/98 backdrop-blur-xl border-t border-[rgba(200,169,110,0.1)] mt-3">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-[var(--primary)] bg-[rgba(200,169,110,0.08)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/5 mt-2 pt-4 flex flex-col gap-2">
              <a
                href="https://fedini.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Demo by Fedini
                <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                href="/catalogo"
                onClick={() => setIsOpen(false)}
                className="btn-primary px-5 py-3 rounded-xl text-sm font-semibold text-center"
              >
                Reservar Ahora
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
