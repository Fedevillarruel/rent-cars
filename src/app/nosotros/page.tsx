'use client';

import { Shield, Award, TrendingUp, Heart, Star, CheckCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const VALUE_ICONS = [Shield, Award, Heart, TrendingUp];

const TEAM = [
  { name: 'Carlos Mendoza', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Ana Rodríguez', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Marcus Williams', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
];

export default function NosotrosPage() {
  const { t } = useLang();

  const VALUES = [
    { icon: VALUE_ICONS[0], title: t.about_val1_title, description: t.about_val1_desc },
    { icon: VALUE_ICONS[1], title: t.about_val2_title, description: t.about_val2_desc },
    { icon: VALUE_ICONS[2], title: t.about_val3_title, description: t.about_val3_desc },
    { icon: VALUE_ICONS[3], title: t.about_val4_title, description: t.about_val4_desc },
  ];

  const STATS = [
    { value: '15+', label: t.about_stats1 },
    { value: '7', label: t.about_stats2 },
    { value: '4.9★', label: t.about_stats3 },
    { value: '24/7', label: t.about_stats4 },
  ];

  const TEAM_DATA = [
    { ...TEAM[0], role: t.about_role1, bio: t.about_bio1 },
    { ...TEAM[1], role: t.about_role2, bio: t.about_bio2 },
    { ...TEAM[2], role: t.about_role3, bio: t.about_bio3 },
  ];

  const TAGS = [t.about_tag1, t.about_tag2, t.about_tag3, t.about_tag4];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(200,169,110,0.04)] to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-white text-5xl md:text-6xl font-black tracking-tight mb-6">
            {t.about_title1}
            <br />
            <span className="text-[var(--primary)]">MiamiDrive</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t.about_subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white text-3xl font-bold mb-6">{t.about_story_title}</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>{t.about_story1}</p>
                <p>{t.about_story2}</p>
                <p>{t.about_story3}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {TAGS.map(tag => (
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
                <p className="text-gray-500 text-xs">{t.about_reviews}</p>
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
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t.about_values_title}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.about_values_sub}</p>
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
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">{t.about_team_title}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t.about_team_sub}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {TEAM_DATA.map(({ name, role, image, bio }) => (
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
