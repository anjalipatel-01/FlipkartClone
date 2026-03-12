"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiTag, FiTrendingUp, FiX } from "react-icons/fi";
import { getCategories, getProducts, type Category, type Product } from "@/lib/api";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dropOpen, setDropOpen] = useState(false);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [suggestions, setSuggestions] = useState<{ products: Product[]; categories: Category[] }>({
    products: [],
    categories: [],
  });
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch categories once
  useEffect(() => {
    getCategories().then((res) => setAllCategories(res.data.data)).catch(() => {});
  }, []);

  // Debounced live suggestions
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions({ products: [], categories: [] });
      setDropOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      const lower = q.toLowerCase();
      const matchedCats = allCategories.filter((c) => c.name.toLowerCase().includes(lower));
      try {
        const res = await getProducts({ search: q, limit: 6 });
        setSuggestions({ products: res.data.data, categories: matchedCats });
        setDropOpen(true);
      } catch {
        setSuggestions({ products: [], categories: matchedCats });
        setDropOpen(matchedCats.length > 0);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, allCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setDropOpen(false);
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const goToCategory = (slug: string) => {
    setDropOpen(false);
    setQuery("");
    router.push(`/products?category=${encodeURIComponent(slug)}`);
  };

  const goToProduct = (id: number) => {
    setDropOpen(false);
    setQuery("");
    router.push(`/products/${id}`);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setDropOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative flex flex-1" ref={searchRef}>
      <form onSubmit={handleSearch} className="w-full">
        <div className={`flex w-full items-center rounded-lg border-2 bg-white transition-colors ${
          dropOpen ? "border-fk-blue rounded-b-none" : "border-fk-blue"
        }`}>
          <span className="flex items-center pl-3 text-fk-text-light">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.products.length || suggestions.categories.length) setDropOpen(true);
            }}
            placeholder="Search for Products, Brands and More"
            className="w-full bg-transparent py-2 pl-3 pr-2 text-sm text-fk-text placeholder:text-fk-text-light focus:outline-none"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setDropOpen(false); }}
              className="pr-3 text-gray-400 hover:text-gray-600"
            >
              <FiX size={15} />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions dropdown */}
      {dropOpen && (suggestions.categories.length > 0 || suggestions.products.length > 0) && (
        <div className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-b-xl border-x-2 border-b-2 border-fk-blue bg-white shadow-lg">
          {/* Category matches */}
          {suggestions.categories.length > 0 && (
            <div className="border-b border-gray-100 px-4 py-2.5">
              <p className="mb-1.5 flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-fk-text-light">
                <FiTag size={11} /> Categories
              </p>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => goToCategory(cat.slug)}
                    className="rounded-full border border-fk-blue/30 bg-fk-blue/5 px-3 py-0.5 text-xs font-medium text-fk-blue hover:bg-fk-blue hover:text-white transition-colors"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product matches */}
          {suggestions.products.length > 0 && (
            <div>
              <p className="flex items-center gap-1 px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-fk-text-light">
                <FiTrendingUp size={11} /> Products
              </p>
              {suggestions.products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => goToProduct(product.id)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                    {product.thumbnail ? (
                      <Image src={product.thumbnail} alt={product.name} fill className="object-contain p-0.5" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-gray-300">IMG</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-fk-text">{product.name}</p>
                    <p className="text-xs text-fk-text-light">{product.category_name}</p>
                  </div>
                  <div className="shrink-0 text-sm font-semibold text-fk-text">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* See all */}
          <button
            onClick={() => { setDropOpen(false); router.push(`/products?search=${encodeURIComponent(query.trim())}`); }}
            className="flex w-full items-center gap-2 border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-sm font-medium text-fk-blue hover:bg-gray-100 transition-colors"
          >
            <FiSearch size={14} />
            See all results for &ldquo;{query.trim()}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
