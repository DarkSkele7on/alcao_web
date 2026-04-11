import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat } from "lucide-react";
import { prisma } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Discover delicious recipes using ALCAO's premium cocoa products and chocolate.",
};

export default async function RecipesPage() {
  const recipes = await prisma.recipe.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <>
      <section className="bg-[#702E3E] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Recipes</h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Get inspired with our collection of recipes using ALCAO&apos;s premium cocoa products
            and chocolate. From classic desserts to creative confections.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => {
            const products: string[] = JSON.parse(recipe.products);
            return (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.slug}`}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <ChefHat size={14} /> {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#702E3E] transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">{recipe.description}</p>
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 uppercase font-medium mb-2">Featured Products</p>
                    <div className="flex flex-wrap gap-2">
                      {products.map((product) => (
                        <span key={product} className="text-xs bg-[#702E3E]/10 text-[#702E3E] px-2 py-1 rounded">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
