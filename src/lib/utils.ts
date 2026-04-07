import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function daysBetween(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  const diff = e.getTime() - s.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

export function today(): string {
  return new Date().toISOString().split('T')[0];
}

export function tomorrow(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
}

export function getCategoryLabel(cat: string): string {
  const map: Record<string, string> = {
    economy: 'Económico',
    compact: 'Compacto',
    suv: 'SUV',
    luxury: 'Lujo',
    sports: 'Deportivo',
    van: 'Van / Minivan',
  };
  return map[cat] ?? cat;
}

export function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    economy: 'bg-green-900/40 text-green-400 border-green-800',
    compact: 'bg-blue-900/40 text-blue-400 border-blue-800',
    suv: 'bg-amber-900/40 text-amber-400 border-amber-800',
    luxury: 'bg-purple-900/40 text-purple-400 border-purple-800',
    sports: 'bg-red-900/40 text-red-400 border-red-800',
    van: 'bg-teal-900/40 text-teal-400 border-teal-800',
  };
  return map[cat] ?? 'bg-gray-900/40 text-gray-400 border-gray-800';
}
