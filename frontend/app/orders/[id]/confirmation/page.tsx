"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getOrderById, type Order } from "@/lib/api";
import { FiCheck, FiMapPin, FiPackage, FiMail } from "react-icons/fi";

function getEstimatedDelivery(createdAt: string) {
  const d = new Date(createdAt);
  d.setDate(d.getDate() + 5);
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

export default function OrderConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getOrderById(Number(id))
      .then((res) => setOrder(res.data.data))
      .catch(() => setOrder(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-fk-blue border-t-transparent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-fk-text">Order not found</p>
        <Link href="/products" className="rounded-sm bg-fk-blue px-6 py-2.5 text-sm font-bold text-white">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fk-bg">
      <div className="mx-auto max-w-[800px] px-4 py-8">
        {/* Success banner */}
        <div className="mb-6 rounded-sm bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-fk-green/10">
            <FiCheck size={40} className="text-fk-green" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-fk-text">Order Placed Successfully!</h1>
          <p className="mt-2 text-sm text-fk-text-light">Your order has been placed and is being processed</p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-fk-blue/5 px-5 py-2">
            <FiPackage size={16} className="text-fk-blue" />
            <span className="text-sm font-semibold text-fk-blue">Order ID: #{order.id}</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-fk-text-light">
            <FiMail size={13} />
            <span>A confirmation email has been sent to your registered email</span>
          </div>
        </div>

        {/* Order details */}
        <div className="mb-4 rounded-sm bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-fk-text-light">Order Details</h2>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-fk-text-light">Order Date</span>
              <span className="font-medium text-fk-text">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-fk-text-light">Status</span>
              <span className="rounded-full bg-fk-green/10 px-3 py-0.5 text-xs font-semibold capitalize text-fk-green">{order.status}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-fk-text-light">Total Amount</span>
              <span className="text-base font-bold text-fk-text">₹{Number(order.total_amount).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-fk-text-light">Estimated Delivery</span>
              <span className="font-medium text-fk-text">{getEstimatedDelivery(order.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Shipping address */}
        {order.shipping_address && (
          <div className="mb-4 rounded-sm bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-fk-text-light">Shipping Address</h2>
            </div>
            <div className="flex items-start gap-3 px-5 py-4">
              <FiMapPin size={16} className="mt-0.5 shrink-0 text-fk-text-light" />
              <div>
                <p className="text-sm font-semibold text-fk-text">{order.shipping_name}</p>
                <p className="mt-0.5 text-sm text-fk-text-light">
                  {order.shipping_address}
                  {order.shipping_city && `, ${order.shipping_city}`}
                  {order.shipping_state && `, ${order.shipping_state}`}
                  {order.shipping_pincode && ` – ${order.shipping_pincode}`}
                </p>
                {order.shipping_phone && <p className="mt-0.5 text-sm text-fk-text-light">Phone: {order.shipping_phone}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Order items */}
        {order.items && order.items.length > 0 && (
          <div className="mb-4 rounded-sm bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-fk-text-light">Items ({order.items.length})</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 px-5 py-4">
                  <Link href={`/products/${item.product_id}`} className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded bg-gray-50">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.product_name} fill className="object-contain p-1" sizes="64px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xl text-gray-300">📦</div>
                    )}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product_id}`}>
                      <p className="text-sm font-medium text-fk-text hover:text-fk-blue line-clamp-1">{item.product_name}</p>
                    </Link>
                    <p className="mt-0.5 text-xs text-fk-text-light">{item.brand}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-fk-text">₹{Number(item.total_price).toLocaleString("en-IN")}</span>
                      <span className="text-xs text-fk-text-light">₹{Number(item.unit_price).toLocaleString("en-IN")} × {item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="rounded-sm bg-fk-blue px-8 py-3 text-sm font-bold text-white shadow-sm hover:bg-fk-blue-dark transition-colors"
          >
            View All Orders
          </Link>
          <Link
            href="/products"
            className="rounded-sm border border-gray-300 bg-white px-8 py-3 text-sm font-bold text-fk-text shadow-sm hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
