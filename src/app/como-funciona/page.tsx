'use client';

import Link from 'next/link';
import { Search, Calendar, Shield, CreditCard, Key, CheckCircle, ArrowRight, Phone } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const STEP_ICONS = [Search, Calendar, Shield, CreditCard, Key];
const STEP_NUMBERS = ['01', '02', '03', '04', '05'];

export default function ComoFuncionaPage() {
  const { t } = useLang();

  const STEPS = [
    { number: STEP_NUMBERS[0], icon: STEP_ICONS[0], title: t.how_s1_title, description: t.how_s1_desc, tips: [t.how_s1_t1, t.how_s1_t2, t.how_s1_t3] },
    { number: STEP_NUMBERS[1], icon: STEP_ICONS[1], title: t.how_s2_title, description: t.how_s2_desc, tips: [t.how_s2_t1, t.how_s2_t2, t.how_s2_t3] },
    { number: STEP_NUMBERS[2], icon: STEP_ICONS[2], title: t.how_s3_title, description: t.how_s3_desc, tips: [t.how_s3_t1, t.how_s3_t2, t.how_s3_t3] },
    { number: STEP_NUMBERS[3], icon: STEP_ICONS[3], title: t.how_s4_title, description: t.how_s4_desc, tips: [t.how_s4_t1, t.how_s4_t2, t.how_s4_t3] },
    { number: STEP_NUMBERS[4], icon: STEP_ICONS[4], title: t.how_s5_title, description: t.how_s5_desc, tips: [t.how_s5_t1, t.how_s5_t2, t.how_s5_t3] },
  ];

  const FAQS = [
    { q: t.how_faq1_q, a: t.how_faq1_a },
    { q: t.how_faq2_q, a: t.how_faq2_a },
    { q: t.how_faq3_q, a: t.how_faq3_a },
    { q: t.how_faq4_q, a: t.how_faq4_a },
    { q: t.how_faq5_q, a: t.how_faq5_a },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(200,169,110,0.03)] to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-6">
            {t.how_page_title1}
            <br />
            <span className="text-[var(--primary)]">{t.how_page_title2}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.how_page_sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/catalogo" className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
              {t.how_page_catalog} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contacto" className="px-6 py-3 rounded-xl border border-white/15 text-gray-300 font-medium hover:border-white/30 hover:text-white transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" /> {t.how_page_questions}
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
                    <p className="text-gray-600 text-xs font-medium uppercase tracking-wide mb-3">{t.how_page_keydata}</p>
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
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t.how_page_faq_title}</h2>
            <p className="text-gray-500">{t.how_page_faq_sub}</p>
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
            <p className="text-gray-500 mb-4">{t.how_page_more_q}</p>
            <Link href="/contacto" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              {t.how_page_contact} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
