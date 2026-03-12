import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CategoryBar from "@/components/CategoryBar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from "@/lib/authContext";
import { WishlistProvider } from "@/lib/wishlistContext";

export const metadata: Metadata = {
  title: "Flipkart Clone",
  description: "Online shopping - Best deals, best prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
        <WishlistProvider>
        <CartProvider>
          <Navbar />
          <Suspense>
            <CategoryBar />
          </Suspense>
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
        </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
