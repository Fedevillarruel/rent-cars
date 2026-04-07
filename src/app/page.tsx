'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Calendar, Shield, Star, ChevronRight,
  ArrowRight, Zap, Award, Clock, Users
} from 'lucide-react';
import { getCars } from '@/lib/storage';
import { Car } from '@/lib/types';
import { today, tomorrow } from '@/lib/utils';
import CarCard from '@/components/CarCard';

const STATS = [
  { value: '500+', label: 'Clientes satisfechos' },
  { value: '15', label: 'Vehículos premium' },
  { value: '4.9★', label: 'Calificación promedio' },
  { value: '24/7', label: 'Asistencia en ruta' },
];

const FEATURES = [
  { icon: MapPin, title: 'Entrega en el aeropuerto', desc: 'Recogida y devolución en MIA, FLL, Puerto de Miami o donde lo necesites. Sin filas, sin esperas.' },
  { icon: Shield, title: 'Seguro incluido', desc: 'Todos nuestros vehículos tienen póliza vigente. Elegí la cobertura que más te convenga.' },
  { icon: Zap, title: 'Reserva en minutos', desc: 'Proceso 100% online. Elegí el auto, las fechas, los adicionales y confirmá en menos de 5 minutos.' },
  { icon: Award, title: 'Flota premium', desc: 'Desde sedanes ejecutivos hasta superautos. Todos los vehículos con service al día y garantizados.' },
  { icon: Clock, title: 'Millas ilimitadas', desc: 'La mayoría de nuestra flota viene con millas ilimitadas. Recorré Miami sin restricciones.' },
  { icon: Users, title: 'Atención personalizada', desc: 'Nuestro equipo está disponible por WhatsApp, teléfono o email para acompañarte en cada paso.' },
];

const REVIEWS = [
  { name: 'Valentina Romero', origin: 'Buenos Aires, AR', rating: 5, text: 'Experiencia increíble. El Tesla Model 3 era perfecto y la atención superó todas mis expectativas. Definitivamente volvería.', car: 'Tesla Model 3' },
  { name: 'Carlos Méndez', origin: 'CDMX, MX', rating: 5, text: 'El BMW X5 era impecable. El proceso de reserva fue súper fácil y el auto nos estaba esperando en MIA cuando llegamos.', car: 'BMW X5' },
  { name: 'Lucía Fernández', origin: 'Bogotá, CO', rating: 5, text: 'Alquilamos el Mustang para 3 días y fue LA experiencia de Miami. Atención top, precio justo y sin sorpresas.', car: 'Ford Mustang GT' },
  { name: 'Marcelo Silva', origin: 'São Paulo, BR', rating: 5, text: 'El Range Rover Sport fue perfecto para el viaje familiar. Espacioso, cómodo y el servicio al cliente es excepcional.', car: 'Range Rover Sport' },
];

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(tomorrow());
  const [category, setCategory] = useState('');

  useEffect(() => {
    const cars = getCars();
    setFeaturedCars(cars.filter(c => c.available).slice(0, 6));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (startDate) params.set('start', startDate);
    if (endDate) params.set('end', endDate);
    if (category) params.set('categoria', category);
    window.location.href = `/catalogo?${params.toString()}`;
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80" alt="Hero car" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/40 to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/80" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.2)] mb-8">
            <Star className="w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]" />
            <span className="text-[var(--primary)] text-sm font-medium">La flota premium #1 de Miami</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tight">
            Maneja Miami<br /><span className="gold-shimmer">como mereces</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Flota de lujo, entrega en el aeropuerto, millas ilimitadas y seguro incluido. La experiencia premium de alquiler de autos en Miami.
          </p>
          {/* Search box */}
          <div className="max-w-3xl mx-auto glass rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">Fecha de retiro</label>
                <input type="date" value={startDate} min={today()} onChange={e => setStartDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">Fecha de devolución</label>
                <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">Categoría</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                  <option value="" className="bg-[#111]">Todos los autos</option>
                  <option value="luxury" className="bg-[#111]">Lujo</option>
                  <option value="sports" className="bg-[#111]">Deportivos</option>
                  <option value="suv" className="bg-[#111]">SUV</option>
                  <option value="van" className="bg-[#111]">Van / Minivan</option>
                  <option value="compact" className="bg-[#111]">Compacto</option>
                </select>
              </div>
            </div>
            <button onClick={handleSearch} className="btn-primary w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
              Buscar disponibilidad <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-white font-black text-2xl sm:text-3xl">{stat.value}</p>
                <p className="text-gray-500 text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-[#07070d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">¿Por qué elegirnos?</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">La diferencia MiamiDrive</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Más que un alquiler. Una experiencia diseñada para que tu viaje sea perfecto desde el primer momento.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover border border-[rgba(200,169,110,0.06)] group">
                <div className="w-12 h-12 rounded-xl bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.15)] flex items-center justify-center mb-5 group-hover:bg-[rgba(200,169,110,0.2)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">Nuestra flota</p>
              <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight">Vehículos destacados</h2>
            </div>
            <Link href="/catalogo" className="flex items-center gap-2 text-[var(--primary)] text-sm font-semibold hover:gap-3 transition-all duration-200">
              Ver todos los autos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 bg-[#07070d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">Simple y rápido</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">Reservá en 4 pasos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: '01', title: 'Elegí tu auto', desc: 'Explorá nuestra flota y encontrá el vehículo ideal para tu viaje.' },
              { n: '02', title: 'Configurá tu reserva', desc: 'Seleccioná fechas, punto de retiro, seguro y adicionales.' },
              { n: '03', title: 'Completá el pago', desc: 'Pago seguro online con tarjeta, PayPal o transferencia.' },
              { n: '04', title: '¡A manejar!', desc: 'El auto te espera en el lugar acordado, impecable y listo para salir.' },
            ].map((step, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover border border-[rgba(200,169,110,0.06)]">
                <div className="w-14 h-14 rounded-xl bg-[rgba(200,169,110,0.08)] border border-[rgba(200,169,110,0.15)] flex items-center justify-center mb-5">
                  <span className="text-[var(--primary)] font-black text-lg">{step.n}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/catalogo" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base">
              Comenzar reserva <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">Testimonios</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">Lo que dicen nuestros clientes</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-gray-400 text-sm ml-2">4.9 de 5 · Más de 500 reseñas</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover border border-[rgba(200,169,110,0.06)]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold">{review.name}</p>
                    <p className="text-gray-500 text-sm">{review.origin}</p>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{review.text}"</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(200,169,110,0.08)] border border-[rgba(200,169,110,0.15)] text-[10px] font-medium text-[var(--primary)]">{review.car}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0f] border-t border-[rgba(200,169,110,0.1)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-6">
            ¿Listo para vivir<br /><span className="gold-shimmer">el Miami de verdad?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">Reservá hoy y recibí tu vehículo impecable en el aeropuerto.<br />Confirmación inmediata, precios sin sorpresas.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/catalogo" className="btn-primary px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2">
              Ver todos los autos <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/13055550100" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl border border-white/15 text-gray-300 font-semibold text-base hover:border-white/30 hover:text-white transition-all duration-200 flex items-center gap-2">
              💬 Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
