"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import { getMe, loginUser, registerUser, logoutUser, type User } from "@/lib/api";
import { FiCheck, FiLogOut as FiLogOutIcon } from "react-icons/fi";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info"; show: boolean; fading: boolean }>({ message: "", type: "success", show: false, fading: false });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: "success" | "info" = "success") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setToast({ message, type, show: true, fading: false });
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, fading: true }));
      fadeTimer.current = setTimeout(() => setToast({ message: "", type: "success", show: false, fading: false }), 350);
    }, 3000);
  }, []);

  useEffect(() => {
    getMe()
      .then((res) => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);
    setUser(res.data.data);
    showToast(`Welcome back, ${res.data.data.name.split(" ")[0]}!`);
  }, [showToast]);

  const register = useCallback(async (data: { name: string; email: string; password: string; phone?: string }) => {
    const res = await registerUser(data);
    setUser(res.data.data);
    showToast(`Account created! Welcome, ${res.data.data.name.split(" ")[0]}!`);
  }, [showToast]);

  const logout = useCallback(async () => {
    await logoutUser();
    setUser(null);
    showToast("You have been logged out", "info");
  }, [showToast]);

  const refreshUser = useCallback(async () => {
    try {
      const res = await getMe();
      setUser(res.data.data);
    } catch {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}

      {/* Auth toast notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-3 rounded-lg px-5 py-3 shadow-2xl transition-all duration-300 ${
            toast.fading ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
          } ${toast.type === "success" ? "bg-[#212121]" : "bg-[#333]"}`}
        >
          <span className={`flex h-6 w-6 items-center justify-center rounded-full ${toast.type === "success" ? "bg-fk-green" : "bg-fk-blue"}`}>
            {toast.type === "success" ? <FiCheck size={14} className="text-white" strokeWidth={3} /> : <FiLogOutIcon size={13} className="text-white" />}
          </span>
          <span className="text-sm font-medium text-white">{toast.message}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
