"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiHeart, FiLogOut, FiPackage, FiUser } from "react-icons/fi";
import { useAuth } from "@/lib/authContext";
import { useWishlist } from "@/lib/wishlistContext";

export default function UserMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (user) {
    return (
      <div className="relative hidden sm:block" ref={ref}>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-sm font-medium text-fk-blue hover:text-fk-blue"
        >
          Flipkart
          <FiChevronDown size={14} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-2 w-60 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
            <div className="border-b border-gray-100 px-4 pb-2">
              <p className="text-sm font-semibold text-fk-text">{user.name}</p>
              <p className="text-xs text-fk-text-light">{user.email}</p>
            </div>
            <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
              <FiUser size={18} className="text-fk-blue" />
              My Profile
            </Link>
            <Link href="/wishlist" onClick={() => setOpen(false)} className="flex items-center justify-between px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
              <span className="flex items-center gap-3">
                <FiHeart size={18} className="text-fk-blue" />
                Wishlist
              </span>
              {wishlistItems.length > 0 && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-fk-text-light">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <Link href="/orders" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
              <FiPackage size={18} className="text-fk-blue" />
              Orders
            </Link>
            <div className="border-t border-gray-100">
              <button
                onClick={async () => { setOpen(false); await logout(); router.push("/"); }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-fk-red hover:bg-gray-50"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative hidden sm:block" ref={ref}>
      <div className="flex items-center">
        <Link href="/login" className="flex items-center gap-1.5 text-sm font-medium text-fk-text hover:text-fk-blue">
          <FiUser size={18} />
          Login
        </Link>
        <button onClick={() => setOpen((o) => !o)} className="ml-0.5 p-0.5 text-fk-text hover:text-fk-blue">
          <FiChevronDown size={14} />
        </button>
      </div>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 pb-2">
            <span className="text-sm text-fk-text">New customer?</span>
            <Link href="/signup" onClick={() => setOpen(false)} className="text-sm font-semibold text-fk-blue hover:underline">
              Sign Up
            </Link>
          </div>
          <Link href="/login" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <FiUser size={18} className="text-fk-blue" />
            My Profile
          </Link>
          <Link href="/help-center" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fk-blue">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            24x7 Customer Care
          </Link>
        </div>
      )}
    </div>
  );
}
