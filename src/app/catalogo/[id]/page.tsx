'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star, Users, Briefcase, Settings, Fuel, DoorOpen,
  ChevronLeft, ChevronRight, Check, ArrowLeft, Share2, Heart, Calendar
} from 'lucide-react';
import { Car } from '@/lib/types';
import { getCars } from '@/lib/storage';
import { formatCurrency, getCategoryLabel, getCategoryColor, cn } from '@/lib/utils';
import BookingFlow from '@/components/BookingFlow';
import { useLang } from '@/lib/i18n';

export default function CarDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { t, lang } = useLang();
  const [car, setCar] = useState<Car | null>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  const FUEL_LABELS: Record<string, string> = {
    gasoline: t.detail_fuel_gasoline,
    diesel: t.detail_fuel_diesel,
    hybrid: t.detail_fuel_hybrid,
    electric: t.detail_fuel_electric,
  };

  useEffect(() => {
    const cars = getCars();
    const found = cars.find(c => c.id === params.id);
    if (found) setCar(found);
    else router.push('/catalogo');
  }, [params.id, router]);

  if (!car) {
    return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="text-gray-400">{t.detail_loading}</div></div>;
  }

  if (showBooking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => setShowBooking(false)} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> {t.detail_back_to_detail}
          </button>
          <div className="glass rounded-2xl p-6 sm:p-8 border border-[rgba(200,169,110,0.1)]">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/8">
              <div className="relative w-20 h-14 rounded-xl overflow-hidden">
                <Image src={car.images[0]} alt={car.model} fill className="object-cover" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium">{car.brand}</p>
                <h2 className="text-white font-bold text-xl">{car.model} {car.year}</h2>
                <p className="text-[var(--primary)] font-semibold">{formatCurrency(car.pricePerDay)}{t.detail_per_day}</p>
              </div>
            </div>
            <BookingFlow car={car} onClose={() => setShowBooking(false)} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">{t.detail_home}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/catalogo" className="hover:text-gray-300 transition-colors">{t.nav_catalog}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-400">{car.brand} {car.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images */}
          <div>
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden mb-3" style={{ height: '400px' }}>
              <Image
                src={car.images[imgIdx]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Nav arrows */}
              {car.images.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + car.images.length) % car.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={() => setImgIdx(i => (i + 1) % car.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                {imgIdx + 1} / {car.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2">
              {car.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={cn(
                    'relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all',
                    i === imgIdx ? 'border-[var(--primary)]' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${getCategoryColor(car.category)}`}>
                  {getCategoryLabel(car.category)}
                </div>
                <p className="text-gray-400 text-sm font-medium mb-1">{car.brand}</p>
                <h1 className="text-white text-4xl font-black tracking-tight">{car.model}</h1>
                <p className="text-gray-500 text-lg">{car.year} · {car.color}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-gray-500 hover:text-red-400 hover:border-red-800/40 transition-all">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className={cn('w-4 h-4', i <= Math.round(car.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700')} />
                ))}
              </div>
              <span className="text-white font-semibold">{car.rating}</span>
              <span className="text-gray-500 text-sm">({car.totalRentals} {t.detail_rentals})</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <div>
                <p className="text-[var(--primary)] font-black text-5xl">{formatCurrency(car.pricePerDay)}</p>
                <p className="text-gray-500 text-sm mt-1">{t.detail_per_day} · {t.detail_miles_label} {car.mileage === 'unlimited' ? t.detail_mileage_unlimited : car.mileage}</p>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Users, label: t.detail_passengers, value: `${car.passengers} ${lang === 'en' ? 'passengers' : 'personas'}` },
                { icon: Briefcase, label: t.detail_luggage, value: `${car.luggage} ${lang === 'en' ? 'bags' : 'maletas'}` },
                { icon: DoorOpen, label: t.detail_doors, value: `${car.doors} ${lang === 'en' ? 'doors' : 'puertas'}` },
                { icon: Settings, label: t.detail_transmission, value: car.transmission === 'automatic' ? t.detail_automatic : t.detail_manual },
                { icon: Fuel, label: t.detail_engine, value: car.engine },
                { icon: Fuel, label: t.detail_fuel, value: FUEL_LABELS[car.fuelType] ?? car.fuelType },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/6">
                  <Icon className="w-4 h-4 text-[var(--primary)] mb-2" />
                  <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-white text-xs font-semibold leading-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-white font-semibold text-sm mb-3">{t.detail_equipment}</h3>
              <div className="grid grid-cols-2 gap-2">
                {car.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="w-3.5 h-3.5 text-[var(--primary)] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{car.description}</p>

            {/* CTA */}
            <button
              onClick={() => setShowBooking(true)}
              className="btn-primary w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              {t.detail_book_btn}
            </button>
            <p className="text-center text-gray-600 text-xs mt-3">
              {t.detail_cancellation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
