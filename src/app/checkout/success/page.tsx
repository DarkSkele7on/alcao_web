"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <CheckCircle className="mx-auto text-green-500" size={64} />
      <h1 className="text-3xl font-bold text-gray-900 mt-6">Order Confirmed!</h1>
      <p className="text-gray-500 mt-4">
        Thank you for your purchase! Your order has been placed successfully.
        If you have any questions about your order, please contact us at sales@alcao.eu.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 bg-[#702E3E] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#5a2432] transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-50 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
