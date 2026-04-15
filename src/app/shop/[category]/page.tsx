import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description || `Browse ${category.name} products from ALCAO.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: { children: true, parent: true },
  });

  if (!category) notFound();

  // Get products from this category AND all its children
  const childIds = category.children.map((c) => c.id);
  const categoryIds = [category.id, ...childIds];

  const [products, allCategories] = await Promise.all([
    prisma.product.findMany({
      where: { categoryId: { in: categoryIds } },
      include: { category: true },
      orderBy: { name: "asc" },
    }),
    prisma.category.findMany({
      where: { parentId: null },
      orderBy: { sortOrder: "asc" },
      include: { children: true },
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/shop" className="hover:text-[#702E3E]">Shop</Link>
        {category.parent && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${category.parent.slug}`} className="hover:text-[#702E3E]">
              {category.parent.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        {category.description && <p className="mt-2 text-gray-500">{category.description}</p>}
        <p className="mt-1 text-sm text-gray-400">{products.length} products</p>
      </div>

      {/* Subcategory pills */}
      {category.children.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href={`/shop/${category.slug}`}
            className="px-4 py-2 bg-[#702E3E] text-white rounded-full text-sm font-medium"
          >
            All
          </Link>
          {category.children.map((sub) => (
            <Link
              key={sub.id}
              href={`/shop/${sub.slug}`}
              className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-[#702E3E] hover:text-white rounded-full text-sm font-medium transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Categories</h2>
            <ul className="space-y-1">
              <li>
                <Link href="/shop" className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  All Products
                </Link>
              </li>
              {allCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop/${cat.slug}`}
                    className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                      cat.slug === slug || cat.id === category.parentId
                        ? "bg-[#702E3E] text-white font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </Link>
                  {cat.children.length > 0 && (
                    <ul className="ml-4 space-y-1">
                      {cat.children.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            href={`/shop/${sub.slug}`}
                            className={`block py-1.5 px-3 rounded-lg text-xs transition-colors ${
                              sub.slug === slug
                                ? "bg-[#702E3E]/10 text-[#702E3E] font-medium"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                            }`}
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
          {products.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p>No products found in this category.</p>
              <Link href="/shop" className="text-[#702E3E] font-medium mt-2 inline-block hover:underline">
                Browse all products
              </Link>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
