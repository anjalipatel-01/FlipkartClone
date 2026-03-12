"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiChevronRight, FiShield } from "react-icons/fi";
import { useCart } from "@/lib/cartContext";
import { useAuth } from "@/lib/authContext";
import { placeOrder } from "@/lib/api";
import { PLATFORM_FEE } from "@/components/cart/PriceSummary";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import AddressForm, { type AddressFormData } from "@/components/checkout/AddressForm";
import OrderReview from "@/components/checkout/OrderReview";

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totalItems, totalPrice, totalMRP, totalDiscount, clearCart } = useCart();

  const [form, setForm] = useState<AddressFormData>({
    shipping_name: user?.name || "",
    shipping_phone: user?.phone || "",
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"address" | "review">("address");

  const totalAmount = totalPrice + PLATFORM_FEE;

  if (!user) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-4 py-24">
        <p className="text-lg font-semibold text-fk-text">Please login to continue</p>
        <Link href="/login" className="rounded-sm bg-fk-orange px-8 py-3 text-sm font-bold text-white hover:bg-amber-500">
          Login
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-4 py-24">
        <p className="text-lg font-semibold text-fk-text">Your cart is empty</p>
        <Link href="/products" className="rounded-sm bg-fk-orange px-8 py-3 text-sm font-bold text-white hover:bg-amber-500">
          Shop Now
        </Link>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleAddressContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const errs: Record<string, string> = {};
    if (!form.shipping_name.trim()) errs.shipping_name = "Full name is required";
    if (!form.shipping_phone.trim()) errs.shipping_phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.shipping_phone)) errs.shipping_phone = "Enter a valid 10-digit phone number";
    if (!form.shipping_address.trim()) errs.shipping_address = "Address is required";
    if (!form.shipping_city.trim()) errs.shipping_city = "City is required";
    if (!form.shipping_state.trim()) errs.shipping_state = "State is required";
    if (!form.shipping_pincode.trim()) errs.shipping_pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.shipping_pincode)) errs.shipping_pincode = "Enter a valid 6-digit pincode";
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStep("review");
  };

  const handlePlaceOrder = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await placeOrder({
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
        ...form,
      });
      clearCart();
      router.push(`/orders/${res.data.data.id}/confirmation`);
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(msg || "Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-fk-bg">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <nav className="mx-auto flex max-w-[1400px] items-center gap-1 px-4 py-2.5 text-xs text-fk-text-light">
          <Link href="/" className="hover:text-fk-blue">Home</Link>
          <FiChevronRight size={11} />
          <Link href="/cart" className="hover:text-fk-blue">Cart</Link>
          <FiChevronRight size={11} />
          <span className="font-medium text-fk-text">Checkout</span>
        </nav>
      </div>

      <CheckoutSteps step={step} />

      <div className="mx-auto flex max-w-[1400px] items-start gap-4 px-4 py-4">
        {/* Left column */}
        <div className="flex-1 min-w-0">
          {error && (
            <div className="mb-3 rounded border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-fk-red">
              {error}
            </div>
          )}

          {step === "address" && (
            <AddressForm
              form={form}
              fieldErrors={fieldErrors}
              onChange={handleChange}
              onPhoneChange={(val) => { setForm({ ...form, shipping_phone: val }); setFieldErrors((p) => ({ ...p, shipping_phone: "" })); }}
              onPincodeChange={(val) => { setForm({ ...form, shipping_pincode: val }); setFieldErrors((p) => ({ ...p, shipping_pincode: "" })); }}
              onSubmit={handleAddressContinue}
            />
          )}

          {step === "review" && (
            <OrderReview
              items={items}
              form={form}
              submitting={submitting}
              onBack={() => setStep("address")}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
        </div>

        {/* Right column — Price summary */}
        <div className="hidden w-[340px] shrink-0 lg:block">
          <div className="rounded-sm bg-white shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-fk-text-light">Price Details</h2>
            </div>
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="flex justify-between text-sm text-fk-text">
                <span>Price ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span>?{totalMRP.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-fk-text">
                <span>Discount</span>
                <span className="font-medium text-fk-green">- ?{totalDiscount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-fk-text">
                <span>Platform Fee</span>
                <span>?{PLATFORM_FEE}</span>
              </div>
              <div className="flex justify-between text-sm text-fk-text">
                <span>Delivery Charges</span>
                <span className="font-medium text-fk-green">FREE</span>
              </div>
              <div className="border-t border-dashed border-gray-200" />
              <div className="flex justify-between text-base font-bold text-fk-text">
                <span>Total Amount</span>
                <span>?{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-gray-100 bg-gray-50 px-5 py-3">
              <FiShield size={18} className="shrink-0 text-fk-text-light" />
              <span className="text-xs text-fk-text-light">Safe and secure payments. 100% Authentic products.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
