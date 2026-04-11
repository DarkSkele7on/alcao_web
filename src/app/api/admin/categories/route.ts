import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    });

    return Response.json(categories);
  } catch {
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
