"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

const PLATFORM_FEE = 7;

interface PriceSummaryProps {
  totalItems: number;
  totalMRP: number;
  totalDiscount: number;
  totalAmount: number;
  totalSavings: number;
  onClear: () => void;
}

export { PLATFORM_FEE };

export default function PriceSummary({
  totalItems,
  totalMRP,
  totalDiscount,
  totalAmount,
  totalSavings,
  onClear,
}: PriceSummaryProps) {
  return (
    <div className="rounded-sm bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-fk-text-light">
          Price Details
        </h2>
        <svg className="h-4 w-4 text-fk-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>

      <div className="px-5 py-4 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-fk-text">
          <span>Price ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
          <span>₹{totalMRP.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-fk-text">
          <span>Discount</span>
          <span className="font-medium text-fk-green">− ₹{totalDiscount.toLocaleString("en-IN")}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-fk-text">
          <span className="flex items-center gap-1">
            Platform Fee
            <svg className="h-3.5 w-3.5 text-fk-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
            </svg>
          </span>
          <span>₹{PLATFORM_FEE}</span>
        </div>

        <div className="border-t border-dashed border-gray-200" />

        <div className="flex items-center justify-between text-base font-bold text-fk-text">
          <span>Total Amount</span>
          <span>₹{totalAmount.toLocaleString("en-IN")}</span>
        </div>

        {totalSavings > 0 && (
          <div className="rounded-sm bg-green-50 px-4 py-2.5 text-center text-sm font-semibold text-fk-green">
            🎉 You&apos;ll save ₹{totalSavings.toLocaleString("en-IN")} on this order!
          </div>
        )}
      </div>

      {/* Safe & secure */}
      <div className="flex items-center gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3">
        <svg className="h-5 w-5 shrink-0 text-fk-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span className="text-xs text-fk-text-light">
          Safe and secure payments. Easy returns. 100% Authentic products.
        </span>
      </div>

      {/* Place Order */}
      <div className="border-t border-gray-100 px-5 py-4">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-sm font-bold text-fk-text-light line-through">
            ₹{totalMRP.toLocaleString("en-IN")}
          </span>
          <span className="text-xl font-bold text-fk-text">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
        <PlaceOrderButton totalAmount={totalAmount} onClear={onClear} />
      </div>
    </div>
  );
}

function PlaceOrderButton({ totalAmount, onClear }: { totalAmount: number; onClear: () => void }) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="w-full rounded-sm bg-fk-orange py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 transition-colors"
      >
        Login to Place Order
      </button>
    );
  }

  return (
    <button
      onClick={() => router.push("/checkout")}
      className="w-full rounded-sm bg-fk-orange py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 transition-colors"
    >
      Place Order
    </button>
  );
}
