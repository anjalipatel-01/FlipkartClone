"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUser, FiPackage, FiHeart, FiChevronRight, FiMapPin,
  FiCreditCard, FiLogOut, FiBell, FiStar, FiGift, FiEdit2,
} from "react-icons/fi";
import { useAuth } from "@/lib/authContext";
import { useWishlist } from "@/lib/wishlistContext";
import { updateProfile } from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, refreshUser } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const [editingPersonal, setEditingPersonal] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPhone, setEditingPhone] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (user) {
      const parts = user.name.split(" ");
      setFirstName(parts[0] || "");
      setLastName(parts.slice(1).join(" ") || "");
      setGender(user.gender || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-4 py-24">
        <FiUser size={48} className="text-gray-300" />
        <p className="text-lg font-semibold text-fk-text">Please login to view your profile</p>
        <Link href="/login" className="rounded-sm bg-fk-orange px-8 py-3 text-sm font-bold text-white hover:bg-amber-500">
          Login
        </Link>
      </div>
    );
  }

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleSavePersonal = async () => {
    if (!firstName.trim()) { showToast("First name is required"); return; }
    setSaving(true);
    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await updateProfile({ name: fullName, gender: gender || undefined });
      if (refreshUser) await refreshUser();
      setEditingPersonal(false);
      showToast("Personal information updated");
    } catch {
      showToast("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleSavePhone = async () => {
    if (phone.trim() && !/^\d{10}$/.test(phone.trim())) { showToast("Enter a valid 10-digit phone number"); return; }
    setSaving(true);
    try {
      await updateProfile({ phone: phone.trim() || undefined });
      if (refreshUser) await refreshUser();
      setEditingPhone(false);
      showToast("Mobile number updated");
    } catch {
      showToast("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  /* ── Sidebar nav items ── */
  type SidebarItem = { label: string; href: string; active?: boolean; chevron?: boolean; badge?: number };
  const sidebarSections: { heading: string; icon: React.ReactNode; items: SidebarItem[] }[] = [
    {
      heading: "MY ORDERS",
      icon: <FiPackage size={20} className="text-fk-blue" />,
      items: [
        { label: "Orders", href: "/orders", chevron: true },
      ],
    },
    {
      heading: "ACCOUNT SETTINGS",
      icon: <FiUser size={20} className="text-fk-blue" />,
      items: [
        { label: "Profile Information", href: "/profile", active: true },
        { label: "Manage Addresses", href: "#" },
      ],
    },
    {
      heading: "MY STUFF",
      icon: <FiPackage size={20} className="text-fk-blue" />,
      items: [
        { label: "My Wishlist", href: "/wishlist", badge: wishlistItems.length > 0 ? wishlistItems.length : undefined },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-fk-bg">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 z-50 -translate-x-1/2 rounded-md bg-fk-green px-6 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="mx-auto flex max-w-[1200px] gap-4 px-4 py-5">
        {/* ══ LEFT SIDEBAR ══ */}
        <aside className="hidden w-[270px] shrink-0 lg:block">
          {/* User card */}
          <div className="mb-3 flex items-center gap-3 rounded-sm bg-white px-4 py-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <FiUser size={24} className="text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-fk-text-light">Hello,</p>
              <p className="text-sm font-semibold text-fk-text">{user.name}</p>
            </div>
          </div>

          {/* Nav sections */}
          <div className="rounded-sm bg-white shadow-sm">
            {sidebarSections.map((section, si) => (
              <div key={si}>
                {/* Section Heading — clickable link for MY ORDERS */}
                {section.heading === "MY ORDERS" ? (
                  <Link
                    href="/orders"
                    className="flex items-center justify-between border-b border-gray-100 px-5 py-4 hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-4">
                      {section.icon}
                      <span className="text-sm font-semibold tracking-wide text-fk-text-light uppercase">
                        {section.heading}
                      </span>
                    </span>
                    <FiChevronRight size={16} className="text-fk-text-light" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4">
                    {section.icon}
                    <span className="text-sm font-semibold tracking-wide text-fk-text-light uppercase">
                      {section.heading}
                    </span>
                  </div>
                )}

                {/* Section Items */}
                {section.items.map((item, ii) => (
                  <Link
                    key={ii}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-gray-50 ${
                      item.active
                        ? "border-l-[3px] border-fk-blue bg-blue-50/40 font-semibold text-fk-blue"
                        : "border-l-[3px] border-transparent text-fk-text"
                    }`}
                  >
                    <span className="pl-5">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-fk-text-light">
                        {item.badge}
                      </span>
                    )}
                    {item.chevron && <FiChevronRight size={14} className="text-fk-text-light" />}
                  </Link>
                ))}
              </div>
            ))}

            {/* Logout */}
            <button
              onClick={async () => { await logout(); router.push("/"); }}
              className="flex w-full items-center gap-4 border-t border-gray-100 px-5 py-4 text-sm text-fk-text-light hover:bg-gray-50"
            >
              <FiLogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        <main className="flex-1">
          {/* ── Personal Information ── */}
          <section className="mb-4 rounded-sm bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-4">
              <h2 className="text-lg font-bold text-fk-text">Personal Information</h2>
              <button
                onClick={() => setEditingPersonal(!editingPersonal)}
                className="text-sm font-semibold text-fk-blue hover:underline"
              >
                {editingPersonal ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row">
              <div className="flex-1">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!editingPersonal}
                  placeholder="First Name"
                  className={`w-full rounded border px-4 py-3 text-sm transition-colors ${
                    editingPersonal
                      ? "border-fk-blue bg-white text-fk-text"
                      : "border-gray-200 bg-gray-50 text-fk-text-light"
                  }`}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!editingPersonal}
                  placeholder="Last Name"
                  className={`w-full rounded border px-4 py-3 text-sm transition-colors ${
                    editingPersonal
                      ? "border-fk-blue bg-white text-fk-text"
                      : "border-gray-200 bg-gray-50 text-fk-text-light"
                  }`}
                />
              </div>
            </div>

            {/* Gender */}
            <div className="mb-6">
              <p className="mb-2 text-sm text-fk-text">Your Gender</p>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-sm text-fk-text">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!editingPersonal}
                    className="h-4 w-4 accent-fk-blue"
                  />
                  Male
                </label>
                <label className="flex items-center gap-2 text-sm text-fk-text">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    disabled={!editingPersonal}
                    className="h-4 w-4 accent-fk-blue"
                  />
                  Female
                </label>
              </div>
            </div>

            {editingPersonal && (
              <button
                onClick={handleSavePersonal}
                disabled={saving}
                className="rounded-sm bg-fk-blue px-10 py-3 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </section>

          {/* ── Email Address ── */}
          <section className="mb-4 rounded-sm bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-lg font-bold text-fk-text">Email Address</h2>
            </div>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full max-w-md rounded border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-fk-text-light"
            />
          </section>

          {/* ── Mobile Number ── */}
          <section className="mb-4 rounded-sm bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-lg font-bold text-fk-text">Mobile Number</h2>
              <button
                onClick={() => setEditingPhone(!editingPhone)}
                className="text-sm font-semibold text-fk-blue hover:underline"
              >
                {editingPhone ? "Cancel" : "Edit"}
              </button>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!editingPhone}
              placeholder="+91 Phone number"
              className={`w-full max-w-md rounded border px-4 py-3 text-sm transition-colors ${
                editingPhone
                  ? "border-fk-blue bg-white text-fk-text"
                  : "border-gray-200 bg-gray-50 text-fk-text-light"
              }`}
            />
            {editingPhone && (
              <button
                onClick={handleSavePhone}
                disabled={saving}
                className="mt-4 rounded-sm bg-fk-blue px-10 py-3 text-sm font-bold text-white hover:bg-blue-600 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            )}
          </section>

          {/* ── FAQs ── */}
          <section className="rounded-sm bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-fk-text">FAQs</h2>

            <div className="space-y-6">
              <div>
                <p className="mb-1 text-sm font-semibold text-fk-text">
                  What happens when I update my email address (or mobile number)?
                </p>
                <p className="text-sm leading-relaxed text-fk-text-light">
                  Your login email id (or mobile number) changes, likewise. You&apos;ll receive all your account related communication on your updated email address (or mobile number).
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-fk-text">
                  When will my Flipkart account be updated with the new email address (or mobile number)?
                </p>
                <p className="text-sm leading-relaxed text-fk-text-light">
                  It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-fk-text">
                  What happens to my existing Flipkart account when I update my email address (or mobile number)?
                </p>
                <p className="text-sm leading-relaxed text-fk-text-light">
                  Updating your email address (or mobile number) doesn&apos;t invalidate your account. Your account remains fully functional. You&apos;ll continue seeing your Order history, saved information and personal details.
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-fk-text">
                  Does my Seller account get affected when I update my email address?
                </p>
                <p className="text-sm leading-relaxed text-fk-text-light">
                  Flipkart has a &apos;single sign-on&apos; policy. Any changes will reflect in your Seller account also.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button className="block text-sm font-semibold text-fk-blue hover:underline">
                Deactivate Account
              </button>
              <button className="block text-sm font-semibold text-fk-red hover:underline">
                Delete Account
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
