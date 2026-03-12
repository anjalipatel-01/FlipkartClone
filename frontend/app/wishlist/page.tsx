"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiHeart, FiShoppingCart, FiStar, FiTrash2, FiChevronRight } from "react-icons/fi";
import { useAuth } from "@/lib/authContext";
import { useWishlist } from "@/lib/wishlistContext";
import { useCart } from "@/lib/cartContext";
import type { Product } from "@/lib/api";

export default function WishlistPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, loading, toggle } = useWishlist();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-4 py-24">
        <FiHeart size={48} className="text-gray-300" />
        <p className="text-lg font-semibold text-fk-text">Please login to view your wishlist</p>
        <Link href="/login" className="rounded-sm bg-fk-orange px-8 py-3 text-sm font-bold text-white hover:bg-amber-500">
          Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-fk-bg">
        <div className="mx-auto max-w-[1400px] px-4 py-6">
          <div className="mb-4 h-8 w-48 animate-pulse rounded bg-white" />
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 animate-pulse rounded-sm bg-white" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-fk-bg">
        <div className="bg-white border-b border-gray-100">
          <nav className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-2.5 text-xs text-fk-text-light">
            <Link href="/" className="hover:text-fk-blue">Home</Link>
            <FiChevronRight size={11} />
            <span className="font-medium text-fk-text">My Wishlist</span>
          </nav>
        </div>
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-4 py-24">
          <FiHeart size={48} className="text-gray-300" />
          <p className="text-lg font-semibold text-fk-text">Your wishlist is empty</p>
          <p className="text-sm text-fk-text-light">Add items that you like to your wishlist</p>
          <Link href="/products" className="rounded-sm bg-fk-blue px-8 py-3 text-sm font-bold text-white hover:bg-blue-600">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  const handleMoveToCart = (item: typeof items[0]) => {
    // Build a minimal Product-shaped object for addToCart
    const product = {
      id: item.product_id,
      name: item.product_name,
      brand: item.brand,
      price: item.price,
      mrp: item.mrp,
      discount_percent: item.discount_percent,
      stock: item.stock,
      thumbnail: item.thumbnail,
    } as Product;
    addToCart(product);
    toggle(item.product_id);
  };

  return (
    <div className="min-h-screen bg-fk-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <nav className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-2.5 text-xs text-fk-text-light">
          <Link href="/" className="hover:text-fk-blue">Home</Link>
          <FiChevronRight size={11} />
          <span className="font-medium text-fk-text">My Wishlist</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Header */}
        <div className="mb-4 rounded-sm bg-white px-4 py-3 shadow-sm">
          <h1 className="text-lg font-semibold text-fk-text">
            My Wishlist ({items.length})
          </h1>
        </div>

        {/* Items */}
        <div className="grid gap-3">
          {items.map((item) => {
            const price = Number(item.price);
            const mrp = Number(item.mrp);
            const rating = Number(item.rating);
            const inStock = item.stock > 0;

            return (
              <div key={item.id} className="flex gap-4 rounded-sm bg-white p-4 shadow-sm sm:gap-6">
                {/* Image */}
                <Link
                  href={`/products/${item.product_id}`}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded border border-gray-100 sm:h-36 sm:w-36"
                >
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.product_name}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs text-gray-300">
                      No Image
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link href={`/products/${item.product_id}`} className="group">
                    <h3 className="mb-1 line-clamp-2 text-sm font-medium text-fk-text group-hover:text-fk-blue sm:text-base">
                      {item.product_name}
                    </h3>
                  </Link>

                  <p className="mb-1.5 text-xs text-fk-text-light">{item.brand}</p>

                  {/* Rating */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-sm bg-fk-green px-1.5 py-0.5 text-xs font-semibold text-white">
                      {rating.toFixed(1)} <FiStar size={10} fill="white" stroke="white" />
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-base font-bold text-fk-text sm:text-lg">
                      ₹{price.toLocaleString("en-IN")}
                    </span>
                    {mrp > price && (
                      <>
                        <span className="text-sm text-fk-text-light line-through">
                          ₹{mrp.toLocaleString("en-IN")}
                        </span>
                        <span className="text-sm font-medium text-fk-green">
                          {item.discount_percent}% off
                        </span>
                      </>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-wrap gap-2">
                    {inStock ? (
                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1.5 rounded-sm bg-fk-orange px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 sm:text-sm"
                      >
                        <FiShoppingCart size={14} />
                        Move to Cart
                      </button>
                    ) : (
                      <span className="rounded-sm bg-gray-100 px-4 py-2 text-xs font-medium text-gray-400 sm:text-sm">
                        Out of Stock
                      </span>
                    )}
                    <button
                      onClick={() => toggle(item.product_id)}
                      className="flex items-center gap-1.5 rounded-sm border border-gray-300 px-4 py-2 text-xs font-medium text-fk-text-light hover:border-red-300 hover:text-fk-red sm:text-sm"
                    >
                      <FiTrash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
