import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  withCredentials: true,
});

export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  price: string;
  mrp: string;
  discount_percent: number;
  stock: number;
  rating: string;
  rating_count: number;
  is_featured: boolean;
  created_at: string;
  category_id: number;
  category_name: string;
  category_slug: string;
  thumbnail: string | null;
  description?: string;
  images?: { id: number; image_url: string; display_order: number }[];
  specs?: { id: number; spec_key: string; spec_value: string }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const getProducts = (params?: {
  search?: string;
  category?: string;
  sort?: string;
  minRating?: number;
  limit?: number;
}) => api.get<ApiResponse<Product[]>>("/api/products", { params });

export const getProductById = (id: number) =>
  api.get<ApiResponse<Product>>(`/api/products/${id}`);

export const getCategories = () =>
  api.get<ApiResponse<Category[]>>("/api/categories");

/* ─── Auth ─── */
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  gender: string | null;
  created_at?: string;
}

export const loginUser = (email: string, password: string) =>
  api.post<ApiResponse<User>>("/api/auth/login", { email, password });

export const registerUser = (data: { name: string; email: string; password: string; phone?: string }) =>
  api.post<ApiResponse<User>>("/api/auth/register", data);

export const logoutUser = () =>
  api.post<ApiResponse<null>>("/api/auth/logout");

export const getMe = () =>
  api.get<ApiResponse<User>>("/api/auth/me");

export const updateProfile = (data: { name?: string; phone?: string; gender?: string }) =>
  api.put<ApiResponse<User>>("/api/auth/me", data);

/* ─── Orders ─── */
export interface ShippingData {
  items: { product_id: number; quantity: number }[];
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  shipping_name: string | null;
  shipping_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_pincode: string | null;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  brand: string;
  quantity: number;
  unit_price: string;
  total_price: string;
  thumbnail: string | null;
}

export const placeOrder = (data: ShippingData) =>
  api.post<ApiResponse<Order>>("/api/orders", data);

export const getOrders = () =>
  api.get<ApiResponse<Order[]>>("/api/orders");

export const getOrderById = (id: number) =>
  api.get<ApiResponse<Order>>(`/api/orders/${id}`);

/* ─── Wishlist ─── */
export interface WishlistItem {
  id: number;
  created_at: string;
  product_id: number;
  product_name: string;
  brand: string;
  price: string;
  mrp: string;
  discount_percent: number;
  stock: number;
  rating: string;
  thumbnail: string | null;
}

export const getWishlist = () =>
  api.get<ApiResponse<WishlistItem[]>>("/api/wishlist");

export const addToWishlist = (product_id: number) =>
  api.post<ApiResponse<WishlistItem[]>>("/api/wishlist", { product_id });

export const removeFromWishlist = (product_id: number) =>
  api.delete<ApiResponse<null>>(`/api/wishlist/${product_id}`);

export default api;
