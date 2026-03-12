"use client";

import { Suspense, useEffect, useState, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FiChevronDown, FiCheck, FiSearch, FiArrowUp, FiArrowDown, FiStar, FiSliders, FiX } from "react-icons/fi";
import { getProducts, getCategories, type Product, type Category } from "@/lib/api";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";

const SORT_OPTIONS = [
  { label: "Relevance",          value: "",           icon: FiSliders },
  { label: "Price: Low to High", value: "price_asc",  icon: FiArrowUp },
  { label: "Price: High to Low", value: "price_desc", icon: FiArrowDown },
  { label: "Top Rated",          value: "rating",     icon: FiStar },
];

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex max-w-[1400px] gap-3 px-3 py-4">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlSearch = searchParams.get("search") || "";
  const urlCategory = searchParams.get("category") || "";
  const urlSort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] = useState(urlCategory);
  const [sort, setSort] = useState(urlSort);
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Sync URL params on mount / URL change
  useEffect(() => {
    setSearch(urlSearch);
    setCategory(urlCategory);
    setSort(urlSort);
  }, [urlSearch, urlCategory, urlSort]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fetch categories once
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data.data))
      .catch(() => {});
  }, []);

  // Fetch products when filters change
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (category) params.category = category;
      if (sort) params.sort = sort;
      const res = await getProducts(params);
      setProducts(res.data.data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search, category, sort]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search - update URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      if (sort) params.set("sort", sort);
      const qs = params.toString();
      router.replace(`/products${qs ? `?${qs}` : ""}`, { scroll: false });
    }, 400);
    return () => clearTimeout(timer);
  }, [search, category, sort, router]);

  // Client-side rating + price filter
  const filteredProducts = useMemo(() => {
    let result = products;
    if (minRating > 0) result = result.filter((p) => Number(p.rating) >= minRating);
    if (minPrice !== "") result = result.filter((p) => Number(p.price) >= Number(minPrice));
    if (maxPrice !== "") result = result.filter((p) => Number(p.price) <= Number(maxPrice));
    return result;
  }, [products, minRating, minPrice, maxPrice]);

  return (
    <div className="mx-auto flex max-w-[1400px] gap-3 px-3 py-4">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          categories={categories}
          selectedCategory={category}
          onCategoryChange={setCategory}
          minRating={minRating}
          onRatingChange={setMinRating}
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="mb-3 rounded-sm bg-white px-4 py-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products by name…"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-4 text-sm transition focus:border-fk-blue focus:bg-white focus:outline-none focus:ring-1 focus:ring-fk-blue/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Result count */}
            <span className="text-sm text-fk-text-light whitespace-nowrap">
              {loading ? "Loading…" : `${filteredProducts.length} result${filteredProducts.length !== 1 ? "s" : ""}`}
            </span>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-fk-text-light">Sort</span>
              <div className="relative" ref={sortRef}>
                <button
                  onClick={() => setSortOpen((o) => !o)}
                  className={`flex min-w-[180px] items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                    sortOpen ? "border-fk-blue bg-fk-blue/5 text-fk-blue" : "border-gray-200 bg-white text-fk-text hover:border-fk-blue"
                  } focus:outline-none`}
                >
                  <span className="flex items-center gap-1.5">
                    {(() => { const opt = SORT_OPTIONS.find((o) => o.value === sort); const Icon = opt?.icon ?? FiSliders; return <Icon size={14} />; })()}
                    {SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Relevance"}
                  </span>
                  <FiChevronDown
                    size={14}
                    className={`shrink-0 transition-transform duration-150 ${sortOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-full z-20 mt-1.5 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                    {SORT_OPTIONS.map((opt, idx) => {
                      const Icon = opt.icon;
                      const active = sort === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => { setSort(opt.value); setSortOpen(false); }}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                            idx > 0 ? "border-t border-gray-50" : ""
                          } ${
                            active ? "bg-fk-blue/5 font-semibold text-fk-blue" : "text-fk-text hover:bg-gray-50"
                          }`}
                        >
                          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                            active ? "bg-fk-blue text-white" : "bg-gray-100 text-fk-text-light"
                          }`}>
                            <Icon size={13} />
                          </span>
                          {opt.label}
                          {active && <FiCheck size={13} className="ml-auto text-fk-blue" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(category || minRating > 0 || minPrice || maxPrice) && (
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-fk-text-light">Filters:</span>
              {category && (
                <span className="flex items-center gap-1 rounded-full bg-fk-blue/10 px-2.5 py-0.5 text-xs font-medium text-fk-blue">
                  {categories.find((c) => c.slug === category)?.name ?? category}
                  <button onClick={() => setCategory("")}><FiX size={11} /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="flex items-center gap-1 rounded-full bg-fk-orange/10 px-2.5 py-0.5 text-xs font-medium text-fk-orange">
                  {minRating}★ &amp; above
                  <button onClick={() => setMinRating(0)}><FiX size={11} /></button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="flex items-center gap-1 rounded-full bg-fk-green/10 px-2.5 py-0.5 text-xs font-medium text-fk-green">
                  ₹{minPrice || "0"} – ₹{maxPrice || "∞"}
                  <button onClick={() => { setMinPrice(""); setMaxPrice(""); }}><FiX size={11} /></button>
                </span>
              )}
              <button
                onClick={() => { setCategory(""); setMinRating(0); setMinPrice(""); setMaxPrice(""); }}
                className="ml-1 text-xs text-fk-text-light underline hover:text-fk-red"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Mobile filters */}
        <div className="mb-3 lg:hidden">
          <Sidebar
            categories={categories}
            selectedCategory={category}
            onCategoryChange={setCategory}
            minRating={minRating}
            onRatingChange={setMinRating}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-sm bg-white text-center">
            <p className="text-lg font-medium text-fk-text-light">
              No products found
            </p>
            <p className="mt-1 text-sm text-fk-text-light">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
