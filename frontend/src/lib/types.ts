// ── Shared DTOs mirroring the Spring Boot backend for scentcepts ──────

export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UserDto {
  id: string; // UUID
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  address?: string;
  roles: string[];
  createdAt: string;
}

export interface BrandDto {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface ProductDto {
  id: string;
  name: string;
  description?: string;
  topNotes?: string;
  middleNotes?: string;
  baseNotes?: string;
  decantPrice: number;
  fullBottlePrice: number;
  imageUrl?: string;
  stockQuantity: number;
  availability: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
  brand: BrandDto;
}

export interface OrderItemDto {
  id: string;
  size: string;
  quantity: number;
  priceAtPurchase: number;
  product: ProductDto;
}

export interface ScentOrderDto {
  id: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  deliveryAddress: string;
  user: UserDto;
  items: OrderItemDto[];
  createdAt: string;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
