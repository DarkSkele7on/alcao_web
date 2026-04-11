"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "./CartProvider";
import Image from "next/image";

const shopCategories = [
  { name: "All Products", href: "/shop" },
  { name: "Chocolate", href: "/shop/chocolate" },
  { name: "Cocoa", href: "/shop/cocoa" },
  { name: "Confectionery", href: "/shop/confectionery" },
  { name: "Vegan", href: "/shop/vegan" },
  { name: "Cacaonly", href: "/shop/cacaonly" },
];

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#702E3E] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over &euro;150</span>
          <div className="hidden sm:flex gap-4">
            <a href="mailto:sales@alcao.eu" className="hover:underline">sales@alcao.eu</a>
            <span>|</span>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/alcao-logo.svg"
              alt="ALCAO"
              width={120}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-[#702E3E] font-medium transition-colors">
              Home
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <Link
                href="/shop"
                className="text-gray-700 hover:text-[#702E3E] font-medium transition-colors flex items-center gap-1"
              >
                Shop <ChevronDown size={16} />
              </Link>
              {shopDropdown && (
                <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] border border-gray-100">
                  {shopCategories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-[#702E3E]/5 hover:text-[#702E3E] transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/recipes" className="text-gray-700 hover:text-[#702E3E] font-medium transition-colors">
              Recipes
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#702E3E] font-medium transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#702E3E] font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[#702E3E] transition-colors">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#702E3E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 text-gray-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-3">
            <Link href="/" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            {shopCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block py-2 text-gray-700 pl-4"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/recipes" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>
              Recipes
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 font-medium" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
