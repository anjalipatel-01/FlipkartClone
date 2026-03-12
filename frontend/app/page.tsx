"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts, type Product } from "@/lib/api";

const BANNERS = [
  {
    title: "Big Saving Days",
    subtitle: "Up to 80% Off on Top Brands",
    tag: "SALE LIVE",
    cta: "SHOP NOW",
    bg: "linear-gradient(135deg, #1565c0 0%, #0d47a1 40%, #002171 100%)",
    accent: "#ffe082",
    href: "/products",
    emojis: ["📱", "💻", "👟", "🎧"],
  },
  {
    title: "Electronics Mega Sale",
    subtitle: "Best Deals on Laptops, Phones & More",
    tag: "TOP DEALS",
    cta: "EXPLORE NOW",
    bg: "linear-gradient(135deg, #e65100 0%, #bf360c 50%, #8d1900 100%)",
    accent: "#ffcc80",
    href: "/products?category=electronics",
    emojis: ["🖥️", "📱", "⌚", "🎮"],
  },
  {
    title: "Fashion Fiesta",
    subtitle: "Trending Styles at Unbeatable Prices",
    tag: "NEW ARRIVALS",
    cta: "VIEW COLLECTION",
    bg: "linear-gradient(135deg, #6a1b9a 0%, #4a148c 50%, #311b92 100%)",
    accent: "#ce93d8",
    href: "/products?category=fashion",
    emojis: ["👗", "👠", "👜", "🕶️"],
  },
];

/* Category showcase section config — colored border + product cards */
const SHOWCASE_SECTIONS = [
  { title: "Best of Electronics", categorySlug: "electronics", color: "#e91e63" },
  { title: "Top Mobiles", categorySlug: "mobiles", color: "#1e88e5" },
  { title: "Fashion Top Picks", categorySlug: "fashion", color: "#388e3c" },
  { title: "Home & Kitchen Essentials", categorySlug: "home-kitchen", color: "#ff6f00" },
  { title: "Best Selling Books", categorySlug: "books", color: "#6a1b9a" },
  { title: "Top Appliances", categorySlug: "appliances", color: "#d32f2f" },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Group products by category slug
  const productsByCategory = useMemo(() => {
    const map: Record<string, Product[]> = {};
    for (const p of products) {
      const slug = p.category_slug;
      if (!map[slug]) map[slug] = [];
      map[slug].push(p);
    }
    return map;
  }, [products]);

  // Auto-rotate banner
  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto max-w-[1400px] px-3 py-4 pt-6">
      {/* Hero Banner */}
      <div className="relative mb-3 w-full overflow-hidden rounded-md shadow-md" style={{ height: "280px" }}>
        {/* Slides */}
        {BANNERS.map((b, i) => (
          <div
            key={i}
            className="absolute inset-0 flex transition-all duration-700 ease-in-out"
            style={{
              background: b.bg,
              opacity: i === bannerIdx ? 1 : 0,
              transform: i === bannerIdx ? "scale(1)" : "scale(1.04)",
              zIndex: i === bannerIdx ? 1 : 0,
            }}
          >
            {/* Decorative shapes */}
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${b.accent}, transparent 70%)` }} />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full opacity-10" style={{ background: `radial-gradient(circle, ${b.accent}, transparent 70%)` }} />
            <div className="absolute right-[20%] top-[10%] h-40 w-40 rounded-full opacity-[0.07]" style={{ background: b.accent }} />
            {/* Diagonal stripe */}
            <div className="absolute -right-10 top-0 h-full w-[200px] skew-x-[-12deg] opacity-[0.06]" style={{ background: b.accent }} />

            {/* Content */}
            <div className="relative z-10 flex w-full items-center justify-between px-10 sm:px-16">
              <div className="max-w-lg">
                {/* Tag badge */}
                <span
                  className="mb-3 inline-block rounded-full px-4 py-1 text-[11px] font-bold tracking-widest text-white"
                  style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)" }}
                >
                  ⚡ {b.tag}
                </span>
                <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
                  {b.title}
                </h1>
                <p className="mt-2 text-base font-medium text-white/70 sm:text-lg">
                  {b.subtitle}
                </p>
                <Link
                  href={b.href}
                  className="group mt-5 inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-bold shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: b.accent, color: "#1a1a1a" }}
                >
                  {b.cta}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Floating category emojis */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                {b.emojis.map((emoji, j) => (
                  <div
                    key={j}
                    className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 text-4xl backdrop-blur-sm transition-transform hover:scale-110"
                    style={{ animationDelay: `${j * 0.15}s` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Left / Right arrows */}
        <button
          onClick={() => setBannerIdx((prev) => (prev - 1 + BANNERS.length) % BANNERS.length)}
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          onClick={() => setBannerIdx((prev) => (prev + 1) % BANNERS.length)}
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/40"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setBannerIdx(i)}
              className="transition-all duration-300"
              style={{
                width: i === bannerIdx ? 24 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: i === bannerIdx ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Category Showcase Sections ── */}
      {!loading &&
        SHOWCASE_SECTIONS.map((section) => {
          const items = (productsByCategory[section.categorySlug] ?? []).slice(0, 12);
          if (items.length === 0) return null;
          return (
            <section
              key={section.categorySlug}
              className="mb-3 overflow-hidden rounded-md"
              style={{ backgroundColor: section.color }}
            >
              {/* Colored header */}
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                  <p className="text-xs text-white/70 mt-0.5">{items.length} products</p>
                </div>
                <Link
                  href={`/products?category=${section.categorySlug}`}
                  className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold shadow hover:bg-gray-100 transition-colors"
                  style={{ color: section.color }}
                >
                  View All
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Horizontal scrollable product row — 4 cards fill the row exactly */}
              <div className="mx-2 mb-2 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                {items.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="flex shrink-0 flex-col rounded-md bg-white transition-shadow hover:shadow-lg"
                    style={{ width: "calc(25% - 6px)" }}
                  >
                    <div className="relative h-[140px] rounded-t-md bg-[#f5f5f5]">
                      {product.thumbnail ? (
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          className="object-contain p-4"
                          sizes="25vw"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-5xl text-gray-300">📦</div>
                      )}
                      {product.discount_percent >= 20 && (
                        <span className="absolute left-2 top-2 rounded bg-fk-orange px-1.5 py-0.5 text-[10px] font-bold text-white leading-none">
                          {product.discount_percent}% OFF
                        </span>
                      )}
                    </div>
                    <div className="px-2.5 py-2">
                      <p className="text-xs font-semibold text-fk-text line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-[11px] text-fk-text-light line-clamp-1">{product.brand}</p>
                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="text-xs font-bold text-fk-text">
                          &#8377;{Number(product.price).toLocaleString("en-IN")}
                        </span>
                        {product.discount_percent > 0 && (
                          <span className="text-[10px] text-fk-green font-medium">
                            {product.discount_percent}% off
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}

                {/* "See All" card — last item, same width as product cards */}
                <Link
                  href={`/products?category=${section.categorySlug}`}
                  className="flex shrink-0 flex-col items-center justify-center gap-3 rounded-md bg-white/90 hover:bg-white transition-colors"
                  style={{ width: "calc(25% - 6px)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow"
                    style={{ backgroundColor: section.color }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <span className="text-center text-sm font-semibold text-fk-text px-3 leading-snug">
                    View All {section.title}
                  </span>
                </Link>
              </div>
            </section>
          );
        })}

      {/* Promo strip */}
      <section className="mb-3 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1 rounded-sm bg-fk-blue px-6 py-6 text-white shadow-sm">
          <h3 className="text-lg font-semibold">Shop with Confidence</h3>
          <p className="mt-1 text-sm text-white/80">
            100% Original Products &bull; Easy Returns &bull; Free Delivery*
          </p>
          <Link
            href="/products"
            className="mt-3 inline-block rounded-sm bg-white px-4 py-2 text-sm font-medium text-fk-blue"
          >
            EXPLORE NOW
          </Link>
        </div>
        <div className="flex-1 rounded-sm bg-fk-orange px-6 py-6 text-white shadow-sm">
          <h3 className="text-lg font-semibold">Best Deals on Electronics</h3>
          <p className="mt-1 text-sm text-white/80">
            Up to 70% off on top brands
          </p>
          <Link
            href="/products?category=electronics"
            className="mt-3 inline-block rounded-sm bg-white px-4 py-2 text-sm font-medium text-fk-orange"
          >
            SHOP NOW
          </Link>
        </div>
      </section>
    </div>
  );
}
