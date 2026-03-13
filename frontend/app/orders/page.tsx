"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getOrders, type Order } from "@/lib/api";
import { useAuth } from "@/lib/authContext";
import { FiPackage, FiChevronRight, FiShoppingBag, FiCheckCircle } from "react-icons/fi";

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const placedOrderId = searchParams.get("placed");

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    getOrders()
      .then((res) => setOrders(res.data.data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-fk-blue border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const statusColor: Record<string, string> = {
    placed: "bg-fk-blue/10 text-fk-blue",
    processing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-fk-green/10 text-fk-green",
    cancelled: "bg-red-100 text-fk-red",
  };

  return (
    <div className="min-h-screen bg-fk-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <nav className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-2.5 text-xs text-fk-text-light">
          <Link href="/" className="hover:text-fk-blue">Home</Link>
          <FiChevronRight size={11} />
          <span className="font-medium text-fk-text">My Orders</span>
        </nav>
      </div>

      <div className="mx-auto max-w-[1000px] px-4 py-6">
        <h1 className="mb-5 text-xl font-bold text-fk-text">My Orders</h1>

        {placedOrderId && (
          <div className="mb-4 flex items-start gap-3 rounded-sm border border-green-200 bg-green-50 px-4 py-3">
            <FiCheckCircle size={18} className="mt-0.5 shrink-0 text-fk-green" />
            <div>
              <p className="text-sm font-semibold text-fk-text">Order placed successfully</p>
              <p className="text-sm text-fk-text-light">Order ID: #{placedOrderId}</p>
            </div>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-sm bg-white py-16 shadow-sm">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <FiShoppingBag size={40} className="text-gray-300" />
            </div>
            <p className="text-lg font-semibold text-fk-text">No orders yet</p>
            <p className="text-sm text-fk-text-light">Looks like you haven&apos;t placed any orders</p>
            <Link href="/products" className="rounded-sm bg-fk-orange px-8 py-3 text-sm font-bold text-white hover:bg-amber-500 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}/confirmation`}
                className="block rounded-sm bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-fk-blue/5">
                      <FiPackage size={20} className="text-fk-blue" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-fk-text">Order #{order.id}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold capitalize ${statusColor[order.status] || "bg-gray-100 text-fk-text-light"}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-fk-text-light">
                        {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        {order.shipping_city && ` · ${order.shipping_city}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-fk-text">₹{Number(order.total_amount).toLocaleString("en-IN")}</span>
                    <FiChevronRight size={18} className="text-fk-text-light" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
