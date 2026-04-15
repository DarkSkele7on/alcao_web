import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description?.slice(0, 160) || `${product.name} - Premium product from ALCAO.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: { include: { parent: true } } },
  });

  if (!product) notFound();

  const images: string[] = JSON.parse(product.images);

  // Related products from same category
  const related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id } },
    include: { category: true },
    take: 4,
  });

  const specs = [
    { label: "Weight", value: product.weight },
    { label: "Min. Cocoa", value: product.minCocoa },
    { label: "Fat Content", value: product.fatPercent },
    { label: "SKU", value: product.sku },
  ].filter((s) => s.value);

  const parentCategory = product.category.parent || product.category;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/shop" className="hover:text-[#702E3E]">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${parentCategory.slug}`} className="hover:text-[#702E3E]">
          {parentCategory.name}
        </Link>
        {product.category.parent && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/shop/${product.category.slug}`} className="hover:text-[#702E3E]">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={images[0]}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image src={img} alt={`${product.name} view ${i + 1}`} fill className="object-contain p-2" sizes="100px" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <span className="text-sm text-[#702E3E] font-medium uppercase tracking-wide">
            {product.category.name}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>

          <div className="flex items-center gap-3 mt-4">
            <span className={`text-3xl font-bold ${product.salePrice ? "text-red-500" : "text-gray-900"}`}>
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-xl text-gray-400 line-through">{formatPrice(product.price)}</span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className={`inline-block w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm text-gray-600">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          {/* Specs */}
          {specs.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase">{spec.label}</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add to Cart */}
          <div className="mt-8">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.salePrice || product.price}
              image={images[0]}
              slug={product.slug}
            />
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-8 border-t pt-6">
              <h2 className="font-bold text-gray-900 mb-3">Description</h2>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                slug={p.slug}
                price={p.price}
                salePrice={p.salePrice}
                images={p.images}
                category={p.category.name}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
