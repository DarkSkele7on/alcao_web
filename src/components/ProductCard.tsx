"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/utils";

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
  const imageList: string[] = JSON.parse(images);
  const mainImage = imageList[0] || "/images/placeholder.svg";

  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={mainImage}
          alt={name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {salePrice && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
      </Link>
      <div className="p-4">
        {category && (
          <span className="text-xs text-[#702E3E]/70 font-medium uppercase tracking-wide">{category}</span>
        )}
        <Link href={`/product/${slug}`}>
          <h3 className="font-medium text-gray-900 mt-1 line-clamp-2 hover:text-[#702E3E] transition-colors text-sm">
            {name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${salePrice ? "text-red-500" : "text-gray-900"}`}>
              {formatPrice(salePrice || price)}
            </span>
            {salePrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(price)}</span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem({ id, name, price: salePrice || price, image: mainImage, slug });
            }}
            className="p-2 bg-[#702E3E] text-white rounded-lg hover:bg-[#5a2432] transition-colors"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
