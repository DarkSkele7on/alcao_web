import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Award } from "lucide-react";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/ProductCard";

const categories = [
  { name: "Chocolate", slug: "chocolate", image: "/images/products/alt45darkcouverture200.avif", description: "Couverture, drops, coins & more" },
  { name: "Cocoa", slug: "cocoa", image: "/images/products/N10-12 25.avif", description: "Powder, butter, nibs & mass" },
  { name: "Confectionery", slug: "confectionery", image: "/images/products/alt222.avif", description: "Creams, pralines & krispi" },
  { name: "Vegan", slug: "vegan", image: "/images/products/alt219vegan.avif", description: "Plant-based alternatives" },
  { name: "Cacaonly", slug: "cacaonly", image: "/images/products/Cacaonly 500gr.avif", description: "100% cocoa, no added sugar" },
];

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    include: { category: true },
    take: 8,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#702E3E] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#702E3E] via-[#702E3E]/95 to-[#702E3E]/70" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Premium Cocoa &<br />
              <span className="text-white/90">Chocolate Products</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 max-w-lg">
              From bean to perfection. ALCAO delivers world-class cocoa products and chocolate
              for professionals, HORECA, and home bakers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-white text-[#702E3E] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
              >
                About ALCAO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 py-8 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <Truck className="text-[#702E3E]" size={28} />
              <div>
                <p className="font-semibold text-gray-900">Free Shipping</p>
                <p className="text-sm text-gray-500">On orders over &euro;150</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Shield className="text-[#702E3E]" size={28} />
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-500">Stripe encrypted checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Award className="text-[#702E3E]" size={28} />
              <div>
                <p className="font-semibold text-gray-900">Premium Quality</p>
                <p className="text-sm text-gray-500">By ALTINMARKA GROUP</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-500">Explore our premium product range</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] bg-gray-100"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#702E3E]/90 via-[#702E3E]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-sm text-white/80 mt-1">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Best Sellers</h2>
              <p className="mt-2 text-gray-500">Our most popular products</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[#702E3E] font-semibold hover:underline"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
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
          <div className="md:hidden text-center mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[#702E3E] font-semibold"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recipes CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-[#702E3E] rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white">Get Inspired</h2>
              <p className="mt-4 text-white/80">
                Discover delicious recipes using our premium cocoa products and chocolate.
                From professional confections to home baking favorites.
              </p>
              <Link
                href="/recipes"
                className="mt-6 inline-flex items-center gap-2 bg-white text-[#702E3E] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors self-start"
              >
                Browse Recipes <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative h-64 md:h-auto">
              <Image
                src="/images/products/Brownie.avif"
                alt="Recipes"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Part of a Global Legacy</h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            ALCAO EOOD, founded in 2012, is wholly owned by ALTINMARKA GROUP &mdash; one of the
            world&apos;s largest cocoa and chocolate manufacturers. We bring decades of expertise
            and the finest ingredients to every product.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 text-[#702E3E] font-semibold hover:underline"
          >
            Learn More About Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
