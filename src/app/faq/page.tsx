'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function FaqPage() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const FAQS = [
    {
      category: lang === 'es' ? 'Reservas' : 'Bookings',
      items: [
        { q: lang === 'es' ? '¿Cómo hago una reserva?' : 'How do I make a booking?', a: lang === 'es' ? 'Podés hacer tu reserva 100% online desde nuestro catálogo. Elegí el auto, seleccioná las fechas y el punto de entrega, completá tus datos personales y pagá de forma segura. Recibirás la confirmación por email inmediatamente.' : 'You can book 100% online from our catalog. Choose the car, select dates and delivery point, fill in your personal details and pay securely. You\'ll receive confirmation by email immediately.' },
        { q: lang === 'es' ? '¿Con cuánta anticipación debo reservar?' : 'How far in advance should I book?', a: lang === 'es' ? 'Podés reservar con hasta 6 meses de anticipación o incluso el mismo día, sujeto a disponibilidad. Recomendamos reservar con al menos 24-48 hs de anticipación para garantizar disponibilidad y una mejor tarifa.' : 'You can book up to 6 months in advance or even the same day, subject to availability. We recommend booking at least 24-48 hours in advance to guarantee availability and a better rate.' },
        { q: lang === 'es' ? '¿Puedo modificar mi reserva?' : 'Can I modify my booking?', a: lang === 'es' ? 'Sí, podés modificar fechas, vehículo o servicios adicionales con al menos 24 hs de anticipación sin cargo. Modificaciones con menos de 24 hs pueden estar sujetas a disponibilidad y diferencias de precio.' : 'Yes, you can modify dates, vehicle or additional services with at least 24 hours notice at no charge. Modifications within 24 hours may be subject to availability and price differences.' },
        { q: lang === 'es' ? '¿Cómo cancelo una reserva?' : 'How do I cancel a booking?', a: lang === 'es' ? 'Para cancelar tu reserva contactanos por email o WhatsApp. Cancelaciones con más de 48 hs de anticipación reciben reembolso completo. Dentro de las 48 hs se cobra el 50% del valor total de la reserva.' : 'To cancel your booking contact us by email or WhatsApp. Cancellations more than 48 hours in advance receive a full refund. Within 48 hours, 50% of the total booking value is charged.' },
        { q: lang === 'es' ? '¿Puedo elegir el color o modelo exacto?' : 'Can I choose the exact color or model?', a: lang === 'es' ? 'Ofrecemos el vehículo o uno similar de la misma categoría. En la mayoría de los casos entregaremos exactamente el auto del catálogo, pero en ocasiones por mantenimiento podemos ofrecer un equivalente de igual o superior categoría.' : 'We offer the vehicle or a similar one in the same category. In most cases we will deliver exactly the car from the catalog, but occasionally due to maintenance we may offer an equivalent of the same or higher category.' },
      ],
    },
    {
      category: lang === 'es' ? 'Requisitos y documentación' : 'Requirements & documentation',
      items: [
        { q: lang === 'es' ? '¿Qué documentos necesito para alquilar?' : 'What documents do I need to rent?', a: lang === 'es' ? 'Necesitás: (1) Licencia de conducir válida — si sos extranjero, licencia internacional o del país de origen más pasaporte. (2) Documento de identidad / pasaporte. (3) Tarjeta de crédito a nombre del conductor principal para el depósito de garantía.' : 'You need: (1) Valid driver\'s license — if you\'re a foreigner, international license or from your home country plus passport. (2) Identity document / passport. (3) Credit card in the main driver\'s name for the security deposit.' },
        { q: lang === 'es' ? '¿Cuál es la edad mínima para alquilar?' : 'What is the minimum age to rent?', a: lang === 'es' ? 'La edad mínima es 21 años. Para vehículos de categoría Luxury, Sports y Exotic se requieren 25 años. Los conductores de entre 21 y 24 años abonan un cargo adicional por conductor joven.' : 'The minimum age is 21 years. For Luxury, Sports and Exotic category vehicles, 25 years are required. Drivers between 21 and 24 pay an additional young driver fee.' },
        { q: lang === 'es' ? '¿Puedo agregar conductores adicionales?' : 'Can I add additional drivers?', a: lang === 'es' ? 'Sí, podés agregar hasta 2 conductores adicionales. Cada uno debe presentar su licencia de conducir válida y abonar el cargo de conductor adicional ($15/día). Todos los conductores deben estar presentes en la entrega del vehículo.' : 'Yes, you can add up to 2 additional drivers. Each must present a valid driver\'s license and pay the additional driver fee ($15/day). All drivers must be present at vehicle delivery.' },
        { q: lang === 'es' ? '¿Aceptan licencias de conducir extranjeras?' : 'Do you accept foreign driver\'s licenses?', a: lang === 'es' ? 'Sí, aceptamos licencias de todos los países. Si tu licencia no está en inglés o en caracteres latinos, se recomienda tener también una licencia internacional. Verificamos la validez de todos los documentos.' : 'Yes, we accept licenses from all countries. If your license is not in English or Latin characters, it\'s recommended to also have an international license. We verify the validity of all documents.' },
      ],
    },
    {
      category: lang === 'es' ? 'Vehículos y servicios' : 'Vehicles & services',
      items: [
        { q: lang === 'es' ? '¿Los autos incluyen kilometraje ilimitado?' : 'Do cars include unlimited mileage?', a: lang === 'es' ? 'Sí, todos nuestros vehículos incluyen kilometraje ilimitado en todas las tarifas. No hay cargos sorpresa por distancia recorrida. Podés manejar todo lo que necesites por Florida.' : 'Yes, all our vehicles include unlimited mileage on all rates. There are no surprise charges for distance traveled. You can drive as much as you need throughout Florida.' },
        { q: lang === 'es' ? '¿Puedo llevar el auto a otro estado?' : 'Can I take the car to another state?', a: lang === 'es' ? 'Los vehículos están autorizados para circular en todo el estado de Florida. Para viajes fuera de Florida, se necesita autorización previa — consultanos con anticipación. No está permitido cruzar la frontera a otros países.' : 'Vehicles are authorized to drive throughout the state of Florida. For trips outside Florida, prior authorization is required — consult us in advance. Crossing the border to other countries is not permitted.' },
        { q: lang === 'es' ? '¿Cómo está el auto al momento de la entrega?' : 'What condition is the car in at delivery?', a: lang === 'es' ? 'Todos los vehículos se entregan limpios, revisados mecánicamente y con el tanque lleno (salvo que hayas seleccionado la opción "Sin tanque" en los extras). Se realiza una revisión del estado del vehículo en conjunto con el cliente.' : 'All vehicles are delivered clean, mechanically inspected and with a full tank (unless you selected the "No tank" option in extras). A vehicle condition review is carried out together with the client.' },
        { q: lang === 'es' ? '¿Qué pasa si el auto tiene un problema mecánico?' : 'What if the car has a mechanical problem?', a: lang === 'es' ? 'Llamá a nuestro número de emergencias 24/7 inmediatamente. Si el problema es mecánico y no fue causado por el cliente, gestionamos el reemplazo del vehículo a la mayor brevedad posible sin costo adicional.' : 'Call our 24/7 emergency number immediately. If the problem is mechanical and was not caused by the client, we arrange vehicle replacement as quickly as possible at no additional cost.' },
      ],
    },
    {
      category: lang === 'es' ? 'Seguros y pagos' : 'Insurance & payments',
      items: [
        { q: lang === 'es' ? '¿Qué incluye el seguro básico?' : 'What does basic insurance include?', a: lang === 'es' ? 'El seguro básico cubre daños a terceros (responsabilidad civil) y accidentes graves. No cubre daños al vehículo propio por colisión o robo. Te recomendamos el plan Total para mayor tranquilidad.' : 'Basic insurance covers third-party damages (civil liability) and serious accidents. It does not cover damage to your own vehicle from collision or theft. We recommend the Total plan for greater peace of mind.' },
        { q: lang === 'es' ? '¿Cuánto es el depósito de garantía?' : 'How much is the security deposit?', a: lang === 'es' ? 'El depósito varía según la categoría: Economy/Compact $500, SUV $800, Luxury/Sports $1,500, Exotic $3,000. Se bloquea en tu tarjeta de crédito y se libera dentro de los 3-5 días hábiles tras la devolución del vehículo en perfectas condiciones.' : 'The deposit varies by category: Economy/Compact $500, SUV $800, Luxury/Sports $1,500, Exotic $3,000. It is blocked on your credit card and released within 3-5 business days after returning the vehicle in perfect condition.' },
        { q: lang === 'es' ? '¿Qué métodos de pago aceptan?' : 'What payment methods do you accept?', a: lang === 'es' ? 'Aceptamos tarjetas Visa, Mastercard, American Express, PayPal y criptomonedas (BTC, ETH, USDT). El depósito de garantía debe ser en tarjeta de crédito. No aceptamos efectivo como método de pago principal.' : 'We accept Visa, Mastercard, American Express cards, PayPal and cryptocurrencies (BTC, ETH, USDT). The security deposit must be by credit card. We do not accept cash as the main payment method.' },
        { q: lang === 'es' ? '¿El precio mostrado es el precio final?' : 'Is the displayed price the final price?', a: lang === 'es' ? 'El precio del catálogo es por día de alquiler. El total final incluye los días × tarifa diaria + plan de seguro elegido + extras seleccionados + impuestos aplicables. No hay costos ocultos — el desglose completo se muestra antes de confirmar la reserva.' : 'The catalog price is per rental day. The final total includes days × daily rate + chosen insurance plan + selected extras + applicable taxes. There are no hidden costs — the full breakdown is shown before confirming the booking.' },
      ],
    },
  ];

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
            {t.faq_title}
            <span className="text-[var(--primary)]"> {t.faq_highlight}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {t.faq_sub}
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={t.faq_search_ph}
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
              <p className="text-gray-500">{t.faq_none}</p>
              <button onClick={() => setQuery('')} className="mt-3 text-[var(--primary)] text-sm hover:underline">{t.faq_clear}</button>
            </div>
          )}

          <div className="glass rounded-2xl p-8 border border-[rgba(200,169,110,0.1)] text-center">
            <p className="text-white font-semibold text-lg mb-2">{t.faq_cta_title}</p>
            <p className="text-gray-400 text-sm mb-5">{t.faq_cta_sub}</p>
            <Link href="/contacto" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-block">
              {t.faq_cta_btn}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
