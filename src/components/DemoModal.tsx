'use client';

import { useState, useEffect } from 'react';
import { X, Zap, Shield, CalendarCheck, MapPin, ExternalLink, ChevronRight } from 'lucide-react';
import { isDemoShown, markDemoShown } from '@/lib/storage';

const STEPS = [
  {
    step: 1,
    icon: <Zap className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Versión Demo del Proyecto',
    subtitle: 'MiamiDrive — Car Rental Platform',
    description: (
      <>
        Esta es una <strong className="text-white">demostración técnica funcional</strong> diseñada para explorar la plataforma de alquiler de autos en Miami.
      </>
    ),
    highlights: [
      'Los datos mostrados son ilustrativos y editables',
      'Toda la configuración es personalizable',
      'La versión final operará con Supabase y pagos reales',
    ],
    customizable: [
      'Catálogo y precios', 'Gestión de reservas',
      'Pasarelas de pago', 'Roles y permisos',
      'Diseño y branding', 'Integraciones externas',
    ],
    tip: 'Explorá libremente el sistema. Todos los cambios se guardan en tu navegador y podés resetear la demo en cualquier momento.',
    btn: 'Siguiente →',
  },
  {
    step: 2,
    icon: <Shield className="w-6 h-6 text-[var(--primary)]" />,
    title: 'Accesos Demo Disponibles',
    subtitle: 'Probá la plataforma con accesos demo',
    description: 'Al hacer clic en el botón de admin vas a poder explorar el panel de administración completo:',
    users: [
      {
        icon: <CalendarCheck className="w-5 h-5 text-[var(--primary)]" />,
        name: 'Usuario Visitante',
        desc: 'Explorá el catálogo, cotizá vehículos y simulá una reserva completa con pagos.',
      },
      {
        icon: <Shield className="w-5 h-5 text-[var(--primary)]" />,
        name: 'Demo Admin',
        desc: 'Accedé como administrador con gestión completa: panel de control, autos, reservas, métricas y más.',
        badge: 'admin2024',
      },
    ],
    tip: 'Hacé clic en "Admin" en el header e ingresá la contraseña de demo para explorar el panel completo.',
    btn: 'Entendido, explorar demo',
  },
];

export default function DemoModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isDemoShown()) {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    markDemoShown();
    setVisible(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleClose();
    }
  };

  if (!visible) return null;

  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-[9999] modal-overlay flex items-center justify-center p-4">
      <div className="relative w-full max-w-md glass-dark rounded-2xl shadow-2xl overflow-hidden animate-fade-up">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Header */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(200,169,110,0.15)] border border-[rgba(200,169,110,0.2)] flex items-center justify-center">
              {current.icon}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{current.title}</h2>
              <p className="text-gray-400 text-sm">{current.subtitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step dots */}
        <div className="px-6 pt-3 flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-[var(--primary)]' : 'bg-white/15'
              } ${i === step ? 'w-6' : 'w-3'}`}
            />
          ))}
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed">{current.description}</p>

          {/* Step 1 content */}
          {step === 0 && (
            <>
              <div className="rounded-xl bg-white/3 border border-white/8 p-4 space-y-2">
                {current.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <span className="text-yellow-400 text-base">⚡</span>
                    {h}
                  </div>
                ))}
              </div>

              <div>
                <p className="text-white text-sm font-semibold mb-3">Elementos Personalizables</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {current.customizable?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2 content */}
          {step === 1 && (
            <div className="space-y-3">
              {current.users?.map((user, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/3 border border-white/8 hover:border-[rgba(200,169,110,0.2)] transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-[rgba(200,169,110,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {user.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-semibold">{user.name}</p>
                      {user.badge && (
                        <code className="px-2 py-0.5 rounded-md bg-[rgba(200,169,110,0.15)] text-[var(--primary)] text-xs font-mono">
                          {user.badge}
                        </code>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{user.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tip */}
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[rgba(200,169,110,0.06)] border border-[rgba(200,169,110,0.12)]">
            <span className="text-base">💡</span>
            <p className="text-gray-400 text-xs leading-relaxed">
              <strong className="text-[var(--primary)]">Tip:</strong>{' '}
              {current.tip}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleNext}
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            {current.btn}
          </button>

          {/* Footer */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <span className="text-[11px] text-gray-600 tracking-widest uppercase font-medium">
              Desarrollado por
            </span>
            <a
              href="https://fedini.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] text-[var(--primary)] font-semibold hover:text-[var(--primary-light)] transition-colors tracking-wide"
            >
              ◆ Fedini
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
