import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

export const metadata: Metadata = {
  title: {
    default: "ALCAO - Premium Cocoa & Chocolate Products",
    template: "%s | ALCAO",
  },
  description:
    "ALCAO EOOD - Premium cocoa products and chocolate by ALTINMARKA GROUP. Couverture chocolate, cocoa powder, cocoa butter, and professional confectionery ingredients.",
  keywords: [
    "cocoa",
    "chocolate",
    "couverture",
    "cocoa powder",
    "cocoa butter",
    "ALCAO",
    "ALTINMARKA",
    "B2B",
    "HORECA",
    "confectionery",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
