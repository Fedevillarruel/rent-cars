'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Car } from '@/lib/types';
import { getCars } from '@/lib/storage';
import { getCategoryLabel, cn } from '@/lib/utils';
import CarCard from '@/components/CarCard';

const CATEGORIES = ['economy', 'compact', 'suv', 'luxury', 'sports', 'van'];
const TRANSMISSIONS = ['automatic', 'manual'];
const FUEL_TYPES = ['gasoline', 'diesel', 'hybrid', 'electric'];

function CatalogoContent() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [filtered, setFiltered] = useState<Car[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(searchParams.get('categoria') || '');
  const [priceMax, setPriceMax] = useState(1000);
  const [passengers, setPassengers] = useState(0);
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setCars(getCars());
  }, []);

  useEffect(() => {
    let result = cars.filter(c => c.available);

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    if (category) result = result.filter(c => c.category === category);
    if (priceMax < 1000) result = result.filter(c => c.pricePerDay <= priceMax);
    if (passengers > 0) result = result.filter(c => c.passengers >= passengers);
    if (transmission) result = result.filter(c => c.transmission === transmission);
    if (fuelType) result = result.filter(c => c.fuelType === fuelType);

    if (sortBy === 'price_asc') result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === 'price_desc') result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);

    setFiltered(result);
  }, [cars, search, category, priceMax, passengers, transmission, fuelType, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setPriceMax(1000);
    setPassengers(0);
    setTransmission('');
    setFuelType('');
    setSortBy('relevance');
  };

  const hasFilters = search || category || priceMax < 1000 || passengers > 0 || transmission || fuelType;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24">
      {/* Header */}
      <div className="bg-[#07070d] border-b border-[rgba(200,169,110,0.08)] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--primary)] text-sm font-semibold tracking-widest uppercase mb-2">Nuestra Flota</p>
          <h1 className="text-white text-4xl sm:text-5xl font-black tracking-tight mb-4">Catálogo de Vehículos</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            {filtered.length} vehículo{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''} ·
            Miami, FL
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and controls bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all',
              showFilters
                ? 'bg-[rgba(200,169,110,0.1)] border-[rgba(200,169,110,0.3)] text-[var(--primary)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtros
            {hasFilters && <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />}
          </button>
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="pl-4 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none"
            >
              <option value="relevance" className="bg-[#111]">Relevancia</option>
              <option value="price_asc" className="bg-[#111]">Precio: menor a mayor</option>
              <option value="price_desc" className="bg-[#111]">Precio: mayor a menor</option>
              <option value="rating" className="bg-[#111]">Mejor valorados</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="glass rounded-2xl p-6 mb-6 border border-[rgba(200,169,110,0.1)]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="block text-xs text-gray-500 mb-3 font-medium tracking-wide uppercase">Categoría</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setCategory('')} className={cn('px-3 py-1.5 rounded-lg border text-xs font-medium transition-all', !category ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]' : 'border-white/10 text-gray-500 hover:border-white/20')}>Todos</button>
                  {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setCategory(cat === category ? '' : cat)} className={cn('px-3 py-1.5 rounded-lg border text-xs font-medium transition-all', category === cat ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]' : 'border-white/10 text-gray-500 hover:border-white/20')}>
                      {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs text-gray-500 mb-3 font-medium tracking-wide uppercase">
                  Precio máx: <span className="text-[var(--primary)]">${priceMax === 1000 ? 'Sin límite' : priceMax + '/día'}</span>
                </label>
                <input
                  type="range"
                  min={50}
                  max={1000}
                  step={25}
                  value={priceMax}
                  onChange={e => setPriceMax(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>$50</span><span>$1,000+</span>
                </div>
              </div>

              {/* Passengers */}
              <div>
                <label className="block text-xs text-gray-500 mb-3 font-medium tracking-wide uppercase">Pasajeros mínimos</label>
                <div className="flex flex-wrap gap-2">
                  {[0, 2, 4, 5, 7].map(p => (
                    <button key={p} onClick={() => setPassengers(p)} className={cn('px-3 py-1.5 rounded-lg border text-xs font-medium transition-all', passengers === p ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]' : 'border-white/10 text-gray-500 hover:border-white/20')}>
                      {p === 0 ? 'Todos' : `${p}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fuel */}
              <div>
                <label className="block text-xs text-gray-500 mb-3 font-medium tracking-wide uppercase">Combustible</label>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setFuelType('')} className={cn('px-3 py-1.5 rounded-lg border text-xs font-medium transition-all', !fuelType ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]' : 'border-white/10 text-gray-500 hover:border-white/20')}>Todos</button>
                  {FUEL_TYPES.map(ft => (
                    <button key={ft} onClick={() => setFuelType(ft === fuelType ? '' : ft)} className={cn('px-3 py-1.5 rounded-lg border text-xs font-medium transition-all capitalize', fuelType === ft ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]' : 'border-white/10 text-gray-500 hover:border-white/20')}>
                      {ft === 'gasoline' ? 'Nafta' : ft === 'hybrid' ? 'Híbrido' : ft === 'electric' ? 'Eléctrico' : 'Diesel'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="mt-4 pt-4 border-t border-white/8 flex justify-end">
                <button onClick={clearFilters} className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)] transition-colors flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* Category quick filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {['', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl border text-sm font-medium transition-all whitespace-nowrap',
                category === cat
                  ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.1)] text-[var(--primary)]'
                  : 'border-white/10 bg-white/3 text-gray-400 hover:border-white/20 hover:text-white'
              )}
            >
              {cat === '' ? 'Todos' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-white text-xl font-bold mb-2">Sin resultados</h3>
            <p className="text-gray-400 text-sm">No encontramos vehículos con esos filtros.</p>
            <button onClick={clearFilters} className="mt-4 btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold">
              Ver todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center"><div className="text-gray-400">Cargando catálogo...</div></div>}>
      <CatalogoContent />
    </Suspense>
  );
}
