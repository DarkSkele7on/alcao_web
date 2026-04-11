"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface ProductData {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  description: string | null;
  inStock: boolean;
  featured: boolean;
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    setMessage("");

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        description: product.description,
        inStock: product.inStock,
        featured: product.featured,
      }),
    });

    if (res.ok) {
      setMessage("Product saved successfully.");
    } else {
      setMessage("Error saving product.");
    }
    setSaving(false);
  }

  if (!product) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/products"
          className="text-[#702E3E] hover:underline text-sm"
        >
          &larr; Back to Products
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Edit Product</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 max-w-2xl space-y-5"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
          />
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (&euro;)
            </label>
            <input
              type="number"
              step="0.01"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) || 0 })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Price (&euro;)
            </label>
            <input
              type="number"
              step="0.01"
              value={product.salePrice ?? ""}
              onChange={(e) =>
                setProduct({
                  ...product,
                  salePrice: e.target.value ? parseFloat(e.target.value) : null,
                })
              }
              placeholder="Leave empty for no sale"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={product.description ?? ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value || null })
            }
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={product.inStock}
              onChange={(e) =>
                setProduct({ ...product, inStock: e.target.checked })
              }
              className="accent-[#702E3E]"
            />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={product.featured}
              onChange={(e) =>
                setProduct({ ...product, featured: e.target.checked })
              }
              className="accent-[#702E3E]"
            />
            Featured
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 bg-[#702E3E] text-white rounded hover:bg-[#5a2532] transition-colors text-sm disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && (
            <p
              className={`text-sm ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
