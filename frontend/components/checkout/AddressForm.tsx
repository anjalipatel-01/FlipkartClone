import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export interface AddressFormData {
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
}

interface AddressFormProps {
  form: AddressFormData;
  fieldErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPhoneChange: (value: string) => void;
  onPincodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddressForm({
  form,
  fieldErrors,
  onChange,
  onPhoneChange,
  onPincodeChange,
  onSubmit,
}: AddressFormProps) {
  return (
    <div className="rounded-sm bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-fk-blue text-xs font-bold text-white">
          1
        </span>
        <h2 className="text-base font-semibold text-fk-text">Delivery Address</h2>
      </div>

      <form onSubmit={onSubmit} className="px-5 py-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-fk-text-light">Full Name *</label>
            <input
              name="shipping_name"
              value={form.shipping_name}
              onChange={onChange}
              placeholder="Enter your full name"
              className={`w-full rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_name ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_name && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_name}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-fk-text-light">Phone Number *</label>
            <input
              name="shipping_phone"
              value={form.shipping_phone}
              onChange={(e) => onPhoneChange(e.target.value.replace(/\D/g, ""))}
              maxLength={10}
              placeholder="10-digit mobile number"
              className={`w-full rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_phone ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_phone && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_phone}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-fk-text-light">Address *</label>
            <textarea
              name="shipping_address"
              value={form.shipping_address}
              onChange={onChange}
              rows={3}
              placeholder="House No., Building, Street, Area"
              className={`w-full resize-none rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_address ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_address && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_address}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-fk-text-light">City *</label>
            <input
              name="shipping_city"
              value={form.shipping_city}
              onChange={onChange}
              placeholder="City"
              className={`w-full rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_city ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_city && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_city}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-fk-text-light">State *</label>
            <input
              name="shipping_state"
              value={form.shipping_state}
              onChange={onChange}
              placeholder="State"
              className={`w-full rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_state ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_state && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_state}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-fk-text-light">Pincode *</label>
            <input
              name="shipping_pincode"
              value={form.shipping_pincode}
              onChange={(e) => onPincodeChange(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              placeholder="6-digit pincode"
              className={`w-full rounded border px-3 py-2.5 text-sm text-fk-text outline-none focus:border-fk-blue ${
                fieldErrors.shipping_pincode ? "border-fk-red" : "border-gray-300"
              }`}
            />
            {fieldErrors.shipping_pincode && (
              <p className="mt-1 text-xs text-fk-red">{fieldErrors.shipping_pincode}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-sm bg-fk-orange px-10 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-500 transition-colors"
          >
            Save & Continue
          </button>
          <Link href="/cart" className="flex items-center gap-1 text-sm text-fk-text-light hover:text-fk-blue">
            <FiArrowLeft size={14} /> Back to Cart
          </Link>
        </div>
      </form>
    </div>
  );
}
