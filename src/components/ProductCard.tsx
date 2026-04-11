"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  images: string;
  category?: string;
};

export default function ProductCard({ id, name, slug, price, salePrice, images, category }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const imageList: string[] = JSON.parse(images);
  const mainImage = imageList[0] || "/images/placeholder.svg";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, price: salePrice || price, image: mainImage, slug });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover">
      <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {salePrice && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
            SALE
          </span>
        )}
      </Link>
      <div className="p-4">
        {category && (
          <span className="text-xs text-[#702E3E]/60 font-semibold uppercase tracking-wider">{category}</span>
        )}
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-gray-900 mt-1.5 line-clamp-2 hover:text-[#702E3E] transition-colors text-sm leading-snug">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className={`font-bold text-lg ${salePrice ? "text-red-500" : "text-gray-900"}`}>
              {formatPrice(salePrice || price)}
            </span>
            {salePrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              added
                ? "bg-green-500 text-white scale-110"
                : "bg-[#702E3E] text-white hover:bg-[#5a2432] hover:shadow-md hover:shadow-[#702E3E]/20"
            }`}
            aria-label={`Add ${name} to cart`}
          >
            {added ? <Check size={16} /> : <ShoppingCart size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
