import type { ReactNode } from "react";

export type CategoryKey =
  | "for-you"
  | "fashion"
  | "mobiles"
  | "beauty"
  | "electronics"
  | "home-kitchen"
  | "appliances"
  | "toys"
  | "food"
  | "auto-accessories"
  | "two-wheelers"
  | "sports"
  | "books"
  | "furniture";

export interface CategoryItem {
  name: string;
  slug: string;
  key: CategoryKey;
}

export const CATEGORY_ICONS: Record<CategoryKey, ReactNode> = {
  "for-you": (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="8" y="14" width="32" height="28" rx="3" fill="#f5f5f5" stroke="#333" />
      <path d="M16 14V10a8 8 0 0116 0v4" stroke="#333" strokeWidth="2.5" />
      <circle cx="24" cy="28" r="4" fill="#333" stroke="none" />
    </svg>
  ),
  fashion: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <path d="M18 6l-8 8v28h28V14l-8-8H18z" fill="#f5f5f5" stroke="#333" />
      <path d="M18 6c0 4 2.7 6 6 6s6-2 6-6" stroke="#333" strokeWidth="2.5" fill="none" />
      <line x1="24" y1="22" x2="24" y2="36" stroke="#333" strokeWidth="1.5" />
      <line x1="18" y1="29" x2="30" y2="29" stroke="#333" strokeWidth="1.5" />
    </svg>
  ),
  mobiles: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="14" y="4" width="20" height="40" rx="3" fill="#f5f5f5" stroke="#333" />
      <line x1="14" y1="12" x2="34" y2="12" stroke="#333" />
      <line x1="14" y1="36" x2="34" y2="36" stroke="#333" />
      <circle cx="24" cy="40" r="1.5" fill="#333" stroke="none" />
    </svg>
  ),
  beauty: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <path d="M20 8h8v10l4 4v16a4 4 0 01-4 4h-8a4 4 0 01-4-4V22l4-4V8z" fill="#f5f5f5" stroke="#333" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="#333" />
      <circle cx="24" cy="32" r="4" fill="#333" stroke="none" opacity="0.2" />
    </svg>
  ),
  electronics: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="6" y="8" width="36" height="24" rx="2" fill="#f5f5f5" stroke="#333" />
      <line x1="16" y1="36" x2="32" y2="36" stroke="#333" strokeWidth="2.5" />
      <line x1="24" y1="32" x2="24" y2="36" stroke="#333" />
      <rect x="10" y="12" width="28" height="16" rx="1" fill="none" stroke="#333" strokeWidth="1" />
    </svg>
  ),
  "home-kitchen": (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="10" y="20" width="28" height="22" rx="2" fill="#f5f5f5" stroke="#333" />
      <path d="M6 22L24 6l18 16" fill="none" stroke="#333" strokeWidth="2.5" />
      <rect x="20" y="30" width="8" height="12" fill="none" stroke="#333" />
    </svg>
  ),
  appliances: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="12" y="6" width="24" height="36" rx="3" fill="#f5f5f5" stroke="#333" />
      <line x1="12" y1="16" x2="36" y2="16" stroke="#333" />
      <circle cx="24" cy="30" r="6" fill="none" stroke="#333" strokeWidth="2" />
      <circle cx="24" cy="30" r="2" fill="#333" stroke="none" />
      <circle cx="18" cy="11" r="1.5" fill="#333" stroke="none" />
    </svg>
  ),
  toys: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <circle cx="20" cy="18" r="8" fill="#f5f5f5" stroke="#333" />
      <circle cx="32" cy="22" r="6" fill="#f5f5f5" stroke="#333" />
      <ellipse cx="24" cy="36" rx="14" ry="6" fill="#f5f5f5" stroke="#333" />
      <circle cx="17" cy="16" r="1.5" fill="#333" stroke="none" />
      <circle cx="23" cy="16" r="1.5" fill="#333" stroke="none" />
    </svg>
  ),
  food: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <ellipse cx="24" cy="32" rx="16" ry="8" fill="#f5f5f5" stroke="#333" />
      <path d="M8 32c0-12 7-22 16-22s16 10 16 22" fill="none" stroke="#333" strokeWidth="2" />
      <circle cx="20" cy="24" r="2" fill="#333" stroke="none" />
      <circle cx="28" cy="22" r="2" fill="#333" stroke="none" />
      <circle cx="24" cy="28" r="1.5" fill="#333" stroke="none" />
    </svg>
  ),
  "auto-accessories": (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="6" y="18" width="36" height="14" rx="4" fill="#f5f5f5" stroke="#333" />
      <circle cx="14" cy="36" r="4" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <circle cx="34" cy="36" r="4" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <path d="M12 18l4-8h16l4 8" fill="none" stroke="#333" strokeWidth="2" />
      <line x1="20" y1="10" x2="20" y2="18" stroke="#333" strokeWidth="1.5" />
      <line x1="28" y1="10" x2="28" y2="18" stroke="#333" strokeWidth="1.5" />
    </svg>
  ),
  "two-wheelers": (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <circle cx="12" cy="34" r="6" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <circle cx="36" cy="34" r="6" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <path d="M12 34l8-14h8l4 6 4-6" fill="none" stroke="#333" strokeWidth="2.5" />
      <path d="M20 20l-4-6h6" fill="none" stroke="#333" strokeWidth="2" />
    </svg>
  ),
  sports: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <circle cx="24" cy="24" r="14" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
      <path d="M10 24c4-6 10-8 14-8s10 2 14 8" fill="none" stroke="#333" strokeWidth="1.5" />
      <path d="M10 24c4 6 10 8 14 8s10-2 14-8" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="24" y1="10" x2="24" y2="38" stroke="#333" strokeWidth="1.5" />
    </svg>
  ),
  books: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="8" y="8" width="14" height="32" rx="1" fill="#f5f5f5" stroke="#333" />
      <rect x="24" y="6" width="16" height="34" rx="1" fill="#f5f5f5" stroke="#333" />
      <line x1="24" y1="12" x2="36" y2="12" stroke="#333" strokeWidth="1.5" />
      <line x1="24" y1="18" x2="36" y2="18" stroke="#333" strokeWidth="1.5" />
      <line x1="24" y1="24" x2="36" y2="24" stroke="#333" strokeWidth="1.5" />
    </svg>
  ),
  furniture: (
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" stroke="#333" strokeWidth="2">
      <rect x="10" y="16" width="28" height="4" rx="2" fill="#f5f5f5" stroke="#333" />
      <rect x="12" y="20" width="24" height="10" rx="2" fill="#f5f5f5" stroke="#333" />
      <line x1="14" y1="30" x2="14" y2="38" stroke="#333" strokeWidth="2.5" />
      <line x1="34" y1="30" x2="34" y2="38" stroke="#333" strokeWidth="2.5" />
      <path d="M8 20c0-2 2-8 6-8" fill="none" stroke="#333" strokeWidth="2" />
      <path d="M40 20c0-2-2-8-6-8" fill="none" stroke="#333" strokeWidth="2" />
    </svg>
  ),
};

export const CATEGORY_ITEMS: CategoryItem[] = [
  { name: "For You", slug: "", key: "for-you" },
  { name: "Fashion", slug: "fashion", key: "fashion" },
  { name: "Mobiles", slug: "mobiles", key: "mobiles" },
  { name: "Beauty", slug: "beauty", key: "beauty" },
  { name: "Electronics", slug: "electronics", key: "electronics" },
  { name: "Home", slug: "home-kitchen", key: "home-kitchen" },
  { name: "Appliances", slug: "appliances", key: "appliances" },
  { name: "Toys, ba...", slug: "toys", key: "toys" },
  { name: "Food & H...", slug: "food", key: "food" },
  { name: "Auto Acc...", slug: "auto-accessories", key: "auto-accessories" },
  { name: "2 Wheele...", slug: "two-wheelers", key: "two-wheelers" },
  { name: "Sports & ...", slug: "sports", key: "sports" },
  { name: "Books & ...", slug: "books", key: "books" },
  { name: "Furniture", slug: "furniture", key: "furniture" },
];

export function getCategoryHref(slug: string) {
  return slug ? `/products?category=${slug}` : "/";
}