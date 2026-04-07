export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: 'economy' | 'compact' | 'suv' | 'luxury' | 'sports' | 'van';
  pricePerDay: number;
  images: string[];
  passengers: number;
  luggage: number;
  doors: number;
  transmission: 'automatic' | 'manual';
  engine: string;
  fuelType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
  mileage: 'unlimited' | string;
  features: string[];
  description: string;
  available: boolean;
  color: string;
  licensePlate?: string;
  addedAt: string;
  rating: number;
  totalRentals: number;
  revenue: number;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  type: 'airport' | 'office' | 'hotel';
}

export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  coverage: string[];
  recommended?: boolean;
}

export interface Extra {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  icon: string;
  maxQty?: number;
}

export interface Booking {
  id: string;
  carId: string;
  carName: string;
  carImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerDni: string;
  pickupLocation: string;
  returnLocation: string;
  startDate: string;
  endDate: string;
  days: number;
  carPricePerDay: number;
  insurancePlan: InsurancePlan | null;
  extras: { extra: Extra; qty: number }[];
  subtotalCar: number;
  subtotalInsurance: number;
  subtotalExtras: number;
  total: number;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
}

export interface Review {
  id: string;
  carId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}
