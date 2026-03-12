import Image from "next/image";
import { FiMapPin, FiTruck, FiArrowLeft } from "react-icons/fi";
import type { CartItem } from "@/lib/cartContext";
import { getDeliveryDate } from "@/lib/utils";
import type { AddressFormData } from "./AddressForm";

interface OrderReviewProps {
  items: CartItem[];
  form: AddressFormData;
  submitting: boolean;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function OrderReview({ items, form, submitting, onBack, onPlaceOrder }: OrderReviewProps) {
  return (
    <>
      {/* Saved address card */}
      <div className="mb-3 rounded-sm bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fk-blue text-xs font-bold text-white">
              ✓
            </span>
            <h2 className="text-base font-semibold text-fk-text">Delivery Address</h2>
          </div>
          <button onClick={onBack} className="text-sm font-semibold text-fk-blue hover:underline">
            Change
          </button>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-start gap-2">
            <FiMapPin size={16} className="mt-0.5 shrink-0 text-fk-text-light" />
            <div>
              <p className="text-sm font-semibold text-fk-text">
                {form.shipping_name}{" "}
                <span className="ml-2 font-normal text-fk-text-light">{form.shipping_phone}</span>
              </p>
              <p className="mt-0.5 text-sm text-fk-text-light">
                {form.shipping_address}, {form.shipping_city}, {form.shipping_state} – {form.shipping_pincode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="rounded-sm bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fk-blue text-xs font-bold text-white">
            2
          </span>
          <h2 className="text-base font-semibold text-fk-text">Order Summary</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div key={item.product_id} className="flex gap-4 px-5 py-4">
              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded bg-gray-50">
                {item.thumbnail ? (
                  <Image src={item.thumbnail} alt={item.name} fill className="object-contain p-1" sizes="72px" />
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl text-gray-300">📦</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-fk-text line-clamp-1">{item.name}</p>
                <p className="mt-0.5 text-xs text-fk-text-light">{item.brand}</p>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-sm font-bold text-fk-text">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                  {item.discount_percent > 0 && (
                    <span className="text-xs text-fk-text-light line-through">
                      ₹{(item.mrp * item.quantity).toLocaleString("en-IN")}
                    </span>
                  )}
                  <span className="text-xs text-fk-text-light">× {item.quantity}</span>
                </div>
                <p className="mt-1 text-xs text-fk-text-light">
                  <FiTruck size={12} className="mr-1 inline text-fk-green" />
                  Delivery by {getDeliveryDate(5)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-fk-text-light hover:text-fk-blue"
          >
            <FiArrowLeft size={14} /> Back
          </button>
          <button
            onClick={onPlaceOrder}
            disabled={submitting}
            className="rounded-sm bg-fk-orange px-10 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 transition-colors disabled:opacity-60"
          >
            {submitting ? "Placing Order…" : "Confirm & Place Order"}
          </button>
        </div>
      </div>
    </>
  );
}
