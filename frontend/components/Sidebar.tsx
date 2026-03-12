"use client";

import { FiStar, FiTag, FiDollarSign } from "react-icons/fi";
import type { Category } from "@/lib/api";

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minRating,
  onRatingChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: SidebarProps) {
  const ratingOptions = [4, 3, 2, 1];

  const PRICE_PRESETS = [
    { label: "Under ₹500",    min: "",     max: "500" },
    { label: "₹500 – ₹1,000", min: "500",  max: "1000" },
    { label: "₹1,000 – ₹5k", min: "1000", max: "5000" },
    { label: "Above ₹5,000",  min: "5000", max: "" },
  ];

  const activePreset = PRICE_PRESETS.find(
    (p) => p.min === minPrice && p.max === maxPrice
  );

  return (
    <aside className="w-full shrink-0 rounded-xl bg-white shadow-sm lg:w-[260px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h2 className="font-bold text-fk-text">Filters</h2>
        {(selectedCategory || minRating > 0 || minPrice || maxPrice) && (
          <button
            onClick={() => {
              onCategoryChange("");
              onRatingChange(0);
              onMinPriceChange("");
              onMaxPriceChange("");
            }}
            className="text-xs font-medium text-fk-blue hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="p-4 space-y-6">
        {/* Category filter */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5">
            <FiTag size={13} className="text-fk-blue" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-fk-text">Category</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onCategoryChange("")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                selectedCategory === ""
                  ? "bg-fk-blue text-white shadow-sm"
                  : "bg-gray-100 text-fk-text hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(selectedCategory === cat.slug ? "" : cat.slug)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-fk-blue text-white shadow-sm"
                    : "bg-gray-100 text-fk-text hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Price range filter */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5">
            <FiDollarSign size={13} className="text-fk-blue" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-fk-text">Price Range</h3>
          </div>
          {/* Preset chips */}
          <div className="mb-2.5 flex flex-wrap gap-1.5">
            {PRICE_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  if (activePreset?.label === p.label) {
                    onMinPriceChange(""); onMaxPriceChange("");
                  } else {
                    onMinPriceChange(p.min); onMaxPriceChange(p.max);
                  }
                }}
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all ${
                  activePreset?.label === p.label
                    ? "bg-fk-green text-white shadow-sm"
                    : "bg-gray-100 text-fk-text hover:bg-gray-200"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          {/* Custom inputs */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => onMinPriceChange(e.target.value)}
                placeholder="Min"
                min={0}
                className="w-full rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-sm focus:border-fk-blue focus:outline-none"
              />
            </div>
            <span className="text-gray-300">–</span>
            <div className="relative flex-1">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">₹</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => onMaxPriceChange(e.target.value)}
                placeholder="Max"
                min={0}
                className="w-full rounded-lg border border-gray-200 py-1.5 pl-6 pr-2 text-sm focus:border-fk-blue focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Rating filter */}
        <div>
          <div className="mb-2.5 flex items-center gap-1.5">
            <FiStar size={13} className="text-fk-blue" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-fk-text">Customer Rating</h3>
          </div>
          <div className="space-y-1">
            {ratingOptions.map((r) => (
              <button
                key={r}
                onClick={() => onRatingChange(minRating === r ? 0 : r)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all ${
                  minRating === r
                    ? "bg-amber-50 font-semibold text-amber-700"
                    : "text-fk-text hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      size={12}
                      className={i < r ? "text-amber-400" : "text-gray-200"}
                      fill={i < r ? "currentColor" : "none"}
                    />
                  ))}
                </span>
                <span>{r}★ &amp; above</span>
              </button>
            ))}
            {minRating > 0 && (
              <button
                onClick={() => onRatingChange(0)}
                className="mt-0.5 w-full rounded-lg py-1.5 text-center text-xs text-fk-text-light hover:bg-gray-50"
              >
                Show all ratings
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}


