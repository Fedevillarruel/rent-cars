'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';

const FAQS = [
  {
    category: 'Reservas',
    items: [
      { q: '¿Cómo hago una reserva?', a: 'Podés hacer tu reserva 100% online desde nuestro catálogo. Elegí el auto, seleccioná las fechas y el punto de entrega, completá tus datos personales y pagá de forma segura. Recibirás la confirmación por email inmediatamente.' },
      { q: '¿Con cuánta anticipación debo reservar?', a: 'Podés reservar con hasta 6 meses de anticipación o incluso el mismo día, sujeto a disponibilidad. Recomendamos reservar con al menos 24-48 hs de anticipación para garantizar disponibilidad y una mejor tarifa.' },
      { q: '¿Puedo modificar mi reserva?', a: 'Sí, podés modificar fechas, vehículo o servicios adicionales con al menos 24 hs de anticipación sin cargo. Modificaciones con menos de 24 hs pueden estar sujetas a disponibilidad y diferencias de precio.' },
      { q: '¿Cómo cancelo una reserva?', a: 'Para cancelar tu reserva contactanos por email o WhatsApp. Cancelaciones con más de 48 hs de anticipación reciben reembolso completo. Dentro de las 48 hs se cobra el 50% del valor total de la reserva.' },
      { q: '¿Puedo elegir el color o modelo exacto?', a: 'Ofrecemos el vehículo o uno similar de la misma categoría. En la mayoría de los casos entregaremos exactamente el auto del catálogo, pero en ocasiones por mantenimiento podemos ofrecer un equivalente de igual o superior categoría.' },
    ],
  },
  {
    category: 'Requisitos y documentación',
    items: [
      { q: '¿Qué documentos necesito para alquilar?', a: 'Necesitás: (1) Licencia de conducir válida — si sos extranjero, licencia internacional o del país de origen más pasaporte. (2) Documento de identidad / pasaporte. (3) Tarjeta de crédito a nombre del conductor principal para el depósito de garantía.' },
      { q: '¿Cuál es la edad mínima para alquilar?', a: 'La edad mínima es 21 años. Para vehículos de categoría Luxury, Sports y Exotic se requieren 25 años. Los conductores de entre 21 y 24 años abonan un cargo adicional por conductor joven.' },
      { q: '¿Puedo agregar conductores adicionales?', a: 'Sí, podés agregar hasta 2 conductores adicionales. Cada uno debe presentar su licencia de conducir válida y abonar el cargo de conductor adicional ($15/día). Todos los conductores deben estar presentes en la entrega del vehículo.' },
      { q: '¿Aceptan licencias de conducir extranjeras?', a: 'Sí, aceptamos licencias de todos los países. Si tu licencia no está en inglés o en caracteres latinos, se recomienda tener también una licencia internacional. Verificamos la validez de todos los documentos.' },
    ],
  },
  {
    category: 'Vehículos y servicios',
    items: [
      { q: '¿Los autos incluyen kilometraje ilimitado?', a: 'Sí, todos nuestros vehículos incluyen kilometraje ilimitado en todas las tarifas. No hay cargos sorpresa por distancia recorrida. Podés manejar todo lo que necesites por Florida.' },
      { q: '¿Puedo llevar el auto a otro estado?', a: 'Los vehículos están autorizados para circular en todo el estado de Florida. Para viajes fuera de Florida, se necesita autorización previa — consultanos con anticipación. No está permitido cruzar la frontera a otros países.' },
      { q: '¿Cómo está el auto al momento de la entrega?', a: 'Todos los vehículos se entregan limpios, revisados mecánicamente y con el tanque lleno (salvo que hayas seleccionado la opción "Sin tanque" en los extras). Se realiza una revisión del estado del vehículo en conjunto con el cliente.' },
      { q: '¿Qué pasa si el auto tiene un problema mecánico?', a: 'Llamá a nuestro número de emergencias 24/7 inmediatamente. Si el problema es mecánico y no fue causado por el cliente, gestionamos el reemplazo del vehículo a la mayor brevedad posible sin costo adicional.' },
    ],
  },
  {
    category: 'Seguros y pagos',
    items: [
      { q: '¿Qué incluye el seguro básico?', a: 'El seguro básico cubre daños a terceros (responsabilidad civil) y accidentes graves. No cubre daños al vehículo propio por colisión o robo. Te recomendamos el plan Total o Premium Plus para mayor tranquilidad.' },
      { q: '¿Cuánto es el depósito de garantía?', a: 'El depósito varía según la categoría: Economy/Compact $500, SUV $800, Luxury/Sports $1,500, Exotic $3,000. Se bloquea en tu tarjeta de crédito y se libera dentro de los 3-5 días hábiles tras la devolución del vehículo en perfectas condiciones.' },
      { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas Visa, Mastercard, American Express, PayPal y criptomonedas (BTC, ETH, USDT). El depósito de garantía debe ser en tarjeta de crédito. No aceptamos efectivo como método de pago principal.' },
      { q: '¿El precio mostrado es el precio final?', a: 'El precio del catálogo es por día de alquiler. El total final incluye los días × tarifa diaria + plan de seguro elegido + extras seleccionados + impuestos aplicables. No hay costos ocultos — el desglose completo se muestra antes de confirmar la reserva.' },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        !query ||
        item.q.toLowerCase().includes(query.toLowerCase()) ||
        item.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-4">
            Preguntas
            <span className="text-[var(--primary)]"> frecuentes</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Todo lo que necesitás saber antes de reservar tu auto en Miami.
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscá una pregunta..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {filtered.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-[var(--primary)] text-sm font-semibold uppercase tracking-widest mb-4">{category}</h2>
              <div className="space-y-2">
                {items.map(({ q, a }) => {
                  const isOpen = open === q;
                  return (
                    <div key={q} className={`glass rounded-2xl border transition-all ${isOpen ? 'border-[rgba(200,169,110,0.15)]' : 'border-white/6'}`}>
                      <button
                        onClick={() => setOpen(isOpen ? null : q)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
                      >
                        <span className={`font-medium text-sm transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>{q}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[var(--primary)]' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5">
                          <p className="text-gray-400 text-sm leading-relaxed">{a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No encontramos preguntas con ese criterio.</p>
              <button onClick={() => setQuery('')} className="mt-3 text-[var(--primary)] text-sm hover:underline">Limpiar búsqueda</button>
            </div>
          )}

          <div className="glass rounded-2xl p-8 border border-[rgba(200,169,110,0.1)] text-center">
            <p className="text-white font-semibold text-lg mb-2">¿No encontraste lo que buscabas?</p>
            <p className="text-gray-400 text-sm mb-5">Nuestro equipo te responde en menos de 2 horas.</p>
            <Link href="/contacto" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-block">
              Contactarnos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
