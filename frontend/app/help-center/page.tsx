"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiChevronDown, FiPackage, FiHelpCircle } from "react-icons/fi";
import { useAuth } from "@/lib/authContext";
import { getOrders, type Order, type OrderItem } from "@/lib/api";

/* ── Sidebar Data ── */
const TYPE_OF_ISSUE = [
  "Help with your issues",
  "Help with your order",
  "Help with other issues",
];
const HELP_TOPICS = [
  "Delivery related",
  "Login and my account",
  "Refunds related",
  "Flipkart EMI",
  "Payment",
  "Returns & Pickup related",
  "Cancellation related",
];

/* ── Issue options in bottom section ── */
const ISSUE_OPTIONS: { title: string; subtitle?: string }[] = [
  { title: "I want help with new GST changes" },
  { title: "I want to manage my order", subtitle: "View, cancel or return an order" },
  { title: "I want help with returns & refunds", subtitle: "Manage and track returns" },
  { title: "I want help with other issues", subtitle: "Offers, payment, Flipkart Plus & all other issues" },
  { title: "I want to contact the seller" },
];

/* ── Helpers ── */
function statusColor(status: string) {
  const s = status.toLowerCase();
  if (s === "delivered") return "text-green-600";
  if (s === "cancelled") return "text-red-500";
  if (s === "returned") return "text-amber-500";
  return "text-blue-500";
}
function statusDot(status: string) {
  const s = status.toLowerCase();
  if (s === "delivered") return "bg-green-500";
  if (s === "cancelled") return "bg-red-500";
  if (s === "returned") return "bg-amber-500";
  return "bg-blue-500";
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function HelpCenterPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [activeSidebarItem, setActiveSidebarItem] = useState("Help with your issues");

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getOrders()
      .then((res) => setOrders(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  /* Flatten all order items with their order status */
  const allItems: { item: OrderItem; status: string; date: string }[] = [];
  orders.forEach((order) => {
    (order.items || []).forEach((item) => {
      allItems.push({ item, status: order.status, date: order.created_at });
    });
  });

  const visibleItems = showAllOrders ? allItems : allItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-fk-bg">
      {/* ── Hero / Header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-[1200px] px-4 py-6">
          <h1 className="text-xl font-bold text-fk-text mb-2">
            Flipkart Help Center | 24&times;7 Customer Care Support
          </h1>
          <p className="text-xs leading-relaxed text-fk-text-light">
            The Flipkart Help Centre page lists out various types of issues that you may have encountered so that there can be quick resolution and
            you can go back to shopping online. For example, you can get more information regarding order tracking, delivery date changes, help with
            returns (and refunds), and much more. The Flipkart Help Centre also lists out more information that you may need regarding Flipkart Plus,
            payment, shopping, and more. The page has various filters listed out on the left-hand side so that you can get your queries solved quickly,
            efficiently, and without a hassle. You can get the Flipkart Help Centre number or even access Flipkart Help Centre support if you need
            professional help regarding various topics. The support executive will ensure speedy assistance so that your shopping experience is positive
            and enjoyable.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1200px] gap-0 px-4 py-5">
        {/* ══ LEFT SIDEBAR ══ */}
        <aside className="hidden w-[300px] shrink-0 lg:block">
          <div className="rounded-sm bg-white shadow-sm overflow-hidden">
            {/* Type of Issue */}
            <div className="px-5 pt-5 pb-3">
              <h3 className="text-xs font-bold tracking-wide text-fk-text-light uppercase mb-1">
                Type of Issue
              </h3>
            </div>
            {TYPE_OF_ISSUE.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSidebarItem(item)}
                className={`flex w-full items-center border-l-[3px] px-5 py-3.5 text-sm transition-colors hover:bg-gray-50 ${
                  activeSidebarItem === item
                    ? "border-fk-blue bg-white font-semibold text-fk-text"
                    : "border-transparent text-fk-text"
                }`}
              >
                {item}
              </button>
            ))}

            <div className="border-t border-gray-100 my-1" />

            {/* Help Topics */}
            <div className="px-5 pt-4 pb-3">
              <h3 className="text-xs font-bold tracking-wide text-fk-text-light uppercase mb-1">
                Help Topics
              </h3>
            </div>
            {HELP_TOPICS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSidebarItem(item)}
                className={`flex w-full items-center border-l-[3px] px-5 py-3.5 text-sm transition-colors hover:bg-gray-50 ${
                  activeSidebarItem === item
                    ? "border-fk-blue bg-white font-semibold text-fk-text"
                    : "border-transparent text-fk-text"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="flex-1 lg:pl-4">
          {/* ── Help Centre banner ── */}
          <div className="mb-4 rounded-sm bg-white shadow-sm overflow-hidden">
            <div className="px-6 pt-4 pb-2">
              <p className="text-xs text-fk-text-light">Help Centre</p>
            </div>
            <div className="mx-4 mb-4 flex items-center justify-between rounded-md bg-blue-50 px-5 py-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-xl">
                  💰
                </span>
                <div>
                  <p className="text-sm font-bold text-fk-text">GST Rate Updates</p>
                  <p className="text-xs text-fk-text-light">Quick answers to all your queries</p>
                </div>
              </div>
              <button className="flex items-center gap-1 text-sm font-semibold text-fk-blue hover:underline">
                Know more <FiChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ── Which item are you facing an issue with? ── */}
          {user && allItems.length > 0 && (
            <div className="mb-4 rounded-sm bg-white shadow-sm overflow-hidden">
              <div className="px-6 pt-5 pb-3">
                <h2 className="text-base font-bold text-fk-text">
                  Which item are you facing an issue with?
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {visibleItems.map(({ item, status, date }, idx) => (
                  <div key={`${item.id}-${idx}`} className="flex items-center gap-5 px-6 py-4">
                    {/* Thumbnail */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded border border-gray-100 bg-gray-50">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.product_name}
                          fill
                          className="object-contain p-1"
                          sizes="64px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <FiPackage size={24} className="text-gray-300" />
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-fk-text">
                        {item.product_name}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs">
                        <span className={`inline-block h-2 w-2 rounded-full ${statusDot(status)}`} />
                        <span className={`font-medium capitalize ${statusColor(status)}`}>
                          {status === "delivered"
                            ? `Delivered on ${formatDate(date)}`
                            : status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {allItems.length > 3 && (
                <div className="border-t border-gray-100 py-3 text-center">
                  <button
                    onClick={() => setShowAllOrders(!showAllOrders)}
                    className="text-sm font-semibold text-fk-blue hover:underline"
                  >
                    {showAllOrders ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── What issue are you facing? ── */}
          <div className="rounded-sm bg-white shadow-sm overflow-hidden">
            <div className="px-6 pt-5 pb-3">
              <h2 className="text-base font-bold text-fk-text">
                What issue are you facing?
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {ISSUE_OPTIONS.map((opt) => (
                <button
                  key={opt.title}
                  className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-fk-blue">{opt.title}</p>
                    {opt.subtitle && (
                      <p className="mt-0.5 text-xs text-fk-text-light">{opt.subtitle}</p>
                    )}
                  </div>
                  <FiChevronRight size={16} className="shrink-0 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
