import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Truck, Shield, Award, Sparkles } from "lucide-react";
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
      <section className="relative overflow-hidden hero-pattern min-h-[85vh] flex items-center" style={{ background: "linear-gradient(to bottom right, #702E3E, #5a2432, #3d1520)" }}>
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[#f0c8d0]/[0.04] rounded-full blur-3xl" style={{ animation: "float 8s ease-in-out infinite reverse" }} />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-white/[0.02] rounded-full blur-xl animate-float" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-md text-white/80 text-sm px-5 py-2.5 rounded-full mb-8 border border-white/[0.08] animate-fade-in">
              <Sparkles size={14} className="text-[#f0c8d0]" />
              <span>Premium quality by ALTINMARKA GROUP</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight animate-slide-up">
              Premium Cocoa &<br />
              <span className="text-white/90">Chocolate Products</span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: "200ms", animationFillMode: "both" }}>
              From bean to perfection. ALCAO delivers world-class cocoa products and chocolate
              for professionals, HORECA, and home bakers.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "400ms", animationFillMode: "both" }}>
              <Link
                href="/shop"
                className="group inline-flex items-center gap-2 bg-white text-[#702E3E] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5"
              >
                Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 glass text-white px-8 py-4 rounded-xl font-bold hover:bg-white/15 transition-all duration-300 hover:-translate-y-0.5"
              >
                About ALCAO
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 80L48 73.3C96 66.7 192 53.3 288 46.7C384 40 480 40 576 43.3C672 46.7 768 53.3 864 53.3C960 53.3 1056 46.7 1152 40C1248 33.3 1344 26.7 1392 23.3L1440 20V80H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 -mt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over \u20AC150" },
              { icon: Shield, title: "Secure Payment", desc: "Stripe encrypted checkout" },
              { icon: Award, title: "Premium Quality", desc: "By ALTINMARKA GROUP" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 justify-center p-5 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 card-hover">
                <div className="p-3 bg-gradient-to-br from-[#702E3E]/10 to-[#702E3E]/5 rounded-xl">
                  <Icon className="text-[#702E3E]" size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-14 section-divider pt-8">
          <p className="text-[#702E3E] font-semibold text-sm uppercase tracking-wider mb-3">Browse</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-4 text-gray-500 text-lg">Explore our premium product range</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 card-hover block"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#702E3E] via-[#702E3E]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="font-bold text-lg">{cat.name}</h3>
                <p className="text-sm text-white/70 mt-1">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-white/50 mt-3 group-hover:text-white/80 transition-all group-hover:gap-2">
                  Shop now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#702E3E] font-semibold text-sm uppercase tracking-wider mb-2">Most Popular</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Best Sellers</h2>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-2 text-[#702E3E] font-semibold hover:gap-3 transition-all group"
            >
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
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
        <div className="relative rounded-3xl overflow-hidden hero-pattern" style={{ background: "linear-gradient(to bottom right, #702E3E, #5a2432, #3d1520)" }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#f0c8d0]/5 rounded-full blur-2xl" />
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
              <p className="text-[#f0c8d0] font-semibold text-sm uppercase tracking-wider mb-3">Inspiration</p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">Get Inspired</h2>
              <p className="mt-5 text-white/60 leading-relaxed text-lg">
                Discover delicious recipes using our premium cocoa products and chocolate.
                From professional confections to home baking favorites.
              </p>
              <Link
                href="/recipes"
                className="mt-10 group inline-flex items-center gap-2 bg-white text-[#702E3E] px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all self-start hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-0.5"
              >
                Browse Recipes <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative h-72 md:h-auto min-h-[350px]">
              <Image
                src="/images/products/Brownie.avif"
                alt="Recipes"
                fill
                className="object-cover"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#5a2432] to-transparent md:opacity-40" />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 text-center section-divider pt-8">
          <p className="text-[#702E3E] font-semibold text-sm uppercase tracking-wider mb-3">Since 2012</p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">Part of a Global Legacy</h2>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            ALCAO EOOD, founded in 2012, is wholly owned by ALTINMARKA GROUP &mdash; one of the
            world&apos;s largest cocoa and chocolate manufacturers. We bring decades of expertise
            and the finest ingredients to every product.
          </p>
          <Link
            href="/about"
            className="mt-10 group inline-flex items-center gap-2 bg-[#702E3E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#5a2432] transition-all hover:shadow-lg hover:shadow-[#702E3E]/20 hover:-translate-y-0.5"
          >
            Learn More About Us <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
