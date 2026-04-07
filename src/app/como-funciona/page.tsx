import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Calendar, Car, MapPin, CreditCard, Key, CheckCircle, ArrowRight, Clock, Shield, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo Funciona — MiamiDrive',
  description: 'Descubrí lo fácil que es alquilar un auto en Miami con MiamiDrive. Reservá online en minutos y recibí tu vehículo donde lo necesitás.',
};

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Explorá el catálogo',
    description: 'Navegá nuestra flota de más de 15 vehículos. Filtrá por categoría, precio, pasajeros y tipo de combustible para encontrar el auto perfecto para tu viaje.',
    tips: ['Usá los filtros avanzados', 'Compará precios por categoría', 'Leé las reseñas de otros clientes'],
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Seleccioná fechas y ubicación',
    description: 'Elegí las fechas de tu alquiler y el punto de entrega. Ofrecemos servicio en el aeropuerto MIA, FLL, el puerto de Miami y múltiples ubicaciones en la ciudad.',
    tips: ['Disponibilidad en tiempo real', '7 puntos de entrega en Miami', 'Retiro y devolución en distintos puntos'],
  },
  {
    number: '03',
    icon: Shield,
    title: 'Elegí tu seguro y extras',
    description: 'Personalizá tu reserva con el plan de seguro que más te convenga y agregá los servicios adicionales que necesites: GPS, silla infantil, conductor adicional y más.',
    tips: ['4 planes de seguro disponibles', 'Seguro total recomendado', 'Extras opcionales sin compromiso'],
  },
  {
    number: '04',
    icon: CreditCard,
    title: 'Pagá de forma segura',
    description: 'Completá tu reserva con el método de pago que prefieras: tarjeta de crédito/débito, PayPal o transferencia. Tu información siempre está protegida.',
    tips: ['Tarjeta, PayPal o cripto', 'Pago 100% seguro', 'Confirmación inmediata por email'],
  },
  {
    number: '05',
    icon: Key,
    title: 'Retirá y disfrutá',
    description: 'En la fecha acordada, nuestro equipo te entrega el vehículo en el punto elegido. El auto estará impecable, con el tanque lleno y listo para rodar.',
    tips: ['Entrega puntual garantizada', 'Vehículo revisado y limpio', 'Asistencia 24/7 durante el alquiler'],
  },
];

const FAQS = [
  { q: '¿Necesito tarjeta de crédito?', a: 'Aceptamos tarjetas de crédito y débito, PayPal y transferencias. Para el retiro del vehículo se requiere una tarjeta de crédito a nombre del conductor principal para el depósito de garantía.' },
  { q: '¿Qué documentos necesito?', a: 'Licencia de conducir válida (internacional si sos extranjero), pasaporte o documento de identidad, y la tarjeta de crédito. Todos los documentos deben coincidir con el titular de la reserva.' },
  { q: '¿Puedo cambiar o cancelar mi reserva?', a: 'Sí. Las cancelaciones con más de 48 hs de anticipación tienen reembolso completo. Cancelaciones dentro de las 48 hs tienen un cargo del 50%. Podés modificar fechas con al menos 24 hs de anticipación.' },
  { q: '¿Hay kilometraje ilimitado?', a: 'Sí, todos nuestros vehículos incluyen kilometraje ilimitado en la tarifa base. No te sorprenderás con cargos extras por distancia recorrida.' },
  { q: '¿Qué pasa si hay un accidente?', a: 'Contactanos de inmediato al número de emergencias. Si tenés seguro Total o Premium Plus, todos los daños quedan cubiertos. Siempre habrá un agente disponible 24/7.' },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(200,169,110,0.03)] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-6">
            Simple, rápido y
            <br />
            <span className="text-[var(--primary)]">100% online</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Alquilar un auto en Miami nunca fue tan fácil. Sin filas, sin papeles innecesarios, sin sorpresas. Todo desde tu teléfono o computadora.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/catalogo" className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
              Ver catálogo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contacto" className="px-6 py-3 rounded-xl border border-white/15 text-gray-300 font-medium hover:border-white/30 hover:text-white transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> ¿Tenés dudas?
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {STEPS.map(({ number, icon: Icon, title, description, tips }, index) => (
              <div key={number} className="glass rounded-3xl p-8 border border-white/6 card-hover">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <span className="text-[rgba(200,169,110,0.08)] text-7xl font-black leading-none select-none">{number}</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-2xl bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.15)] flex items-center justify-center">
                            <Icon className="w-5 h-5 text-[var(--primary)]" />
                          </div>
                        </div>
                      </div>
                      <h2 className="text-white text-2xl font-bold">{title}</h2>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-base">{description}</p>
                  </div>
                  <div className="md:w-52 shrink-0">
                    <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-3">Datos clave</p>
                    <div className="space-y-2">
                      {tips.map(tip => (
                        <div key={tip} className="flex items-center gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-4 h-4 text-[var(--primary)] shrink-0" />
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="mt-6 flex justify-center">
                    <div className="w-px h-6 bg-gradient-to-b from-[rgba(200,169,110,0.3)] to-transparent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Preguntas frecuentes</h2>
            <p className="text-gray-500">Las dudas más comunes antes de reservar.</p>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="glass rounded-2xl p-6 border border-white/6">
                <h3 className="text-white font-semibold mb-2 flex items-start gap-2">
                  <span className="text-[var(--primary)] shrink-0">Q.</span> {q}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed pl-5">{a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">¿Tenés otra pregunta?</p>
            <Link href="/contacto" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              Contactanos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
