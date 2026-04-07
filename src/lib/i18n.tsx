'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'es' | 'en';

export const translations = {
  es: {
    // Nav
    nav_home: 'Inicio',
    nav_catalog: 'Catálogo',
    nav_about: 'Nosotros',
    nav_how: 'Cómo Funciona',
    nav_contact: 'Contacto',
    nav_admin: 'Admin',
    nav_panel: 'Panel Admin',
    nav_book: 'Reservar Ahora',
    // Hero
    hero_title1: 'Maneja Miami',
    hero_title2: 'como mereces',
    hero_subtitle: 'Entrega en el aeropuerto, millas ilimitadas y seguro incluido. La mejor experiencia de alquiler de autos en Miami.',
    hero_pickup: 'FECHA DE RETIRO',
    hero_return: 'FECHA DE DEVOLUCIÓN',
    hero_category: 'CATEGORÍA',
    hero_all: 'Todos los autos',
    hero_search: 'Buscar disponibilidad',
    // Categories
    cat_economy: 'Económico',
    cat_compact: 'Compacto',
    cat_suv: 'SUV',
    cat_luxury: 'Lujo',
    cat_sports: 'Deportivo',
    cat_van: 'Van / Minivan',
    // Features section
    feat_label: '¿Por qué elegirnos?',
    feat_title: 'La experiencia de renta que mereces',
    feat_sub: 'Sin filas, sin sorpresas. Todo lo que necesitás para disfrutar Miami al máximo.',
    feat1_title: 'Flota Amplia',
    feat1_desc: 'Más de 15 vehículos disponibles, desde compactos hasta SUVs y deportivos.',
    feat2_title: 'Entrega en Aeropuerto',
    feat2_desc: 'Recogida y devolución en MIA, FLL y más de 5 puntos estratégicos en Miami.',
    feat3_title: 'Reserva 100% Online',
    feat3_desc: 'Todo desde tu teléfono en menos de 5 minutos. Sin formularios en papel.',
    feat4_title: 'Cobertura Total',
    feat4_desc: 'Planes de seguro desde básico hasta total. Manejá tranquilo en todo momento.',
    feat5_title: 'Soporte 24/7',
    feat5_desc: 'Asistencia real en español e inglés durante todo tu alquiler, los 365 días.',
    feat6_title: 'Sin Sorpresas',
    feat6_desc: 'Precio final visible antes de confirmar. Kilometraje ilimitado incluido siempre.',
    // Fleet section
    fleet_label: 'Nuestra flota',
    fleet_title: 'Autos para cada ocasión',
    fleet_sub: 'Desde el ejecutivo que necesita una berlina hasta el aventurero que quiere un SUV.',
    fleet_cta: 'Ver catálogo completo',
    // How it works
    how_label: 'Simple y rápido',
    how_title: 'Reservá en 4 pasos',
    how_sub: 'Sin complicaciones. Tu auto listo donde y cuando lo necesitás.',
    how1_title: 'Elegí tu auto',
    how1_desc: 'Explorá el catálogo y encontrá el vehículo perfecto para tu viaje.',
    how2_title: 'Seleccioná fechas',
    how2_desc: 'Elegí los días de alquiler y el punto de entrega más conveniente.',
    how3_title: 'Completá el pago',
    how3_desc: 'Reserva segura con tarjeta, PayPal o transferencia.',
    how4_title: '¡A manejar!',
    how4_desc: 'Recibí el auto en perfectas condiciones y disfrutá Miami.',
    // Reviews
    rev_label: 'Testimonios',
    rev_title: 'Lo que dicen nuestros clientes',
    rev1: 'Experiencia increíble. El Tesla Model 3 era perfecto y la atención superó todas mis expectativas. Definitivamente volvería.',
    rev2: 'El BMW X5 era impecable. El proceso de reserva fue súper fácil y el auto nos estaba esperando en MIA cuando llegamos.',
    rev3: 'Alquilamos el Mustang para 3 días y fue LA experiencia de Miami. Atención top, precio justo y sin sorpresas.',
    rev4: 'El Range Rover Sport fue perfecto para el viaje familiar. Espacioso, cómodo y el servicio al cliente es excepcional.',
    // CTA
    cta_title: '¿Listo para manejar Miami?',
    cta_sub: 'Reservá ahora y recibí tu auto en el aeropuerto o donde lo necesitás.',
    cta_btn: 'Ver todos los autos',
    cta_contact: 'Hablar con un asesor',
    // Footer
    footer_explore: 'Explorar',
    footer_company: 'Empresa',
    footer_contact: 'Contacto',
    footer_desc: 'La mejor experiencia de alquiler de autos en Miami. Flota variada, precios claros y entrega donde lo necesités.',
    footer_terms: 'Términos y Condiciones',
    footer_privacy: 'Política de Privacidad',
    footer_rights: 'Todos los derechos reservados.',
    footer_dev: 'Desarrollado por',
    // Catalog
    catalog_title: 'Catálogo de Vehículos',
    catalog_sub: 'Encontrá el auto perfecto para tu aventura en Miami',
    catalog_search: 'Buscar por marca, modelo...',
    catalog_filter: 'Filtros',
    catalog_sort: 'Ordenar',
    catalog_rel: 'Relevancia',
    catalog_asc: 'Precio: menor a mayor',
    catalog_desc: 'Precio: mayor a menor',
    catalog_rating: 'Mejor calificados',
    catalog_clear: 'Limpiar filtros',
    catalog_none: 'No encontramos autos con esos filtros.',
    catalog_day: '/día',
    catalog_book: 'Reservar',
    catalog_detail: 'Ver detalles',
    // Booking
    book_title: 'Reservar',
    book_step1: 'Fechas',
    book_step2: 'Seguro',
    book_step3: 'Extras',
    book_step4: 'Datos',
    book_step5: 'Pago',
    book_next: 'Continuar',
    book_back: 'Atrás',
    book_confirm: 'Confirmar reserva',
    book_total: 'Total',
    book_perday: '/día',
    book_days: 'días',
  },
  en: {
    // Nav
    nav_home: 'Home',
    nav_catalog: 'Catalog',
    nav_about: 'About',
    nav_how: 'How It Works',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    nav_panel: 'Admin Panel',
    nav_book: 'Book Now',
    // Hero
    hero_title1: 'Drive Miami',
    hero_title2: 'like you deserve',
    hero_subtitle: 'Airport delivery, unlimited miles and insurance included. The best car rental experience in Miami.',
    hero_pickup: 'PICKUP DATE',
    hero_return: 'RETURN DATE',
    hero_category: 'CATEGORY',
    hero_all: 'All cars',
    hero_search: 'Check availability',
    // Categories
    cat_economy: 'Economy',
    cat_compact: 'Compact',
    cat_suv: 'SUV',
    cat_luxury: 'Luxury',
    cat_sports: 'Sports',
    cat_van: 'Van / Minivan',
    // Features section
    feat_label: 'Why choose us?',
    feat_title: 'The rental experience you deserve',
    feat_sub: 'No lines, no surprises. Everything you need to enjoy Miami to the fullest.',
    feat1_title: 'Wide Fleet',
    feat1_desc: 'Over 15 vehicles available, from compact cars to SUVs and sports cars.',
    feat2_title: 'Airport Delivery',
    feat2_desc: 'Pickup and return at MIA, FLL and 5+ strategic locations across Miami.',
    feat3_title: '100% Online Booking',
    feat3_desc: 'Everything from your phone in under 5 minutes. No paperwork.',
    feat4_title: 'Full Coverage',
    feat4_desc: 'Insurance plans from basic to full coverage. Drive with peace of mind.',
    feat5_title: '24/7 Support',
    feat5_desc: 'Real assistance in Spanish and English throughout your rental, 365 days.',
    feat6_title: 'No Surprises',
    feat6_desc: 'Final price visible before confirming. Unlimited mileage always included.',
    // Fleet section
    fleet_label: 'Our fleet',
    fleet_title: 'Cars for every occasion',
    fleet_sub: 'From the executive who needs a sedan to the adventurer who wants an SUV.',
    fleet_cta: 'View full catalog',
    // How it works
    how_label: 'Simple and fast',
    how_title: 'Book in 4 steps',
    how_sub: 'No hassle. Your car ready where and when you need it.',
    how1_title: 'Choose your car',
    how1_desc: 'Browse the catalog and find the perfect vehicle for your trip.',
    how2_title: 'Select dates',
    how2_desc: 'Choose rental days and the most convenient delivery point.',
    how3_title: 'Complete payment',
    how3_desc: 'Secure booking with card, PayPal or transfer.',
    how4_title: "Let's drive!",
    how4_desc: 'Receive the car in perfect condition and enjoy Miami.',
    // Reviews
    rev_label: 'Testimonials',
    rev_title: 'What our customers say',
    rev1: 'Incredible experience. The Tesla Model 3 was perfect and the service exceeded all my expectations. Would definitely come back.',
    rev2: 'The BMW X5 was flawless. The booking process was super easy and the car was waiting for us at MIA when we arrived.',
    rev3: 'We rented the Mustang for 3 days and it was THE Miami experience. Top service, fair price, no surprises.',
    rev4: 'The Range Rover Sport was perfect for the family trip. Spacious, comfortable and the customer service is exceptional.',
    // CTA
    cta_title: 'Ready to drive Miami?',
    cta_sub: 'Book now and receive your car at the airport or wherever you need it.',
    cta_btn: 'View all cars',
    cta_contact: 'Talk to an advisor',
    // Footer
    footer_explore: 'Explore',
    footer_company: 'Company',
    footer_contact: 'Contact',
    footer_desc: 'The best car rental experience in Miami. Wide fleet, clear prices and delivery wherever you need it.',
    footer_terms: 'Terms & Conditions',
    footer_privacy: 'Privacy Policy',
    footer_rights: 'All rights reserved.',
    footer_dev: 'Developed by',
    // Catalog
    catalog_title: 'Vehicle Catalog',
    catalog_sub: 'Find the perfect car for your Miami adventure',
    catalog_search: 'Search by brand, model...',
    catalog_filter: 'Filters',
    catalog_sort: 'Sort',
    catalog_rel: 'Relevance',
    catalog_asc: 'Price: low to high',
    catalog_desc: 'Price: high to low',
    catalog_rating: 'Best rated',
    catalog_clear: 'Clear filters',
    catalog_none: 'No cars found with those filters.',
    catalog_day: '/day',
    catalog_book: 'Book',
    catalog_detail: 'View details',
    // Booking
    book_title: 'Book',
    book_step1: 'Dates',
    book_step2: 'Insurance',
    book_step3: 'Extras',
    book_step4: 'Details',
    book_step5: 'Payment',
    book_next: 'Continue',
    book_back: 'Back',
    book_confirm: 'Confirm booking',
    book_total: 'Total',
    book_perday: '/day',
    book_days: 'days',
  },
};

type Translations = typeof translations.es;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LangContext = createContext<LangContextType>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es');

  useEffect(() => {
    const saved = localStorage.getItem('md_lang') as Lang | null;
    if (saved === 'es' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('md_lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
