"use client";

import Link from "next/link";
import { FiMapPin, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/lib/cartContext";
import SearchBar from "@/components/navbar/SearchBar";
import UserMenu from "@/components/navbar/UserMenu";
import MoreMenu from "@/components/navbar/MoreMenu";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top row: Logo, Travel, Location */}
      <div className="mx-auto flex h-12 max-w-[1400px] items-center gap-4 px-4">
        {/* Flipkart logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <div className="flex items-center gap-2 rounded-lg bg-fk-yellow px-4 py-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8 6h-3.6v3.36l-2.18-2.67H7.2l3.37 5.57L7.2 17.83h2.82l2.18-2.67v2.67h3.6v-3.58L13.38 12.3l2.42-2.43V6z" fill="#2874f0" />
            </svg>
            <span className="text-base font-bold italic text-fk-blue">Flipkart</span>
          </div>
        </Link>

        {/* Travel */}
        <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-fk-text hover:bg-gray-50">
          <span className="text-red-500 text-base">&#9992;</span>
          Travel
        </button>

        <div className="flex-1" />

        {/* Delivery location */}
        <div className="hidden items-center gap-1.5 text-sm sm:flex">
          <FiMapPin size={16} className="text-fk-text" />
          <span className="font-semibold text-fk-text">Location not set</span>
          <Link href="/profile" className="font-semibold text-fk-blue underline decoration-fk-blue underline-offset-2 hover:text-fk-blue-dark">
            Select delivery location &gt;
          </Link>
        </div>
      </div>

      {/* Bottom row: Search, User, More, Cart */}
      <div className="mx-auto flex h-12 max-w-[1400px] items-center gap-4 px-4 pb-1">
        <SearchBar />
        <UserMenu />
        <MoreMenu />

        {/* Cart */}
        <Link
          href="/cart"
          className="relative flex items-center gap-1.5 text-sm font-medium text-fk-text hover:text-fk-blue"
        >
          <div className="relative">
            <FiShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-fk-red text-[10px] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">Cart</span>
        </Link>
      </div>
    </header>
  );
}
