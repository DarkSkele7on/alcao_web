"use client";

import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

export default function AddToCartButton({ id, name, price, image, slug }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, name, price, image, slug });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-bold text-white transition-all ${
        added ? "bg-green-600" : "bg-[#702E3E] hover:bg-[#5a2432]"
      }`}
    >
      {added ? (
        <>
          <Check size={20} /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={20} /> Add to Cart
        </>
      )}
    </button>
  );
}
