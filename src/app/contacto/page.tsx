'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

export default function ContactoPage() {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('reserva');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const LOCATIONS = [
    { name: t.contact_loc1_name, address: 'MIA Terminal E, Miami, FL 33142', hours: t.contact_loc1_hours },
    { name: t.contact_loc2_name, address: '1234 Collins Ave, Miami Beach, FL 33139', hours: t.contact_loc2_hours },
    { name: t.contact_loc3_name, address: '701 S Miami Ave, Miami, FL 33130', hours: t.contact_loc3_hours },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-4">
            {t.contact_title1}
            <span className="text-[var(--primary)]"> {t.contact_title2}</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.contact_sub}
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="py-8 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick contact */}
              <div className="glass rounded-2xl p-6 border border-[rgba(200,169,110,0.1)] space-y-4">
                <h2 className="text-white font-bold text-lg mb-4">{t.contact_direct}</h2>
                {[
                  { icon: Phone, label: t.contact_phone_label, value: '+1 (305) 555-0192', href: 'tel:+13055550192' },
                  { icon: Mail, label: t.contact_email_label, value: 'hola@miamidrive.com', href: 'mailto:hola@miamidrive.com' },
                  { icon: MessageSquare, label: t.contact_wa_label, value: t.contact_wa_value, href: 'https://wa.me/13055550192' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(200,169,110,0.1)] border border-[rgba(200,169,110,0.15)] flex items-center justify-center shrink-0 group-hover:bg-[rgba(200,169,110,0.15)] transition-colors">
                      <Icon className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{label}</p>
                      <p className="text-white text-sm font-medium group-hover:text-[var(--primary)] transition-colors">{value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div className="glass rounded-2xl p-6 border border-white/6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-[var(--primary)]" />
                  <h2 className="text-white font-bold">{t.contact_hours_title}</h2>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: t.contact_h1_day, hours: '8:00 AM – 8:00 PM' },
                    { day: t.contact_h2_day, hours: '9:00 AM – 6:00 PM' },
                    { day: t.contact_h3_day, hours: '10:00 AM – 4:00 PM' },
                    { day: t.contact_h4_day, hours: '24 / 7' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-500">{day}</span>
                      <span className="text-gray-300 font-medium">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="glass rounded-2xl p-6 border border-white/6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[var(--primary)]" />
                  <h2 className="text-white font-bold">{t.contact_locations_title}</h2>
                </div>
                <div className="space-y-4">
                  {LOCATIONS.map(({ name: locName, address, hours }) => (
                    <div key={locName} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <p className="text-white text-sm font-semibold mb-1">{locName}</p>
                      <p className="text-gray-500 text-xs mb-1">{address}</p>
                      <p className="text-gray-600 text-xs">{hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-3xl p-8 border border-[rgba(200,169,110,0.08)]">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-900/20 border border-green-800/40 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-7 h-7 text-green-400" />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2">{t.contact_sent_title}</h3>
                    <p className="text-gray-400">{t.contact_sent_sub}</p>
                    <button onClick={() => setSent(false)} className="mt-6 px-5 py-2.5 rounded-xl border border-white/15 text-gray-400 text-sm hover:text-white hover:border-white/30 transition-all">
                      {t.contact_sent_btn}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-white text-2xl font-bold mb-1">{t.contact_form_title}</h2>
                      <p className="text-gray-500 text-sm">{t.contact_form_sub}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t.contact_name}</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.contact_name_ph} required
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t.contact_phone}</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 305..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t.contact_email_label}</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors" />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t.contact_subject}</label>
                      <select value={subject} onChange={e => setSubject(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[var(--primary)] transition-colors">
                        <option value="reserva" className="bg-[#111]">{t.contact_subj1}</option>
                        <option value="disponibilidad" className="bg-[#111]">{t.contact_subj2}</option>
                        <option value="modificacion" className="bg-[#111]">{t.contact_subj3}</option>
                        <option value="presupuesto" className="bg-[#111]">{t.contact_subj4}</option>
                        <option value="otro" className="bg-[#111]">{t.contact_subj5}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">{t.contact_message}</label>
                      <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder={t.contact_message_ph} required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[var(--primary)] transition-colors resize-none" />
                    </div>

                    <button type="submit" className="w-full btn-primary py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" /> {t.contact_send}
                    </button>

                    <p className="text-gray-600 text-xs text-center">
                      {t.contact_legal}{' '}
                      <a href="/terminos" className="text-gray-500 hover:text-[var(--primary)] transition-colors">{t.footer_terms}</a>{' '}
                      {t.contact_legal_and}{' '}
                      <a href="/privacidad" className="text-gray-500 hover:text-[var(--primary)] transition-colors">{t.footer_privacy}</a>.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
