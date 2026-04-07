import type { Metadata } from 'next';
import { Shield, Award, MapPin, Users, TrendingUp, Heart, Star, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros — MiamiDrive',
  description: 'Conocé la historia de MiamiDrive, nuestra misión y el equipo detrás de la mejor experiencia de alquiler de autos en Miami.',
};

const VALUES = [
  { icon: Shield, title: 'Confianza total', description: 'Flota verificada, seguros reales y procesos transparentes en cada paso de tu reserva.' },
  { icon: Award, title: 'Experiencia premium', description: 'Vehículos de alta gama mantenidos al día para que viajes con la máxima comodidad y estilo.' },
  { icon: Heart, title: 'Atención real', description: 'Hay personas reales detrás de cada consulta. Tu experiencia es nuestra prioridad absoluta.' },
  { icon: TrendingUp, title: 'Innovación constante', description: 'Plataforma 100% digital, booking en minutos, sin filas ni papelerío innecesario.' },
];

const STATS = [
  { value: '15+', label: 'Vehículos disponibles' },
  { value: '7', label: 'Puntos de entrega en Miami' },
  { value: '4.9★', label: 'Calificación promedio' },
  { value: '24/7', label: 'Atención al cliente' },
];

const TEAM = [
  { name: 'Carlos Mendoza', role: 'CEO & Fundador', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', bio: '12 años en la industria automotriz de Florida.' },
  { name: 'Ana Rodríguez', role: 'Directora de Operaciones', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', bio: 'Experta en logística y gestión de flotas premium.' },
  { name: 'Marcus Williams', role: 'Head of Customer Experience', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', bio: 'Apasionado por transformar cada alquiler en una experiencia memorable.' },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(200,169,110,0.04)] to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[rgba(200,169,110,0.2)] text-[var(--primary)] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Miami, Florida · Desde 2018
          </div>
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-6">
            La historia detrás de
            <br />
            <span className="text-[var(--primary)]">MiamiDrive</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Nacimos con una obsesión simple: que alquilar un auto en Miami sea tan placentero como conducirlo. Sin complicaciones, sin sorpresas, solo la mejor flota y el mejor servicio.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-3xl font-bold mb-6">Cómo empezó todo</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>En 2018, Carlos Mendoza llegó a Miami y quiso alquilar un auto para explorar la ciudad. La experiencia fue frustrante: filas interminables, costos escondidos, autos en mal estado y atención impersonal.</p>
                <p>Ahí nació la idea: crear una empresa de renta de autos donde el cliente sea lo primero. Una flota impecable, precios claros desde el primer clic, y personas reales que se preocupen por tu experiencia.</p>
                <p>Hoy, seis años después, MiamiDrive es la opción preferida de viajeros que buscan comodidad, confianza y estilo en sus recorridos por South Florida.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Fundada en 2018', 'Miami-based', '100% Digital', 'Flota premium'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                    <CheckCircle className="w-3.5 h-3.5 text-[var(--primary)]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80" alt="MiamiDrive fleet" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 border border-[rgba(200,169,110,0.15)]">
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400" />)}
                </div>
                <p className="text-white text-sm font-semibold">4.9 / 5.0</p>
                <p className="text-gray-500 text-xs">+500 reseñas verificadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="glass rounded-2xl p-6 border border-[rgba(200,169,110,0.1)] text-center card-hover">
                <p className="text-[var(--primary)] text-4xl font-black mb-2">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Nuestros valores</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Todo lo que hacemos está guiado por estos principios.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-white/6 card-hover flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.15)] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">El equipo</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Las personas que hacen posible tu experiencia MiamiDrive.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {TEAM.map(({ name, role, image, bio }) => (
              <div key={name} className="glass rounded-2xl p-6 border border-white/6 card-hover text-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 ring-2 ring-[rgba(200,169,110,0.2)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{name}</h3>
                <p className="text-[var(--primary)] text-sm mb-3">{role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
