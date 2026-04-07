import { Booking, Car } from './types';
import { CARS, DEMO_BOOKINGS } from './data';

const BOOKINGS_KEY = 'rentcar_bookings';
const CARS_KEY = 'rentcar_cars';
const ADMIN_KEY = 'rentcar_admin_session';
const DEMO_SHOWN_KEY = 'rentcar_demo_shown';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function isBrowser() {
  return typeof window !== 'undefined';
}

// ─── CARS ─────────────────────────────────────────────────────────────────────

export function getCars(): Car[] {
  if (!isBrowser()) return CARS;
  const stored = localStorage.getItem(CARS_KEY);
  if (!stored) {
    localStorage.setItem(CARS_KEY, JSON.stringify(CARS));
    return CARS;
  }
  return JSON.parse(stored);
}

export function saveCars(cars: Car[]) {
  if (!isBrowser()) return;
  localStorage.setItem(CARS_KEY, JSON.stringify(cars));
}

export function addCar(car: Car) {
  const cars = getCars();
  cars.push(car);
  saveCars(cars);
}

export function updateCar(updated: Car) {
  const cars = getCars();
  const idx = cars.findIndex(c => c.id === updated.id);
  if (idx !== -1) {
    cars[idx] = updated;
    saveCars(cars);
  }
}

export function deleteCar(id: string) {
  const cars = getCars().filter(c => c.id !== id);
  saveCars(cars);
}

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────

export function getBookings(): Booking[] {
  if (!isBrowser()) return DEMO_BOOKINGS;
  const stored = localStorage.getItem(BOOKINGS_KEY);
  if (!stored) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(DEMO_BOOKINGS));
    return DEMO_BOOKINGS;
  }
  return JSON.parse(stored);
}

export function saveBookings(bookings: Booking[]) {
  if (!isBrowser()) return;
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Booking) {
  const bookings = getBookings();
  bookings.push(booking);
  saveBookings(bookings);
}

export function updateBookingStatus(id: string, status: Booking['status']) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    saveBookings(bookings);
  }
}

// ─── AVAILABILITY ─────────────────────────────────────────────────────────────

export function getBlockedDates(carId: string): { start: string; end: string }[] {
  const bookings = getBookings().filter(
    b => b.carId === carId && ['confirmed', 'active', 'pending'].includes(b.status)
  );
  return bookings.map(b => ({ start: b.startDate, end: b.endDate }));
}

export function isCarAvailable(carId: string, startDate: string, endDate: string): boolean {
  const blocked = getBlockedDates(carId);
  const start = new Date(startDate);
  const end = new Date(endDate);

  for (const range of blocked) {
    const bs = new Date(range.start);
    const be = new Date(range.end);
    if (start <= be && end >= bs) return false;
  }
  return true;
}

// ─── ADMIN SESSION ────────────────────────────────────────────────────────────

export function loginAdmin(password: string): boolean {
  if (password === 'admin2024') {
    if (isBrowser()) sessionStorage.setItem(ADMIN_KEY, 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn(): boolean {
  if (!isBrowser()) return false;
  return sessionStorage.getItem(ADMIN_KEY) === 'true';
}

export function logoutAdmin() {
  if (isBrowser()) sessionStorage.removeItem(ADMIN_KEY);
}

// ─── DEMO MODAL ───────────────────────────────────────────────────────────────

export function isDemoShown(): boolean {
  if (!isBrowser()) return true;
  return sessionStorage.getItem(DEMO_SHOWN_KEY) === 'true';
}

export function markDemoShown() {
  if (isBrowser()) sessionStorage.setItem(DEMO_SHOWN_KEY, 'true');
}

// ─── RESET DEMO ───────────────────────────────────────────────────────────────

export function resetDemo() {
  if (!isBrowser()) return;
  localStorage.removeItem(BOOKINGS_KEY);
  localStorage.removeItem(CARS_KEY);
  sessionStorage.removeItem(DEMO_SHOWN_KEY);
  window.location.reload();
}

// ─── STATS ────────────────────────────────────────────────────────────────────

export function getStats() {
  const bookings = getBookings();
  const cars = getCars();
  const active = bookings.filter(b => b.status === 'active').length;
  const confirmed = bookings.filter(b => b.status === 'confirmed').length;
  const completed = bookings.filter(b => b.status === 'completed').length;
  const revenue = bookings
    .filter(b => b.paymentStatus === 'paid')
    .reduce((acc, b) => acc + b.total, 0);

  return {
    totalCars: cars.length,
    availableCars: cars.filter(c => c.available).length,
    totalBookings: bookings.length,
    activeBookings: active + confirmed,
    completedBookings: completed,
    totalRevenue: revenue,
  };
}
