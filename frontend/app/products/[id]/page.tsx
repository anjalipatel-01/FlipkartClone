"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiStar, FiShoppingCart, FiZap, FiTruck, FiShield,
  FiChevronRight, FiChevronLeft, FiChevronDown, FiChevronUp,
  FiCheck, FiMapPin, FiRefreshCw, FiMinus, FiPlus, FiArrowDown, FiHeart,
} from "react-icons/fi";
import { getProductById, getProducts, type Product } from "@/lib/api";
import { useCart } from "@/lib/cartContext";
import { useWishlist } from "@/lib/wishlistContext";
import { useAuth } from "@/lib/authContext";
import ProductCard from "@/components/ProductCard";
import ProductAllDetails from "@/components/ProductAllDetails";

/* ─── helpers ─── */
const fmt = (n: number) => n.toLocaleString("en-IN");
const deliveryDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });
};

const BANK_OFFERS = [
  { tag: "Bank Offer",   text: "10% off on SBI Credit Cards, up to ₹1,500. T&C apply" },
  { tag: "Bank Offer",   text: "5% Unlimited Cashback on Flipkart Axis Bank Credit Card" },
  { tag: "No Cost EMI",  text: "No Cost EMI on select cards – EMI starting from ₹599/month" },
  { tag: "Special Price",text: "Get extra 5% off (price inclusive of discount)" },
];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { addToCart, items } = useCart();
  const { user } = useAuth();
  const { isInWishlist, toggle: toggleWishlist } = useWishlist();

  const [product, setProduct]               = useState<Product | null>(null);
  const [loading, setLoading]               = useState(true);
  const [activeIdx, setActiveIdx]           = useState(0);
  const [quantity, setQuantity]             = useState(1);
  const [pincode, setPincode]               = useState("");
  const [pincodeMsg, setPincodeMsg]         = useState("");
  const [offersExpanded, setOffersExpanded] = useState(false);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [toast, setToast]                     = useState<{ show: boolean; fading: boolean }>({ show: false, fading: false });
  const [justAdded, setJustAdded]             = useState(false);
  const [addedThisVisit, setAddedThisVisit]   = useState(false);
  const toastTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimer     = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(Number(id))
      .then((res) => {
        setProduct(res.data.data);
        setActiveIdx(0);
        return getProducts({ category: res.data.data.category_slug, limit: 8 });
      })
      .then((res) => setSimilarProducts(res.data.data.filter((p) => p.id !== Number(id))))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const inCart = items.some((i) => i.product_id === product?.id);

  const showToast = () => {
    if (toastTimer.current)   clearTimeout(toastTimer.current);
    if (toastFadeRef.current) clearTimeout(toastFadeRef.current);
    setToast({ show: true, fading: false });
    toastTimer.current = setTimeout(() => {
      setToast({ show: true, fading: true });
      toastFadeRef.current = setTimeout(() => setToast({ show: false, fading: false }), 350);
    }, 3000);
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (addedThisVisit) { router.push("/cart"); return; }
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAddedThisVisit(true);
    setJustAdded(true);
    if (popTimer.current) clearTimeout(popTimer.current);
    popTimer.current = setTimeout(() => setJustAdded(false), 300);
    showToast();
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!inCart) addToCart(product);
    router.push("/cart");
  };

  const checkPincode = () => {
    if (/^\d{6}$/.test(pincode)) setPincodeMsg(`✓ Delivery available by ${deliveryDate()}`);
    else setPincodeMsg("Please enter a valid 6-digit pincode.");
  };

  /* ── loading skeleton ── */
  if (loading) return (
    <div className="min-h-screen bg-fk-bg">
      <div className="mx-auto max-w-[1400px] px-3 py-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-[500px] lg:shrink-0">
            <div className="h-[420px] animate-pulse rounded-sm bg-white" />
          </div>
          <div className="flex-1 space-y-3">
            {[100,80,60,50,70,40].map((w,i) => (
              <div key={i} className="h-5 animate-pulse rounded bg-white" style={{width:`${w}%`}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-fk-text-light">
      <p className="text-lg">Product not found.</p>
      <Link href="/products" className="rounded bg-fk-blue px-4 py-2 text-sm font-semibold text-white">Browse Products</Link>
    </div>
  );

  const images   = product.images?.length ? product.images.map(i => i.image_url) : product.thumbnail ? [product.thumbnail] : [];
  const price    = Number(product.price);
  const mrp      = Number(product.mrp);
  const discount = product.discount_percent;
  const rating   = Number(product.rating);
  const inStock  = product.stock > 0;
  const savings  = mrp - price;
  return (
    <div className="min-h-screen bg-fk-bg">

      {/* breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <nav className="mx-auto flex max-w-[1400px] items-center gap-1 overflow-x-auto px-4 py-2.5 text-xs text-fk-text-light whitespace-nowrap hide-scrollbar">
          <Link href="/" className="hover:text-fk-blue">Home</Link>
          <FiChevronRight size={11} />
          <Link href="/products" className="hover:text-fk-blue">Products</Link>
          <FiChevronRight size={11} />
          <Link href={`/products?category=${product.category_slug}`} className="hover:text-fk-blue capitalize">{product.category_name}</Link>
          <FiChevronRight size={11} />
          <span className="max-w-[220px] truncate font-medium text-fk-text">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1400px] px-3 py-4">
        <div className="flex flex-col gap-4 lg:flex-row">

          {/* ══ LEFT — IMAGE CAROUSEL ══ */}
          <div className="lg:w-[500px] lg:shrink-0">
            <div className="sticky top-[96px] overflow-hidden rounded-sm bg-white shadow-sm">

              {/* Main image */}
              <div className="relative flex items-center justify-center" style={{minHeight:340}}>
                {images.length > 1 && (
                  <button
                    onClick={() => setActiveIdx(p => Math.max(0, p - 1))}
                    disabled={activeIdx === 0}
                    className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md hover:shadow-lg disabled:opacity-0 transition-all"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                )}
                <div className="relative h-[340px] w-full">
                  {images.length > 0 ? (
                    <Image
                      key={activeIdx}
                      src={images[activeIdx]}
                      alt={product.name}
                      fill
                      sizes="(max-width:1024px) 100vw, 500px"
                      className="object-contain p-4"
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-300">No image</div>
                  )}
                </div>
                {images.length > 1 && (
                  <button
                    onClick={() => setActiveIdx(p => Math.min(images.length - 1, p + 1))}
                    disabled={activeIdx === images.length - 1}
                    className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-1.5 shadow-md hover:shadow-lg disabled:opacity-0 transition-all"
                  >
                    <FiChevronRight size={20} />
                  </button>
                )}
                {!inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                    <span className="rounded-sm border border-gray-400 bg-white px-3 py-1 text-sm font-medium text-gray-500">Out of stock</span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip — horizontal scroll row */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-t border-gray-100 px-4 py-3 hide-scrollbar">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded border-2 transition-all ${
                        activeIdx === i ? "border-fk-blue" : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <Image src={src} alt={`view ${i+1}`} fill className="object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ══ RIGHT — PRODUCT DETAILS ══ */}
          <div className="flex-1 space-y-3">

            {/* Brand & Name */}
            <div className="rounded-sm bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-fk-text">{product.brand}</p>
              <h1 className="mt-0.5 text-[15px] font-normal leading-snug text-fk-text md:text-base">
                {product.name}
              </h1>
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5 border-t border-gray-100 pt-2.5">
                <button className="flex items-center gap-1 rounded border border-fk-green/40 bg-fk-green/5 px-2 py-0.5 text-sm font-semibold text-fk-green">
                  {rating.toFixed(1)} <FiStar size={12} fill="currentColor" />
                  <span className="mx-1 text-gray-300">|</span>
                  <span className="font-normal text-fk-text-light">{product.rating_count.toLocaleString()}</span>
                </button>
                <span className="text-xs text-fk-text-light">
                  {Math.floor(product.rating_count * 0.4).toLocaleString()} Reviews
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="rounded-sm bg-white p-4 shadow-sm">
              <p className="mb-2 text-xs font-semibold text-fk-green">Special Price</p>
              <div className="flex flex-wrap items-baseline gap-2.5">
                {discount > 0 && (
                  <span className="flex items-center gap-0.5 text-xl font-extrabold text-fk-green">
                    <FiArrowDown size={18} strokeWidth={3} />{discount}%
                  </span>
                )}
                {mrp > price && (
                  <span className="text-base text-fk-text-light line-through">₹{fmt(mrp)}</span>
                )}
                <span className="text-2xl font-bold text-fk-text">₹{fmt(price)}</span>
              </div>
              {savings > 0 && (
                <p className="mt-1 text-xs text-fk-green">You save ₹{fmt(savings)}</p>
              )}
              <div className="mt-3">
                {inStock ? (
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-fk-green">
                    <FiCheck size={14} /> In Stock
                    <span className="ml-1 font-normal text-fk-text-light">({product.stock} units left)</span>
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-fk-red">✕ Out of Stock</span>
                )}
              </div>
              {inStock && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-sm text-fk-text-light">Qty:</span>
                  <div className="flex overflow-hidden rounded border border-gray-300">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100">
                      <FiMinus size={13} />
                    </button>
                    <span className="flex h-8 w-9 items-center justify-center border-x border-gray-300 text-sm font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(product.stock, q + 1))} className="flex h-8 w-8 items-center justify-center text-gray-600 hover:bg-gray-100">
                      <FiPlus size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* WOW DEAL banner */}
            <div className="overflow-hidden rounded-sm bg-white shadow-sm">
              <div
                className="flex cursor-pointer items-center justify-between px-4 py-3"
                style={{background:"linear-gradient(135deg,#1a3c8f 0%,#2874f0 100%)"}}
                onClick={() => setOffersExpanded(o => !o)}
              >
                <div className="flex items-center gap-3">
                  <span className="rounded bg-fk-yellow px-1.5 py-0.5 text-[10px] font-black leading-tight text-fk-text">
                    WOW!<br />DEAL
                  </span>
                  <span className="font-bold text-white">Buy at ₹{fmt(price)}</span>
                </div>
                {offersExpanded ? <FiChevronUp size={18} className="text-white" /> : <FiChevronDown size={18} className="text-white" />}
              </div>
              <div className="overflow-hidden transition-all duration-300" style={{maxHeight: offersExpanded ? `${BANK_OFFERS.length * 72}px` : "40px"}}>
                {!offersExpanded && (
                  <p className="bg-blue-50 px-4 py-2.5 text-xs text-fk-text-light">Apply offers for maximum savings!</p>
                )}
                {offersExpanded && (
                  <ul className="divide-y divide-gray-100 bg-blue-50">
                    {BANK_OFFERS.map((o, i) => (
                      <li key={i} className="flex items-start gap-2.5 px-4 py-3">
                        <span className="mt-0.5 shrink-0 rounded bg-fk-green px-1.5 py-0.5 text-[10px] font-bold text-white">{o.tag}</span>
                        <span className="text-xs text-fk-text">{o.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Delivery */}
            <div className="rounded-sm bg-white p-4 shadow-sm">
              <h2 className="mb-3 font-semibold text-fk-text">Delivery details</h2>
              <div className="flex items-center gap-2">
                <FiMapPin size={15} className="shrink-0 text-fk-text-light" />
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => { setPincode(e.target.value.replace(/\D/g,"")); setPincodeMsg(""); }}
                  placeholder="Enter pincode"
                  className="w-36 rounded border border-gray-300 px-2.5 py-1.5 text-sm focus:border-fk-blue focus:outline-none"
                />
                <button onClick={checkPincode} className="text-sm font-bold text-fk-blue hover:underline">Check</button>
              </div>
              {pincodeMsg && (
                <p className={`mt-2 text-xs font-medium ${pincodeMsg.startsWith("✓") ? "text-fk-green" : "text-fk-red"}`}>{pincodeMsg}</p>
              )}
              <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                {[
                  {icon:FiTruck,    label:"Free Delivery",      detail:`by ${deliveryDate()}`},
                  {icon:FiRefreshCw,label:"7 Day Replacement",  detail:"Easy returns"},
                  {icon:FiShield,   label:"1 Year Warranty",    detail:"by manufacturer"},
                ].map(({icon:Icon,label,detail}) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon size={18} className="shrink-0 text-fk-text-light" />
                    <span className="text-sm font-medium text-fk-text">{label}</span>
                    <span className="text-xs text-fk-text-light">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller */}
            <div className="rounded-sm bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="w-20 shrink-0 text-sm text-fk-text-light">Seller</span>
                <div>
                  <span className="text-sm font-semibold text-fk-blue">{product.brand} Official</span>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="rounded bg-fk-green px-1.5 py-0.5 text-[10px] font-bold text-white">4.3 ★</span>
                    <span className="text-xs text-fk-text-light">Top Seller</span>
                  </div>
                  <p className="mt-1 text-xs text-fk-text-light">7 Days Service Centre Replacement</p>
                </div>
              </div>
            </div>

            {/* All details — Specifications / Warranty / Manufacturer */}
            {(product.specs?.length || product.description) && (
              <ProductAllDetails
                specs={product.specs ?? []}
                brand={product.brand}
                description={product.description}
              />
            )}

            {/* ══ Wishlist button ══ */}
            <button
              onClick={() => { if (user && product) toggleWishlist(product.id); }}
              className={`flex w-full items-center justify-center gap-2 rounded-sm border py-3 text-sm font-semibold transition-colors ${
                product && isInWishlist(product.id)
                  ? "border-fk-red bg-red-50 text-fk-red hover:bg-red-100"
                  : "border-gray-200 bg-white text-fk-text-light hover:border-fk-red hover:text-fk-red"
              }`}
            >
              <FiHeart size={16} fill={product && isInWishlist(product.id) ? "currentColor" : "none"} />
              {product && isInWishlist(product.id) ? "Wishlisted" : "Add to Wishlist"}
            </button>

            {/* ══ CTA buttons ══ */}
            <div className="flex overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
              <button onClick={handleAddToCart} disabled={!inStock}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-colors duration-200 sm:text-base ${justAdded ? "btn-pop" : ""} ${
                  !inStock
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : addedThisVisit
                      ? "border-r border-fk-blue-dark bg-fk-blue text-white hover:bg-fk-blue-dark"
                      : "border-r border-gray-200 bg-white text-fk-text hover:bg-gray-50"
                }`}>
                <FiShoppingCart size={18} className={`transition-colors duration-200 ${addedThisVisit ? "text-white" : "text-fk-orange"}`} />
                <span>{addedThisVisit ? "Go to Cart" : "Add to Cart"}</span>
              </button>
              <button onClick={handleBuyNow} disabled={!inStock}
                className={`flex flex-1 items-center justify-center gap-2 py-4 text-sm font-bold transition-all sm:text-base ${
                  !inStock ? "cursor-not-allowed bg-gray-200 text-gray-400" : "bg-fk-yellow text-fk-text hover:brightness-95 active:scale-[0.99]"
                }`}>
                <FiZap size={18} />
                Buy at ₹{fmt(price)}
              </button>
            </div>
          </div>
        </div>

        {/* Similar products */}
        {similarProducts.length > 0 && (
          <div className="mt-4 rounded-sm bg-white p-4 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-2 text-base font-semibold text-fk-text">Similar Products</h2>
            <div className="grid grid-cols-2 gap-px bg-gray-200 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {similarProducts.slice(0,6).map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>



      {/* ══ Toast notification ══ */}
      {toast.show && (
        <div
          className={`fixed bottom-20 right-4 z-50 flex min-w-[260px] max-w-[340px] items-center gap-3 rounded-lg bg-[#212121] px-4 py-3 shadow-2xl ${
            toast.fading
              ? "opacity-0 translate-y-3 transition-all duration-300"
              : "toast-enter"
          }`}
        >
          {product?.thumbnail && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-white">
              <Image src={product.thumbnail} alt="" fill className="object-contain p-1" />
            </div>
          )}
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
              <FiCheck size={13} strokeWidth={3} className="shrink-0 text-fk-green" />
              Added to cart!
            </span>
            <span className="truncate text-xs text-gray-400">{product?.name}</span>
          </div>
          <Link
            href="/cart"
            className="shrink-0 text-xs font-bold text-fk-yellow hover:underline"
          >
            View Cart →
          </Link>
        </div>
      )}

    </div>
  );
}

