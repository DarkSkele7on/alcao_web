import { prisma } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      price: true,
      salePrice: true,
      description: true,
      inStock: true,
      featured: true,
    },
  });

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        salePrice: body.salePrice,
        description: body.description,
        inStock: body.inStock,
        featured: body.featured,
      },
    });

    return Response.json(updated);
  } catch {
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }
}
