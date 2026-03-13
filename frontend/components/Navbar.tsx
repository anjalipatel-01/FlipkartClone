"use client";

import Link from "next/link";
import Image from "next/image";
import { FiMapPin, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "@/lib/cartContext";
import SearchBar from "@/components/navbar/SearchBar";
import UserMenu from "@/components/navbar/UserMenu";
import MoreMenu from "@/components/navbar/MoreMenu";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top row: Logo, Travel, Location */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
        {/* Flipkart logo */}
        <Link href="/" className="flex shrink-0 items-center">
          <Image src="/logo.png" alt="Flipkart" width={130} height={38} priority className="h-auto w-[108px] sm:w-[130px]" />
        </Link>

        {/* Travel */}
        <button className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-fk-text hover:bg-gray-50 sm:flex">
          <span className="text-red-500 text-base">&#9992;</span>
          Travel
        </button>

        <div className="flex-1" />

        {/* Mobile account quick action */}
        <Link
          href="/login"
          className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-fk-text hover:bg-gray-50 sm:hidden"
        >
          <FiUser size={14} />
          Login
        </Link>

        {/* Delivery location */}
        <div className="hidden items-center gap-1.5 text-sm lg:flex">
          <FiMapPin size={16} className="text-fk-text" />
          <span className="font-semibold text-fk-text">Location not set</span>
          <Link href="/profile" className="font-semibold text-fk-blue underline decoration-fk-blue underline-offset-2 hover:text-fk-blue-dark">
            Select delivery location &gt;
          </Link>
        </div>
      </div>

      {/* Bottom row: Search, User, More, Cart */}
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-3 pb-2 sm:gap-3 sm:px-4">
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
          <span className="hidden md:inline">Cart</span>
        </Link>
      </div>
    </header>
  );
}
