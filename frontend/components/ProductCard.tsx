"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiStar, FiShoppingCart, FiCheck, FiHeart } from "react-icons/fi";
import type { Product } from "@/lib/api";
import { useCart } from "@/lib/cartContext";
import { useWishlist } from "@/lib/wishlistContext";
import { useAuth } from "@/lib/authContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggle } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = user ? isInWishlist(product.id) : false;
  const price = Number(product.price);
  const mrp = Number(product.mrp);
  const discount = product.discount_percent;
  const rating = Number(product.rating);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group relative block bg-white border border-gray-100 p-4 transition-shadow hover:shadow-lg"
    >
      {/* Wishlist heart */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (user) toggle(product.id); }}
        className={`absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors ${
          wishlisted ? "text-fk-red" : "text-gray-300 hover:text-fk-red"
        }`}
        title={wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <FiHeart size={16} fill={wishlisted ? "currentColor" : "none"} />
      </button>

      {/* Image */}
      <div className="relative mx-auto mb-3 h-52 w-full overflow-hidden">
        {product.thumbnail ? (
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-contain transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-fk-text-light">
            No Image
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="mb-1 line-clamp-2 text-sm font-medium text-fk-text leading-5 min-h-[40px]">
        {product.name}
      </h3>

      {/* Rating */}
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-sm bg-fk-green px-1.5 py-0.5 text-xs font-semibold text-white">
          {rating.toFixed(1)} <FiStar size={10} fill="white" stroke="white" />
        </span>
        <span className="text-xs font-medium text-fk-text-light">
          ({product.rating_count.toLocaleString()})
        </span>
      </div>

      {/* Price */}
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-base font-bold text-fk-text">
          ₹{price.toLocaleString("en-IN")}
        </span>
        {mrp > price && (
          <>
            <span className="text-sm text-fk-text-light line-through">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
            <span className="text-sm font-medium text-fk-green">
              {discount}% off
            </span>
          </>
        )}
      </div>

      {/* Add to Cart (visible on hover) */}
      <button
        onClick={handleAddToCart}
        className={`mt-3 flex w-full items-center justify-center gap-2 rounded-sm py-2 text-sm font-semibold text-white opacity-0 transition-all group-hover:opacity-100 ${
          added ? "bg-fk-green" : "bg-fk-orange hover:bg-amber-500"
        }`}
      >
        {added ? (
          <><FiCheck size={15} /> Added!</>
        ) : (
          <><FiShoppingCart size={15} /> Add to Cart</>
        )}
      </button>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-gray-100 p-4">
      <div className="mx-auto mb-3 h-52 w-full bg-gray-200 rounded" />
      <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
      <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
      <div className="mb-2 flex items-center gap-2">
        <div className="h-5 w-12 rounded bg-gray-200" />
        <div className="h-4 w-16 rounded bg-gray-200" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-20 rounded bg-gray-200" />
        <div className="h-5 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}
