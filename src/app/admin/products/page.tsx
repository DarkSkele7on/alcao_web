import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Products</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Sale Price</th>
                <th className="px-6 py-3 text-center">In Stock</th>
                <th className="px-6 py-3 text-center">Featured</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{product.name}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {product.category.name}
                  </td>
                  <td className="px-6 py-3 text-right">
                    &euro;{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-right">
                    {product.salePrice
                      ? `€${product.salePrice.toFixed(2)}`
                      : "-"}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {product.inStock ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-center">
                    {product.featured ? (
                      <span className="text-[#702E3E] font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-[#702E3E] hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
