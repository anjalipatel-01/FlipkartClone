"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium text-fk-text hover:text-fk-blue"
      >
        More
        <FiChevronDown size={14} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-md border border-gray-200 bg-white py-2 shadow-lg">
          <div className="border-b border-gray-100 px-4 pb-2">
            <span className="text-sm font-semibold text-fk-text">More</span>
          </div>
          <Link href="#" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fk-text-light">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            Become a Seller
          </Link>
          <Link href="#" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fk-text-light">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            Notification Settings
          </Link>
          <Link href="/help-center" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fk-text-light">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            24x7 Customer Care
          </Link>
          <Link href="#" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-fk-text hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fk-text-light">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 7V5a4 4 0 00-8 0v2" />
            </svg>
            Advertise on Flipkart
          </Link>
        </div>
      )}
    </div>
  );
}
