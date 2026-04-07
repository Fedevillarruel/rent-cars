'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Shield, Package, User, CreditCard, Check, ChevronRight, ChevronLeft, Info, AlertCircle } from 'lucide-react';
import { Car, InsurancePlan, Extra, Booking } from '@/lib/types';
import { LOCATIONS, INSURANCE_PLANS, EXTRAS } from '@/lib/data';
import { formatCurrency, daysBetween, generateId, today, tomorrow, formatDate, cn } from '@/lib/utils';
import { addBooking, isCarAvailable } from '@/lib/storage';

interface BookingFlowProps {
  car: Car;
  onClose?: () => void;
}

const STEPS = [
  { id: 1, label: 'Fechas y Lugar', icon: Calendar },
  { id: 2, label: 'Seguro', icon: Shield },
  { id: 3, label: 'Adicionales', icon: Package },
  { id: 4, label: 'Tus Datos', icon: User },
  { id: 5, label: 'Pago', icon: CreditCard },
];

export default function BookingFlow({ car, onClose }: BookingFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [startDate, setStartDate] = useState(today());
  const [endDate, setEndDate] = useState(tomorrow());
  const [pickupLoc, setPickupLoc] = useState(LOCATIONS[0].name);
  const [returnLoc, setReturnLoc] = useState(LOCATIONS[0].name);
  const [availError, setAvailError] = useState('');

  // Step 2
  const [insurance, setInsurance] = useState<InsurancePlan>(INSURANCE_PLANS[2]);

  // Step 3
  const [selectedExtras, setSelectedExtras] = useState<{ extra: Extra; qty: number }[]>([]);

  // Step 4
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerDni, setCustomerDni] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Step 5
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [payError, setPayError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const days = daysBetween(startDate, endDate);
  const subtotalCar = car.pricePerDay * days;
  const subtotalInsurance = insurance.pricePerDay * days;
  const subtotalExtras = selectedExtras.reduce((acc, { extra, qty }) => acc + extra.pricePerDay * days * qty, 0);
  const total = subtotalCar + subtotalInsurance + subtotalExtras;

  const handleExtraToggle = (extra: Extra) => {
    const exists = selectedExtras.find(e => e.extra.id === extra.id);
    if (exists) {
      setSelectedExtras(prev => prev.filter(e => e.extra.id !== extra.id));
    } else {
      setSelectedExtras(prev => [...prev, { extra, qty: 1 }]);
    }
  };

  const handleExtraQty = (extraId: string, delta: number) => {
    setSelectedExtras(prev => prev.map(e => {
      if (e.extra.id !== extraId) return e;
      const max = e.extra.maxQty ?? 10;
      const newQty = Math.min(Math.max(1, e.qty + delta), max);
      return { ...e, qty: newQty };
    }));
  };

  const validateStep1 = () => {
    if (!startDate || !endDate) { setAvailError('Seleccioná las fechas.'); return false; }
    if (new Date(endDate) <= new Date(startDate)) { setAvailError('La fecha de devolución debe ser posterior al retiro.'); return false; }
    if (!isCarAvailable(car.id, startDate, endDate)) {
      setAvailError('El vehículo no está disponible en esas fechas. Por favor, elegí otras fechas.');
      return false;
    }
    setAvailError('');
    return true;
  };

  const validateStep4 = () => {
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !customerDni.trim()) {
      setFormError('Por favor, completá todos los campos requeridos.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      setFormError('El email no es válido.');
      return false;
    }
    setFormError('');
    return true;
  };

  const validateStep5 = () => {
    if (!paymentMethod) { setPayError('Seleccioná un método de pago.'); return false; }
    if (paymentMethod === 'card') {
      if (!cardName || !cardNumber || !cardExpiry || !cardCvc) {
        setPayError('Completá todos los datos de la tarjeta.');
        return false;
      }
    }
    if (!termsAccepted) { setPayError('Debés aceptar los términos y condiciones.'); return false; }
    setPayError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 4 && !validateStep4()) return;
    setStep(s => Math.min(s + 1, 5));
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    if (!validateStep5()) return;
    setProcessing(true);
    await new Promise(r => setTimeout(r, 2000));

    const booking: Booking = {
      id: generateId('bk'),
      carId: car.id,
      carName: `${car.brand} ${car.model} ${car.year}`,
      carImage: car.images[0],
      customerName,
      customerEmail,
      customerPhone,
      customerDni,
      pickupLocation: pickupLoc,
      returnLocation: returnLoc,
      startDate,
      endDate,
      days,
      carPricePerDay: car.pricePerDay,
      insurancePlan: insurance,
      extras: selectedExtras,
      subtotalCar,
      subtotalInsurance,
      subtotalExtras,
      total,
      status: 'confirmed',
      createdAt: today(),
      paymentMethod: paymentMethod === 'card' ? `**** **** **** ${cardNumber.slice(-4)}` : paymentMethod,
      paymentStatus: 'paid',
      notes,
    };

    addBooking(booking);
    setBookingId(booking.id);
    setProcessing(false);
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="text-center py-8 px-4 max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-green-900/30 border border-green-700/50 flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-2">¡Reserva Confirmada!</h2>
        <p className="text-gray-400 text-sm mb-1">Número de reserva</p>
        <code className="text-[var(--primary)] text-lg font-bold font-mono">{bookingId}</code>
        <p className="text-gray-400 text-sm mt-4 leading-relaxed">
          Te enviamos un email de confirmación a <strong className="text-white">{customerEmail}</strong> con todos los detalles de tu reserva.
        </p>
        <div className="mt-6 p-4 rounded-xl bg-white/3 border border-white/8 text-left space-y-2">
          <p className="text-xs text-gray-500"><span className="text-gray-400">Vehículo:</span> {car.brand} {car.model} {car.year}</p>
          <p className="text-xs text-gray-500"><span className="text-gray-400">Retiro:</span> {formatDate(startDate)} · {pickupLoc.split('(')[0].trim()}</p>
          <p className="text-xs text-gray-500"><span className="text-gray-400">Devolución:</span> {formatDate(endDate)} · {returnLoc.split('(')[0].trim()}</p>
          <p className="text-xs text-gray-500"><span className="text-gray-400">Total:</span> <span className="text-[var(--primary)] font-bold">{formatCurrency(total)}</span></p>
        </div>
        <button
          onClick={() => router.push('/catalogo')}
          className="mt-6 btn-primary w-full py-3.5 rounded-xl font-semibold"
        >
          Explorar más autos
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8 px-2">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isDone = s.id < step;
          return (
            <div key={s.id} className="flex items-center gap-0">
              <div className="flex flex-col items-center gap-1.5">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center border text-xs font-semibold transition-all duration-300',
                  isActive ? 'bg-[var(--primary)] border-[var(--primary)] text-[#07070d]' :
                  isDone ? 'bg-green-900/40 border-green-700 text-green-400' :
                  'bg-white/5 border-white/15 text-gray-600'
                )}>
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className={cn('text-[10px] font-medium hidden sm:block', isActive ? 'text-[var(--primary)]' : isDone ? 'text-green-400' : 'text-gray-600')}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn('w-8 sm:w-12 h-px mx-1 sm:mx-2 transition-all duration-300', isDone ? 'bg-green-700' : 'bg-white/10')} />
              )}
            </div>
          );
        })}
      </div>

      {/* Pricing summary sticky */}
      <div className="mb-6 p-4 rounded-xl bg-[rgba(200,169,110,0.06)] border border-[rgba(200,169,110,0.15)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-white text-sm font-semibold">{car.brand} {car.model}</p>
              <p className="text-gray-500 text-xs">{days} día{days > 1 ? 's' : ''} · {formatDate(startDate)} → {formatDate(endDate)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[var(--primary)] font-bold text-xl">{formatCurrency(total)}</p>
            <p className="text-gray-600 text-xs">Total estimado</p>
          </div>
        </div>
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">Fechas y puntos de entrega</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Fecha de retiro *</label>
              <input
                type="date"
                value={startDate}
                min={today()}
                onChange={e => { setStartDate(e.target.value); setAvailError(''); }}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Fecha de devolución *</label>
              <input
                type="date"
                value={endDate}
                min={startDate || today()}
                onChange={e => { setEndDate(e.target.value); setAvailError(''); }}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </div>
          </div>
          {availError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {availError}
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Punto de retiro *</label>
            <select
              value={pickupLoc}
              onChange={e => setPickupLoc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
            >
              {LOCATIONS.map(l => (
                <option key={l.id} value={l.name} className="bg-[#111] text-white">{l.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Punto de devolución *</label>
            <select
              value={returnLoc}
              onChange={e => setReturnLoc(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
            >
              {LOCATIONS.map(l => (
                <option key={l.id} value={l.name} className="bg-[#111] text-white">{l.name}</option>
              ))}
            </select>
          </div>
          <div className="p-3 rounded-xl bg-blue-900/15 border border-blue-800/30 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-blue-300 text-xs leading-relaxed">
              Entrega gratuita en aeropuerto MIA y FLL. En otros puntos puede aplicar cargo de $25.
            </p>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-white font-bold text-xl">Cobertura de seguro</h2>
          <div className="space-y-3">
            {INSURANCE_PLANS.map(plan => (
              <div
                key={plan.id}
                onClick={() => setInsurance(plan)}
                className={cn(
                  'relative p-4 rounded-xl border cursor-pointer transition-all duration-200',
                  insurance.id === plan.id
                    ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.08)]'
                    : 'border-white/10 bg-white/3 hover:border-white/20'
                )}
              >
                {plan.recommended && (
                  <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-[var(--primary)] text-[#07070d] text-[10px] font-bold rounded-full">
                    RECOMENDADO
                  </div>
                )}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                      insurance.id === plan.id ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-white/30'
                    )}>
                      {insurance.id === plan.id && <div className="w-2 h-2 rounded-full bg-[#07070d]" />}
                    </div>
                    <h3 className="text-white font-semibold">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    {plan.pricePerDay === 0 ? (
                      <p className="text-gray-500 text-sm font-medium">Gratis</p>
                    ) : (
                      <>
                        <p className="text-[var(--primary)] font-bold">{formatCurrency(plan.pricePerDay)}/día</p>
                        <p className="text-gray-600 text-xs">{formatCurrency(plan.pricePerDay * days)} total</p>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 text-sm ml-8 mb-2">{plan.description}</p>
                {plan.coverage.length > 0 && (
                  <div className="ml-8 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {plan.coverage.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400">
                        <Check className="w-3 h-3 text-green-400 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-white font-bold text-xl">Adicionales y extras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {EXTRAS.map(extra => {
              const selected = selectedExtras.find(e => e.extra.id === extra.id);
              return (
                <div
                  key={extra.id}
                  className={cn(
                    'p-4 rounded-xl border transition-all duration-200',
                    selected
                      ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.08)]'
                      : 'border-white/10 bg-white/3 hover:border-white/20'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white text-sm font-semibold mb-0.5">{extra.name}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-2">{extra.description}</p>
                      <p className="text-[var(--primary)] text-sm font-semibold">
                        {extra.pricePerDay === 0 ? 'Gratis' : `${formatCurrency(extra.pricePerDay)}/día`}
                      </p>
                    </div>
                    <button
                      onClick={() => handleExtraToggle(extra)}
                      className={cn(
                        'ml-3 w-7 h-7 rounded-full border flex items-center justify-center text-sm font-bold transition-all flex-shrink-0',
                        selected
                          ? 'bg-[var(--primary)] border-[var(--primary)] text-[#07070d]'
                          : 'border-white/30 text-gray-500 hover:border-white/60'
                      )}
                    >
                      {selected ? '✓' : '+'}
                    </button>
                  </div>
                  {selected && extra.maxQty && extra.maxQty > 1 && (
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10">
                      <span className="text-gray-500 text-xs">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleExtraQty(extra.id, -1)} className="w-6 h-6 rounded-md bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20">-</button>
                        <span className="text-white text-sm font-bold w-4 text-center">{selected.qty}</span>
                        <button onClick={() => handleExtraQty(extra.id, 1)} className="w-6 h-6 rounded-md bg-white/10 text-white text-sm flex items-center justify-center hover:bg-white/20">+</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">Tus datos personales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Nombre completo *', value: customerName, setter: setCustomerName, placeholder: 'Ej: Carlos García', type: 'text' },
              { label: 'Email *', value: customerEmail, setter: setCustomerEmail, placeholder: 'tu@email.com', type: 'email' },
              { label: 'Teléfono *', value: customerPhone, setter: setCustomerPhone, placeholder: '+1 (305) 555-0100', type: 'tel' },
              { label: 'Pasaporte / DNI *', value: customerDni, setter: setCustomerDni, placeholder: 'Número de documento', type: 'text' },
            ].map(({ label, value, setter, placeholder, type }) => (
              <div key={label}>
                <label className="block text-sm text-gray-400 mb-2">{label}</label>
                <input
                  type={type}
                  value={value}
                  onChange={e => setter(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Notas adicionales (opcional)</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Horario de llegada, requerimientos especiales..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
            />
          </div>
          {formError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {formError}
            </div>
          )}
        </div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <div className="space-y-5">
          <h2 className="text-white font-bold text-xl">Resumen y pago</h2>

          {/* Cost breakdown */}
          <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-3">
            <h3 className="text-gray-400 text-sm font-medium mb-3">Desglose de costos</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{car.brand} {car.model} × {days} día{days > 1 ? 's' : ''}</span>
              <span className="text-white font-medium">{formatCurrency(subtotalCar)}</span>
            </div>
            {subtotalInsurance > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Seguro: {insurance.name}</span>
                <span className="text-white font-medium">{formatCurrency(subtotalInsurance)}</span>
              </div>
            )}
            {selectedExtras.map(({ extra, qty }) => (
              <div key={extra.id} className="flex justify-between text-sm">
                <span className="text-gray-400">{extra.name} ×{qty}</span>
                <span className="text-white font-medium">{formatCurrency(extra.pricePerDay * days * qty)}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-3 flex justify-between">
              <span className="text-white font-bold">Total</span>
              <span className="text-[var(--primary)] font-bold text-xl">{formatCurrency(total)}</span>
            </div>
          </div>

          {/* Payment method */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3">Método de pago *</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Tarjeta', icon: '💳' },
                { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                { id: 'crypto', label: 'Crypto', icon: '₿' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => { setPaymentMethod(method.id); setPayError(''); }}
                  className={cn(
                    'p-3 rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col items-center gap-1',
                    paymentMethod === method.id
                      ? 'border-[var(--primary)] bg-[rgba(200,169,110,0.08)] text-[var(--primary)]'
                      : 'border-white/10 bg-white/3 text-gray-400 hover:border-white/20'
                  )}
                >
                  <span className="text-xl">{method.icon}</span>
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="p-4 rounded-xl bg-white/3 border border-white/8 space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Nombre en la tarjeta *</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  placeholder="NOMBRE APELLIDO"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm uppercase placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Número de tarjeta *</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors font-mono tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Vencimiento *</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={e => setCardExpiry(e.target.value)}
                    placeholder="MM/AA"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2">CVC *</label>
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={e => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {(paymentMethod === 'paypal' || paymentMethod === 'crypto') && (
            <div className="p-4 rounded-xl bg-blue-900/15 border border-blue-800/30 text-blue-300 text-sm">
              En la versión de producción serás redirigido a {paymentMethod === 'paypal' ? 'PayPal' : 'la pasarela de crypto'} para completar el pago de forma segura.
            </div>
          )}

          {/* Terms */}
          <div className="flex items-start gap-3">
            <button
              onClick={() => { setTermsAccepted(!termsAccepted); setPayError(''); }}
              className={cn(
                'mt-0.5 w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all',
                termsAccepted ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/30 bg-white/5'
              )}
            >
              {termsAccepted && <Check className="w-3 h-3 text-[#07070d]" />}
            </button>
            <p className="text-gray-400 text-sm leading-relaxed">
              Acepto los{' '}
              <span className="text-[var(--primary)] cursor-pointer hover:underline">Términos y Condiciones</span>
              {' '}y la{' '}
              <span className="text-[var(--primary)] cursor-pointer hover:underline">Política de Privacidad</span>
              {' '}de MiamiDrive.
            </p>
          </div>

          {payError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {payError}
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-gray-400 text-sm font-medium hover:border-white/30 hover:text-white transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver
          </button>
        ) : (
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 text-gray-400 text-sm font-medium hover:border-white/30 hover:text-white transition-all"
          >
            Cancelar
          </button>
        )}

        {step < 5 ? (
          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={processing}
            className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold disabled:opacity-70"
          >
            {processing ? (
              <>
                <div className="w-4 h-4 border-2 border-[#07070d]/30 border-t-[#07070d] rounded-full animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Confirmar reserva · {formatCurrency(total)}
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
