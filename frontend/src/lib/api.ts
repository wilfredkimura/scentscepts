import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { 
  AuthRequest, AuthResponse, RegisterRequest, 
  BrandDto, ProductDto, ScentOrderDto, PageResponse 
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle 401 — clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: AuthRequest) =>
    api.post<AuthResponse>('/api/v1/auth/login', data),

  register: (data: RegisterRequest) =>
    api.post<AuthResponse>('/api/v1/auth/register', data),

  logout: () =>
    api.post('/api/v1/auth/logout').catch(() => {}),
};

// ── Brands ───────────────────────────────────────────────────────────────────

export const brandsApi = {
  all: (params?: any) => api.get<PageResponse<BrandDto>>('/api/v1/brands', { params }),
  one: (id: string) => api.get<BrandDto>(`/api/v1/brands/${id}`),
};

// ── Products ─────────────────────────────────────────────────────────────────

export const productsApi = {
  all: (params?: any) => api.get<PageResponse<ProductDto>>('/api/v1/products', { params }),
  one: (id: string) => api.get<ProductDto>(`/api/v1/products/${id}`),
};

// ── Orders ───────────────────────────────────────────────────────────────────

export const ordersApi = {
  mine: (params?: any) => api.get<PageResponse<ScentOrderDto>>('/api/v1/scent-orders', { params }),
  create: (data: any) => api.post<ScentOrderDto>('/api/v1/scent-orders', data),
};

// ── Users ────────────────────────────────────────────────────────────────────

export const usersApi = {
  me: () => api.get('/api/v1/profile'),
  all: () => api.get('/api/v1/users'),
  update: (data: unknown) => api.put('/api/v1/profile', data),
  delete: (id: string) => api.delete(`/api/v1/users/${id}`),
};

// ── Generic request helper ───────────────────────────────────────────────────

export async function request<T = unknown>(
  config: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse<T> = await api(config);
  return response.data;
}

export default api;
