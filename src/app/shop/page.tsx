import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse ALCAO's full range of premium cocoa products and chocolate.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { name: "asc" } }),
    prisma.category.findMany({ where: { parentId: null }, orderBy: { sortOrder: "asc" }, include: { children: true } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500">{products.length} products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className="block py-2 px-3 bg-[#702E3E] text-white rounded-lg font-medium text-sm">
                  All Products
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                  >
                    {cat.name}
                  </Link>
                  {cat.children.length > 0 && (
                    <ul className="ml-4 space-y-1">
                      {cat.children.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={`/shop/${sub.slug}`}
                            className="block py-1.5 px-3 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg text-xs transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                salePrice={product.salePrice}
                images={product.images}
                category={product.category.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
