'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Car, Calendar, DollarSign, TrendingUp, Plus,
  Edit, Trash2, BarChart2, LogOut, Check,
  AlertCircle, Star,
} from 'lucide-react';
import { isAdminLoggedIn, logoutAdmin, getCars, getBookings, addCar, updateCar, deleteCar, updateBookingStatus, getStats, resetDemo } from '@/lib/storage';
import { Car as CarType, Booking } from '@/lib/types';
import { formatCurrency, formatDate, generateId, today, getCategoryLabel, getCategoryColor, cn } from '@/lib/utils';

type TabType = 'dashboard' | 'cars' | 'bookings' | 'add-car';

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<TabType>('dashboard');
  const [cars, setCars] = useState<CarType[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({ totalCars: 0, availableCars: 0, totalBookings: 0, activeBookings: 0, completedBookings: 0, totalRevenue: 0 });

  // Add/Edit car form state
  const [editCar, setEditCar] = useState<CarType | null>(null);
  const [formBrand, setFormBrand] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formYear, setFormYear] = useState(2024);
  const [formCategory, setFormCategory] = useState('compact');
  const [formPrice, setFormPrice] = useState(80);
  const [formPassengers, setFormPassengers] = useState(5);
  const [formLuggage, setFormLuggage] = useState(3);
  const [formDoors, setFormDoors] = useState(4);
  const [formTransmission, setFormTransmission] = useState('automatic');
  const [formEngine, setFormEngine] = useState('');
  const [formFuel, setFormFuel] = useState('gasoline');
  const [formDesc, setFormDesc] = useState('');
  const [formColor, setFormColor] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  const refreshData = () => {
    setCars(getCars());
    setBookings(getBookings());
    setStats(getStats());
  };

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
      return;
    }
    refreshData();
  }, [router]);

  const handleLogout = () => {
    logoutAdmin();
    router.push('/');
  };

  const fillFormFromCar = (car: CarType) => {
    setEditCar(car);
    setFormBrand(car.brand);
    setFormModel(car.model);
    setFormYear(car.year);
    setFormCategory(car.category);
    setFormPrice(car.pricePerDay);
    setFormPassengers(car.passengers);
    setFormLuggage(car.luggage);
    setFormDoors(car.doors);
    setFormTransmission(car.transmission);
    setFormEngine(car.engine);
    setFormFuel(car.fuelType);
    setFormDesc(car.description);
    setFormColor(car.color);
    setFormImage(car.images[0] || '');
    setTab('add-car');
  };

  const clearForm = () => {
    setEditCar(null);
    setFormBrand(''); setFormModel(''); setFormYear(2024);
    setFormCategory('compact'); setFormPrice(80);
    setFormPassengers(5); setFormLuggage(3); setFormDoors(4);
    setFormTransmission('automatic'); setFormEngine('');
    setFormFuel('gasoline'); setFormDesc(''); setFormColor('');
    setFormImage(''); setFormSuccess(''); setFormError('');
  };

  const handleSaveCar = () => {
    if (!formBrand || !formModel || !formEngine || !formDesc || !formColor) {
      setFormError('Por favor completá todos los campos requeridos.');
      return;
    }
    const carData: CarType = {
      id: editCar?.id || generateId('car'),
      brand: formBrand,
      model: formModel,
      year: formYear,
      category: formCategory as CarType['category'],
      pricePerDay: formPrice,
      images: formImage ? [formImage] : ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80'],
      passengers: formPassengers,
      luggage: formLuggage,
      doors: formDoors,
      transmission: formTransmission as 'automatic' | 'manual',
      engine: formEngine,
      fuelType: formFuel as CarType['fuelType'],
      mileage: 'unlimited',
      features: [],
      description: formDesc,
      available: true,
      color: formColor,
      addedAt: editCar?.addedAt || today(),
      rating: editCar?.rating || 0,
      totalRentals: editCar?.totalRentals || 0,
      revenue: editCar?.revenue || 0,
    };

    if (editCar) {
      updateCar(carData);
      setFormSuccess('Vehículo actualizado correctamente.');
    } else {
      addCar(carData);
      setFormSuccess('Vehículo agregado al catálogo exitosamente.');
    }
    setFormError('');
    refreshData();
    setTimeout(() => { clearForm(); setTab('cars'); }, 1500);
  };

  const handleDeleteCar = (id: string) => {
    if (!confirm('¿Estás seguro que querés eliminar este vehículo?')) return;
    deleteCar(id);
    refreshData();
  };

  const handleToggleAvailable = (car: CarType) => {
    updateCar({ ...car, available: !car.available });
    refreshData();
  };

  const handleBookingStatus = (id: string, status: Booking['status']) => {
    updateBookingStatus(id, status);
    refreshData();
  };

  const TABS: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2 },
    { id: 'cars', label: 'Vehículos', icon: Car },
    { id: 'bookings', label: 'Reservas', icon: Calendar },
    { id: 'add-car', label: 'Agregar Auto', icon: Plus },
  ];

  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-yellow-900/30 text-yellow-400 border-yellow-800/50',
    confirmed: 'bg-blue-900/30 text-blue-400 border-blue-800/50',
    active: 'bg-green-900/30 text-green-400 border-green-800/50',
    completed: 'bg-gray-800/50 text-gray-400 border-gray-700/50',
    cancelled: 'bg-red-900/30 text-red-400 border-red-800/50',
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16">
      {/* Admin header */}
      <div className="bg-[#060609] border-b border-[rgba(200,169,110,0.08)] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-1 overflow-x-auto">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => { clearForm(); setTab(id); }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                    tab === id
                      ? 'bg-[rgba(200,169,110,0.1)] text-[var(--primary)] border border-[rgba(200,169,110,0.2)]'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { if(confirm('¿Resetear la demo?')) resetDemo(); }}
                className="px-3 py-2 rounded-lg border border-white/10 text-gray-500 text-xs hover:border-white/20 hover:text-gray-300 transition-all"
              >
                Reset Demo
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-gray-500 text-sm hover:border-red-800/50 hover:text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ── DASHBOARD ── */}
        {tab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-white text-3xl font-black mb-1">Dashboard</h1>
              <p className="text-gray-500 text-sm">Rendimiento general de MiamiDrive</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[
                { label: 'Vehículos', value: stats.totalCars, icon: Car, color: 'text-blue-400' },
                { label: 'Disponibles', value: stats.availableCars, icon: Check, color: 'text-green-400' },
                { label: 'Total reservas', value: stats.totalBookings, icon: Calendar, color: 'text-purple-400' },
                { label: 'Activas/Conf.', value: stats.activeBookings, icon: TrendingUp, color: 'text-yellow-400' },
                { label: 'Completadas', value: stats.completedBookings, icon: Check, color: 'text-emerald-400' },
                { label: 'Ingresos', value: formatCurrency(stats.totalRevenue), icon: DollarSign, color: 'text-[var(--primary)]' },
              ].map(({ label, value, icon: Icon, color }, i) => (
                <div key={i} className="glass rounded-2xl p-4 border border-white/6">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-gray-500 text-xs font-medium">{label}</span>
                  </div>
                  <p className={`text-2xl font-black ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Top cars */}
            <div>
              <h2 className="text-white font-bold text-xl mb-4">Rendimiento por vehículo</h2>
              <div className="glass rounded-2xl border border-white/6 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Vehículo</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Categoría</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Precio/día</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Alquileres</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Rating</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Ingresos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...cars].sort((a,b) => b.revenue - a.revenue).map(car => (
                      <tr key={car.id} className="border-b border-white/5 table-row-hover">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-7 rounded-lg overflow-hidden">
                              <Image src={car.images[0]} alt="" fill className="object-cover" />
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold">{car.brand} {car.model}</p>
                              <p className="text-gray-600 text-xs">{car.year}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3"><span className={`px-2 py-0.5 rounded-full text-xs border ${getCategoryColor(car.category)}`}>{getCategoryLabel(car.category)}</span></td>
                        <td className="px-5 py-3 text-right text-white text-sm">{formatCurrency(car.pricePerDay)}</td>
                        <td className="px-5 py-3 text-right text-gray-300 text-sm">{car.totalRentals}</td>
                        <td className="px-5 py-3 text-right">
                          <span className="flex items-center justify-end gap-1 text-yellow-400 text-sm">
                            <Star className="w-3 h-3 fill-yellow-400" />{car.rating}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-right text-[var(--primary)] text-sm font-semibold">{formatCurrency(car.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── CARS ── */}
        {tab === 'cars' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-3xl font-black mb-1">Vehículos</h1>
                <p className="text-gray-500 text-sm">{cars.length} autos en el catálogo</p>
              </div>
              <button
                onClick={() => { clearForm(); setTab('add-car'); }}
                className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                <Plus className="w-4 h-4" /> Agregar vehículo
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {cars.map(car => (
                <div key={car.id} className={cn('glass rounded-2xl overflow-hidden border card-hover', car.available ? 'border-[rgba(200,169,110,0.08)]' : 'border-red-900/30')}>
                  <div className="relative h-44">
                    <Image src={car.images[0]} alt={car.model} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold border', car.available ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-red-900/50 border-red-700 text-red-300')}>
                        {car.available ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <p className="text-white font-bold text-lg leading-tight">{car.brand} {car.model}</p>
                      <p className="text-gray-300 text-sm">{car.year} · {formatCurrency(car.pricePerDay)}/día</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-yellow-400 text-sm"><Star className="w-3.5 h-3.5 fill-yellow-400" /> {car.rating}</span>
                      <span className="text-gray-500 text-sm">{car.totalRentals} alquileres</span>
                      <span className="text-[var(--primary)] text-sm font-semibold">{formatCurrency(car.revenue)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleToggleAvailable(car)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-xs">
                        {car.available ? '🔒' : '🔓'}
                      </button>
                      <button onClick={() => fillFormFromCar(car)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteCar(car.id)} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-400 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BOOKINGS ── */}
        {tab === 'bookings' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-white text-3xl font-black mb-1">Reservas</h1>
              <p className="text-gray-500 text-sm">{bookings.length} reservas totales</p>
            </div>
            <div className="glass rounded-2xl border border-white/6 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className="border-b border-white/8">
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Vehículo</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Cliente</th>
                      <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase">Fechas</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase">Estado</th>
                      <th className="text-center px-5 py-3 text-xs font-medium text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(bk => (
                      <tr key={bk.id} className="border-b border-white/5 table-row-hover">
                        <td className="px-5 py-3"><code className="text-gray-500 text-xs">{bk.id.slice(0, 12)}...</code></td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <div className="relative w-9 h-6 rounded overflow-hidden">
                              <Image src={bk.carImage} alt="" fill className="object-cover" />
                            </div>
                            <span className="text-white text-sm font-medium">{bk.carName}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-white text-sm">{bk.customerName}</p>
                          <p className="text-gray-500 text-xs">{bk.customerEmail}</p>
                        </td>
                        <td className="px-5 py-3">
                          <p className="text-gray-300 text-xs">{formatDate(bk.startDate)}</p>
                          <p className="text-gray-500 text-xs">→ {formatDate(bk.endDate)} ({bk.days}d)</p>
                        </td>
                        <td className="px-5 py-3 text-right text-[var(--primary)] font-semibold text-sm">{formatCurrency(bk.total)}</td>
                        <td className="px-5 py-3 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[bk.status] || ''}`}>
                            {bk.status}
                          </span>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center justify-center gap-1">
                            {bk.status === 'pending' && (
                              <>
                                <button onClick={() => handleBookingStatus(bk.id, 'confirmed')} className="px-2 py-1 rounded-lg bg-green-900/30 border border-green-800/40 text-green-400 text-xs font-medium hover:bg-green-900/50 transition-all">Confirmar</button>
                                <button onClick={() => handleBookingStatus(bk.id, 'cancelled')} className="px-2 py-1 rounded-lg bg-red-900/30 border border-red-800/40 text-red-400 text-xs font-medium hover:bg-red-900/50 transition-all">Cancelar</button>
                              </>
                            )}
                            {bk.status === 'confirmed' && (
                              <>
                                <button onClick={() => handleBookingStatus(bk.id, 'active')} className="px-2 py-1 rounded-lg bg-blue-900/30 border border-blue-800/40 text-blue-400 text-xs font-medium hover:bg-blue-900/50 transition-all">Activar</button>
                                <button onClick={() => handleBookingStatus(bk.id, 'cancelled')} className="px-2 py-1 rounded-lg bg-red-900/30 border border-red-800/40 text-red-400 text-xs font-medium">Cancelar</button>
                              </>
                            )}
                            {bk.status === 'active' && (
                              <button onClick={() => handleBookingStatus(bk.id, 'completed')} className="px-2 py-1 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 text-xs font-medium hover:bg-gray-700 transition-all">Completar</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── ADD / EDIT CAR ── */}
        {tab === 'add-car' && (
          <div className="max-w-2xl">
            <div className="mb-6">
              <h1 className="text-white text-3xl font-black mb-1">{editCar ? 'Editar vehículo' : 'Agregar vehículo'}</h1>
              <p className="text-gray-500 text-sm">{editCar ? `Editando: ${editCar.brand} ${editCar.model}` : 'Sumá un nuevo auto al catálogo'}</p>
            </div>

            <div className="glass rounded-2xl p-6 border border-[rgba(200,169,110,0.1)] space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Marca *', value: formBrand, setter: setFormBrand, placeholder: 'Ej: BMW' },
                  { label: 'Modelo *', value: formModel, setter: setFormModel, placeholder: 'Ej: X5' },
                  { label: 'Color *', value: formColor, setter: setFormColor, placeholder: 'Ej: Carbon Black' },
                  { label: 'Motor *', value: formEngine, setter: setFormEngine, placeholder: 'Ej: 3.0L V6 335hp' },
                ].map(({ label, value, setter, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{label}</label>
                    <input type="text" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Año</label>
                  <input type="number" value={formYear} onChange={e => setFormYear(Number(e.target.value))} min={2018} max={2026}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Precio/día (USD) *</label>
                  <input type="number" value={formPrice} onChange={e => setFormPrice(Number(e.target.value))} min={30}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Categoría</label>
                  <select value={formCategory} onChange={e => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                    {['economy','compact','suv','luxury','sports','van'].map(c => <option key={c} value={c} className="bg-[#111]">{getCategoryLabel(c)}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Pasajeros</label>
                  <input type="number" value={formPassengers} onChange={e => setFormPassengers(Number(e.target.value))} min={2} max={9}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Maletas</label>
                  <input type="number" value={formLuggage} onChange={e => setFormLuggage(Number(e.target.value))} min={1} max={8}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Puertas</label>
                  <input type="number" value={formDoors} onChange={e => setFormDoors(Number(e.target.value))} min={2} max={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Transmisión</label>
                  <select value={formTransmission} onChange={e => setFormTransmission(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                    <option value="automatic" className="bg-[#111]">Automático</option>
                    <option value="manual" className="bg-[#111]">Manual</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Combustible</label>
                <select value={formFuel} onChange={e => setFormFuel(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                  <option value="gasoline" className="bg-[#111]">Nafta</option>
                  <option value="diesel" className="bg-[#111]">Diesel</option>
                  <option value="hybrid" className="bg-[#111]">Híbrido</option>
                  <option value="electric" className="bg-[#111]">Eléctrico</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">URL de imagen principal</label>
                <input type="url" value={formImage} onChange={e => setFormImage(e.target.value)} placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors" />
                {formImage && (
                  <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden">
                    <Image src={formImage} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Descripción *</label>
                <textarea value={formDesc} onChange={e => setFormDesc(e.target.value)} rows={3} placeholder="Describí el vehículo para los clientes..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" />
              </div>

              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" /> {formError}
                </div>
              )}
              {formSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-green-900/20 border border-green-800/40 text-green-400 text-sm">
                  <Check className="w-4 h-4" /> {formSuccess}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button onClick={() => { clearForm(); setTab('cars'); }} className="flex-1 py-3 rounded-xl border border-white/15 text-gray-400 text-sm font-medium hover:border-white/30 hover:text-white transition-all">
                  Cancelar
                </button>
                <button onClick={handleSaveCar} className="flex-1 btn-primary py-3 rounded-xl font-semibold text-sm">
                  {editCar ? 'Actualizar vehículo' : 'Agregar al catálogo'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
