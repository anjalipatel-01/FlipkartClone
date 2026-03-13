"use client";

import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useCart } from "@/lib/cartContext";
import CartItemRow from "@/components/cart/CartItemRow";
import PriceSummary, { PLATFORM_FEE } from "@/components/cart/PriceSummary";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, totalMRP, totalDiscount } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-6 px-4 py-24">
        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gray-100">
          <FiShoppingBag size={64} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-semibold text-fk-text">Your cart is empty!</h2>
        <p className="text-fk-text-light">Add items to it now</p>
        <Link
          href="/products"
          className="rounded-sm bg-fk-orange px-10 py-3 text-sm font-bold text-white shadow hover:bg-amber-500 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const totalAmount = totalPrice + PLATFORM_FEE;
  const totalSavings = totalDiscount - PLATFORM_FEE;

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-4 py-4 lg:flex-row lg:items-start">
      {/* Left: Cart Items */}
      <div className="flex-1 min-w-0">
        <div className="mb-3 flex flex-col items-start justify-between gap-2 rounded-sm bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:px-5">
          <span className="text-sm text-fk-text-light">Deliver to</span>
          <button className="rounded border border-fk-blue px-4 py-1.5 text-sm font-medium text-fk-blue hover:bg-blue-50 transition-colors">
            Enter Delivery Pincode
          </button>
        </div>

        <div className="flex flex-col gap-0 overflow-hidden rounded-sm bg-white shadow-sm">
          {items.map((item, idx) => (
            <CartItemRow
              key={item.product_id}
              item={item}
              onRemove={() => removeFromCart(item.product_id)}
              onQtyChange={(qty) => updateQuantity(item.product_id, qty)}
              isLast={idx === items.length - 1}
            />
          ))}

          {/* Mobile place-order strip */}
          <div className="flex items-center justify-end border-t border-gray-200 px-6 py-4 lg:hidden">
            <Link
              href="/checkout"
              className="rounded-sm bg-fk-orange px-10 py-3 text-sm font-bold text-white shadow hover:bg-amber-500 transition-colors"
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Price Details */}
      <div className="hidden w-[340px] shrink-0 lg:block">
        <PriceSummary
          totalItems={totalItems}
          totalMRP={totalMRP}
          totalDiscount={totalDiscount}
          totalAmount={totalAmount}
          totalSavings={totalSavings}
          onClear={clearCart}
        />
      </div>
    </div>
  );
}
