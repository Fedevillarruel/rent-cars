'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Users, Briefcase, Fuel, Settings, Star, ChevronRight, Gauge
} from 'lucide-react';
import { Car } from '@/lib/types';
import { formatCurrency, getCategoryLabel, getCategoryColor, cn } from '@/lib/utils';

interface CarCardProps {
  car: Car;
  compact?: boolean;
}

const FUEL_LABELS: Record<string, string> = {
  gasoline: 'Nafta',
  diesel: 'Diesel',
  hybrid: 'Híbrido',
  electric: 'Eléctrico',
};

const TRANSMISSION_LABELS: Record<string, string> = {
  automatic: 'Automático',
  manual: 'Manual',
};

export default function CarCard({ car, compact = false }: CarCardProps) {
  const [imgIdx, setImgIdx] = useState(0);

  return (
    <div className="glass rounded-2xl overflow-hidden card-hover group border border-[rgba(200,169,110,0.08)]">
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? '180px' : '220px' }}>
        <Image
          src={car.images[imgIdx] || car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(car.category)}`}>
          {getCategoryLabel(car.category)}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-white text-xs font-semibold">{car.rating.toFixed(1)}</span>
        </div>

        {/* Image dots */}
        {car.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {car.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setImgIdx(i); }}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all duration-200',
                  i === imgIdx ? 'bg-[var(--primary)] w-4' : 'bg-white/40 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        )}

        {/* Mileage badge */}
        {car.mileage === 'unlimited' && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[10px] text-gray-300 font-medium">
            Millas ilimitadas
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-gray-500 text-xs font-medium tracking-wider uppercase mb-1">{car.brand}</p>
            <h3 className="text-white font-bold text-lg leading-tight">{car.model}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{car.year} · {car.color}</p>
          </div>
          <div className="text-right">
            <p className="text-[var(--primary)] font-bold text-2xl">{formatCurrency(car.pricePerDay)}</p>
            <p className="text-gray-600 text-xs">por día</p>
          </div>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-xl bg-white/3 border border-white/5">
          {[
            { icon: Users, value: car.passengers, label: 'Pasaj.' },
            { icon: Briefcase, value: car.luggage, label: 'Maletas' },
            { icon: Settings, value: TRANSMISSION_LABELS[car.transmission].slice(0, 4) + '.', label: 'Trans.' },
            { icon: Fuel, value: FUEL_LABELS[car.fuelType], label: 'Motor' },
          ].map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Icon className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="text-white text-xs font-semibold leading-none">{value}</span>
              <span className="text-gray-600 text-[10px] leading-none">{label}</span>
            </div>
          ))}
        </div>

        {/* Features preview */}
        {!compact && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {car.features.slice(0, 3).map((f, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-gray-400 text-[10px]">
                {f}
              </span>
            ))}
            {car.features.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-gray-500 text-[10px]">
                +{car.features.length - 3} más
              </span>
            )}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/catalogo/${car.id}`}
          className="flex items-center justify-between w-full px-4 py-3 rounded-xl btn-primary text-sm font-semibold group/btn"
        >
          <span>Ver detalles y reservar</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
