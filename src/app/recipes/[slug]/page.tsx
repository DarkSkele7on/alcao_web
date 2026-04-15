import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat, ArrowLeft, Users } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { slug } });
  if (!recipe) return { title: "Recipe Not Found" };
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const recipe = await prisma.recipe.findUnique({ where: { slug } });

  if (!recipe) notFound();

  const ingredients: string[] = JSON.parse(recipe.ingredients);
  const steps: string[] = JSON.parse(recipe.steps);
  const products: string[] = JSON.parse(recipe.products);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/recipes" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#702E3E] mb-6 text-sm">
        <ArrowLeft size={16} /> Back to Recipes
      </Link>

      {/* Hero image */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>

      {/* Title and meta */}
      <div className="mt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{recipe.title}</h1>
        <p className="mt-3 text-gray-600 text-lg">{recipe.description}</p>

        <div className="flex flex-wrap items-center gap-6 mt-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <Clock size={18} className="text-[#702E3E]" /> {recipe.time}
          </span>
          <span className="flex items-center gap-2">
            <ChefHat size={18} className="text-[#702E3E]" /> {recipe.difficulty}
          </span>
          <span className="flex items-center gap-2">
            <Users size={18} className="text-[#702E3E]" /> 4 servings
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {/* Ingredients */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Ingredients</h2>
            <ul className="space-y-3">
              {ingredients.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-[#702E3E] mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-bold text-gray-900 mb-3">ALCAO Products Used</h3>
              <div className="flex flex-wrap gap-2">
                {products.map((product) => (
                  <span key={product} className="text-xs bg-[#702E3E]/10 text-[#702E3E] px-2 py-1 rounded font-medium">
                    {product}
                  </span>
                ))}
              </div>
              <Link
                href="/shop"
                className="mt-4 block text-sm text-[#702E3E] font-medium hover:underline"
              >
                Shop these products &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Instructions</h2>
          <ol className="space-y-6">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-[#702E3E] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
