import Link from 'next/link';
import { Car, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-[rgba(200,169,110,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-9 h-9 bg-[var(--primary)] rounded-lg flex items-center justify-center shadow-lg shadow-[rgba(200,169,110,0.2)]">
                <Car className="w-5 h-5 text-[#07070d]" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-white font-bold text-xl leading-none tracking-tight">
                  Miami<span className="text-[var(--primary)]">Drive</span>
                </span>
                <p className="text-[10px] text-gray-600 font-medium tracking-widest uppercase leading-none mt-0.5">
                  Car Rentals
                </p>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              La experiencia premium de alquiler de autos en Miami. Flota de lujo, servicio 5 estrellas y precios transparentes.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'IG', href: '#' },
                { label: 'FB', href: '#' },
                { label: 'TW', href: '#' },
              ].map(({ label, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-gray-500 text-xs font-bold hover:text-[var(--primary)] hover:border-[rgba(200,169,110,0.3)] transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Explorar</h3>
            <ul className="space-y-3">
              {[
                { href: '/catalogo', label: 'Catálogo de Autos' },
                { href: '/catalogo?categoria=luxury', label: 'Vehículos de Lujo' },
                { href: '/catalogo?categoria=sports', label: 'Deportivos' },
                { href: '/catalogo?categoria=suv', label: 'SUVs' },
                { href: '/como-funciona', label: 'Cómo Funciona' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Compañía</h3>
            <ul className="space-y-3">
              {[
                { href: '/nosotros', label: 'Sobre Nosotros' },
                { href: '/contacto', label: 'Contacto' },
                { href: '/faq', label: 'Preguntas Frecuentes' },
                { href: '/terminos', label: 'Términos y Condiciones' },
                { href: '/privacidad', label: 'Política de Privacidad' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-5 tracking-wide">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <span className="text-gray-500 text-sm leading-relaxed">
                  2270 NW 36th St,<br />Miami, FL 33142
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                <a href="tel:+13055550100" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                  +1 (305) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
                <a href="mailto:info@miamidrive.com" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                  info@miamidrive.com
                </a>
              </li>
            </ul>
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/13055550100"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-900/20 border border-green-800/30 text-green-400 text-sm font-medium hover:bg-green-900/30 transition-all duration-200 w-fit"
            >
              <span className="text-base">💬</span>
              WhatsApp 24/7
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">
            © 2026 MiamiDrive Car Rentals. Todos los derechos reservados.
          </p>
          <a
            href="https://fedini.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-[var(--primary)] transition-colors tracking-widest uppercase font-medium"
          >
            Desarrollado por
            <span className="text-[var(--primary)] font-bold tracking-wide normal-case">◆ Fedini</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
