"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/authContext";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; phone?: string }>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; password?: string; phone?: string } = {};
    if (!name.trim()) errs.name = "Full name is required";
    else if (name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!email.trim()) errs.email = "Email is required";
    else if (!EMAIL_RE.test(email.trim())) errs.email = "Enter a valid email address";
    if (!password) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    if (phone && !/^\d{10}$/.test(phone)) errs.phone = "Enter a valid 10-digit phone number";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;
    setSubmitting(true);
    try {
      await register({ name, email, password, phone: phone || undefined });
      router.push("/");
    } catch (err: unknown) {
      const msg =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : undefined;
      setError(msg || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-fk-bg px-4 py-10">
      <div className="flex w-full max-w-[750px] overflow-hidden rounded bg-white shadow-md">
        {/* Left panel */}
        <div className="hidden w-[270px] shrink-0 flex-col justify-between p-8 sm:flex" style={{ background: "linear-gradient(135deg, #2874f0 0%, #1a5dc8 100%)" }}>
          <div>
            <h2 className="text-2xl font-bold text-white">Looks like you&apos;re new here!</h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100">
              Sign up with your details to get started
            </p>
          </div>
          <div className="mt-auto">
            <svg width="180" height="140" viewBox="0 0 200 160" fill="none" className="opacity-50">
              <rect x="30" y="40" width="140" height="100" rx="8" fill="white" fillOpacity="0.15" />
              <circle cx="100" cy="60" r="25" fill="white" fillOpacity="0.2" />
              <rect x="70" y="95" width="60" height="8" rx="4" fill="white" fillOpacity="0.2" />
              <rect x="80" y="110" width="40" height="8" rx="4" fill="white" fillOpacity="0.15" />
            </svg>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-1 flex-col px-8 py-10 sm:px-10">
          {error && (
            <div className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-fk-red">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-fk-text-light">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setFieldErrors((p) => ({ ...p, name: undefined })); }}
                className={`w-full border-b-2 py-2 text-sm text-fk-text outline-none transition-colors focus:border-fk-blue ${
                  fieldErrors.name ? "border-fk-red" : "border-gray-300"
                }`}
                placeholder="Enter your name"
                autoComplete="name"
              />
              {fieldErrors.name && <p className="mt-1 text-xs text-fk-red">{fieldErrors.name}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-fk-text-light">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
                className={`w-full border-b-2 py-2 text-sm text-fk-text outline-none transition-colors focus:border-fk-blue ${
                  fieldErrors.email ? "border-fk-red" : "border-gray-300"
                }`}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-fk-red">{fieldErrors.email}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-fk-text-light">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: undefined })); }}
                className={`w-full border-b-2 py-2 text-sm text-fk-text outline-none transition-colors focus:border-fk-blue ${
                  fieldErrors.password ? "border-fk-red" : "border-gray-300"
                }`}
                placeholder="Create a password (min 6 characters)"
                autoComplete="new-password"
              />
              {fieldErrors.password && <p className="mt-1 text-xs text-fk-red">{fieldErrors.password}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-fk-text-light">
                Phone Number <span className="text-fk-text-light">(optional)</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); setFieldErrors((p) => ({ ...p, phone: undefined })); }}
                maxLength={10}
                className={`w-full border-b-2 py-2 text-sm text-fk-text outline-none transition-colors focus:border-fk-blue ${
                  fieldErrors.phone ? "border-fk-red" : "border-gray-300"
                }`}
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
              {fieldErrors.phone && <p className="mt-1 text-xs text-fk-red">{fieldErrors.phone}</p>}
            </div>

            <p className="text-xs text-fk-text-light">
              By continuing, you agree to Flipkart&apos;s{" "}
              <span className="text-fk-blue">Terms of Use</span> and{" "}
              <span className="text-fk-blue">Privacy Policy</span>.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full rounded-sm bg-fk-orange py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-amber-500 disabled:opacity-60"
            >
              {submitting ? "Creating account…" : "Continue"}
            </button>

            <div className="mt-auto pt-4 text-center">
              <Link
                href="/login"
                className="text-sm font-semibold text-fk-blue hover:underline"
              >
                Existing User? Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
