import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE_URL = "https://alcao.eu";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, recipes] = await Promise.all([
    prisma.product.findMany({
      select: { slug: true, createdAt: true },
    }),
    prisma.category.findMany({
      select: { slug: true, createdAt: true },
    }),
    prisma.recipe.findMany({
      select: { slug: true, createdAt: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/recipes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/shop/${category.slug}`,
    lastModified: category.createdAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/recipes/${recipe.slug}`,
    lastModified: recipe.createdAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...categoryPages, ...recipePages];
}
