import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const slug = slugify(body.name);

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug,
        price: parseFloat(body.price),
        salePrice: body.salePrice ? parseFloat(body.salePrice) : null,
        description: body.description || null,
        categoryId: body.categoryId,
        images: body.images || "[]",
        weight: body.weight || null,
        sku: body.sku || null,
        minCocoa: body.cocoaPercentage || null,
        fatPercent: body.fatPercentage || null,
        inStock: body.inStock ?? true,
        featured: body.featured ?? false,
      },
    });

    return Response.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return Response.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
