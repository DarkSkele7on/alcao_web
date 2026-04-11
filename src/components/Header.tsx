"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown, Mail } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-black/5" : "border-b border-gray-100"}`}>
      {/* Top bar */}
      <div className="bg-[#702E3E] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="flex items-center gap-1.5 text-white/90">
            <span>Free shipping on orders over &euro;150</span>
          </span>
          <div className="hidden sm:flex items-center gap-4">
            <a href="mailto:sales@alcao.eu" className="hover:text-white/80 transition-colors flex items-center gap-1.5">
              <Mail size={13} /> sales@alcao.eu
            </a>
            <span className="text-white/30">|</span>
            <Link href="/contact" className="hover:text-white/80 transition-colors">Contact Us</Link>
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
          <div className="hidden lg:flex items-center gap-1">
            {[
              { name: "Home", href: "/" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-[#702E3E] font-medium transition-colors rounded-lg hover:bg-[#702E3E]/5"
              >
                {item.name}
              </Link>
            ))}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdown(true)}
              onMouseLeave={() => setShopDropdown(false)}
            >
              <Link
                href="/shop"
                className="px-4 py-2 text-gray-600 hover:text-[#702E3E] font-medium transition-colors flex items-center gap-1 rounded-lg hover:bg-[#702E3E]/5"
              >
                Shop <ChevronDown size={15} className={`transition-transform duration-200 ${shopDropdown ? "rotate-180" : ""}`} />
              </Link>
              {shopDropdown && (
                <div className="absolute top-full left-0 pt-1">
                  <div className="bg-white shadow-xl shadow-black/8 rounded-xl py-2 min-w-[220px] border border-gray-100">
                    {shopCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-4 py-2.5 text-gray-600 hover:bg-[#702E3E]/5 hover:text-[#702E3E] transition-colors text-sm font-medium"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {[
              { name: "Recipes", href: "/recipes" },
              { name: "About Us", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-600 hover:text-[#702E3E] font-medium transition-colors rounded-lg hover:bg-[#702E3E]/5"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2.5 text-gray-600 hover:text-[#702E3E] transition-colors rounded-xl hover:bg-[#702E3E]/5"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#702E3E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-sm animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-[#702E3E] rounded-lg hover:bg-[#702E3E]/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4 space-y-1 animate-fade-in">
            <Link href="/" className="block py-2.5 px-3 text-gray-700 font-medium rounded-lg hover:bg-[#702E3E]/5" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <div className="py-1 px-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Shop</p>
            </div>
            {shopCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block py-2 px-6 text-gray-600 rounded-lg hover:bg-[#702E3E]/5"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/recipes" className="block py-2.5 px-3 text-gray-700 font-medium rounded-lg hover:bg-[#702E3E]/5" onClick={() => setMobileOpen(false)}>
              Recipes
            </Link>
            <Link href="/about" className="block py-2.5 px-3 text-gray-700 font-medium rounded-lg hover:bg-[#702E3E]/5" onClick={() => setMobileOpen(false)}>
              About Us
            </Link>
            <Link href="/contact" className="block py-2.5 px-3 text-gray-700 font-medium rounded-lg hover:bg-[#702E3E]/5" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
