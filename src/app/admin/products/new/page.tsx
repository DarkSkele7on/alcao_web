"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { slugify } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState("");
  const [weight, setWeight] = useState("");
  const [cocoaPercentage, setCocoaPercentage] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");
  const [sku, setSku] = useState("");
  const [inStock, setInStock] = useState(true);
  const [featured, setFeatured] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id);
        }
      });
  }, []);

  const slug = slugify(name);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      setMessage("Please fill in name, price, and category.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          salePrice: salePrice || null,
          description: description || null,
          categoryId,
          images: images || "[]",
          weight: weight || null,
          cocoaPercentage: cocoaPercentage || null,
          fatPercentage: fatPercentage || null,
          sku: sku || null,
          inStock,
          featured,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        setMessage(data.error || "Error creating product.");
      }
    } catch {
      setMessage("Error creating product.");
    } finally {
      setSaving(false);
    }
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
        <h2 className="text-2xl font-bold text-gray-900">Add Product</h2>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            required
          />
          {name && (
            <p className="text-xs text-gray-400 mt-1">
              Slug: {slug}
            </p>
          )}
        </div>

        {/* Price / Sale Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (&euro;)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sale Price (&euro;)
            </label>
            <input
              type="number"
              step="0.01"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              placeholder="Leave empty for no sale"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SKU
          </label>
          <input
            type="text"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            placeholder="Optional product SKU"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50 bg-white"
            required
          >
            {categories.length === 0 && (
              <option value="">Loading categories...</option>
            )}
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder='Image paths, e.g. ["/images/product1.jpg","/images/product2.jpg"]'
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
          />
          <p className="text-xs text-gray-400 mt-1">
            JSON array of image paths
          </p>
        </div>

        {/* Weight / Cocoa / Fat */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 100g"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cocoa %
            </label>
            <input
              type="text"
              value={cocoaPercentage}
              onChange={(e) => setCocoaPercentage(e.target.value)}
              placeholder="e.g. 70%"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fat %
            </label>
            <input
              type="text"
              value={fatPercentage}
              onChange={(e) => setFatPercentage(e.target.value)}
              placeholder="e.g. 35%"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#702E3E]/50"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="accent-[#702E3E]"
            />
            In Stock
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
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
            {saving ? "Creating..." : "Create Product"}
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
