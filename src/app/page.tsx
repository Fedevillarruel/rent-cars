'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin, Shield, Star,
  ArrowRight, Zap, Award, Clock, Users
} from 'lucide-react';
import { getCars } from '@/lib/storage';
import { Car } from '@/lib/types';
import { today, tomorrow } from '@/lib/utils';
import CarCard from '@/components/CarCard';
import { useLang } from '@/lib/i18n';

export default function HomePage() {
  const { t } = useLang();

  const STATS_KEYS = [
    { value: '500+', label: t.home_stat1 },
    { value: '15', label: t.home_stat2 },
    { value: '4.9★', label: t.home_stat3 },
    { value: '24/7', label: t.home_stat4 },
  ];
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

  const FEATURES = [
    { icon: MapPin, title: t.feat2_title, desc: t.feat2_desc },
    { icon: Shield, title: t.feat4_title, desc: t.feat4_desc },
    { icon: Zap, title: t.feat3_title, desc: t.feat3_desc },
    { icon: Award, title: t.feat1_title, desc: t.feat1_desc },
    { icon: Clock, title: t.feat6_title, desc: t.feat6_desc },
    { icon: Users, title: t.feat5_title, desc: t.feat5_desc },
  ];

  const HOW_STEPS = [
    { n: '01', title: t.how1_title, desc: t.how1_desc },
    { n: '02', title: t.how2_title, desc: t.how2_desc },
    { n: '03', title: t.how3_title, desc: t.how3_desc },
    { n: '04', title: t.how4_title, desc: t.how4_desc },
  ];

  const REVIEWS = [
    { name: 'Valentina Romero', origin: 'Buenos Aires, AR', rating: 5, text: t.rev1, car: 'Tesla Model 3' },
    { name: 'Carlos Méndez', origin: 'CDMX, MX', rating: 5, text: t.rev2, car: 'BMW X5' },
    { name: 'Lucía Fernández', origin: 'Bogotá, CO', rating: 5, text: t.rev3, car: 'Ford Mustang GT' },
    { name: 'Marcelo Silva', origin: 'São Paulo, BR', rating: 5, text: t.rev4, car: 'Range Rover Sport' },
  ];

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
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6 tracking-tight">
            {t.hero_title1}<br /><span className="gold-shimmer">{t.hero_title2}</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.hero_subtitle}
          </p>
          {/* Search box */}
          <div className="max-w-3xl mx-auto glass rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">{t.hero_pickup}</label>
                <input type="date" value={startDate} min={today()} onChange={e => setStartDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">{t.hero_return}</label>
                <input type="date" value={endDate} min={startDate} onChange={e => setEndDate(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2 text-left font-medium tracking-wide uppercase">{t.hero_category}</label>
                <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                  <option value="" className="bg-[#111]">{t.hero_all}</option>
                  <option value="luxury" className="bg-[#111]">{t.cat_luxury}</option>
                  <option value="sports" className="bg-[#111]">{t.cat_sports}</option>
                  <option value="suv" className="bg-[#111]">{t.cat_suv}</option>
                  <option value="van" className="bg-[#111]">{t.cat_van}</option>
                  <option value="compact" className="bg-[#111]">{t.cat_compact}</option>
                </select>
              </div>
            </div>
            <button onClick={handleSearch} className="btn-primary w-full py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2">
              {t.hero_search} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-14">
            {STATS_KEYS.map((stat, i) => (
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
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">{t.feat_label}</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">{t.feat_title}</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t.feat_sub}</p>
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
              <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">{t.fleet_label}</p>
              <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight">{t.fleet_title}</h2>
            </div>
            <Link href="/catalogo" className="flex items-center gap-2 text-[var(--primary)] text-sm font-semibold hover:gap-3 transition-all duration-200">
              {t.fleet_cta} <ArrowRight className="w-4 h-4" />
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
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">{t.how_label}</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">{t.how_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_STEPS.map((step, i) => (
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
              {t.hero_search} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-24 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-3">{t.rev_label}</p>
            <h2 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">{t.rev_title}</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
              <span className="text-gray-400 text-sm ml-2">4.9 / 5 · 500+</span>
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
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
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
            {t.cta_title}<br /><span className="gold-shimmer">{t.cta_sub.split('.')[0]}</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/catalogo" className="btn-primary px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2">
              {t.cta_btn} <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/13055550100" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl border border-white/15 text-gray-300 font-semibold text-base hover:border-white/30 hover:text-white transition-all duration-200 flex items-center gap-2">
              💬 {t.cta_contact}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
