import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) notFound();

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/orders"
          className="text-[#702E3E] hover:underline text-sm"
        >
          &larr; Back to Orders
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
        <span
          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
            order.status === "paid"
              ? "bg-green-100 text-green-800"
              : order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Order info */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Order Info
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Order ID</dt>
              <dd className="font-mono text-xs">{order.id}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Stripe ID</dt>
              <dd className="font-mono text-xs">{order.stripeId || "-"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Date</dt>
              <dd>{new Date(order.createdAt).toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Subtotal</dt>
              <dd>&euro;{order.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Shipping</dt>
              <dd>&euro;{order.shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between font-bold">
              <dt>Total</dt>
              <dd>&euro;{order.total.toFixed(2)}</dd>
            </div>
          </dl>
        </div>

        {/* Customer & Shipping */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Customer & Shipping
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500">Name</dt>
              <dd>{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Email</dt>
              <dd>{order.customerEmail}</dd>
            </div>
            {order.phone && (
              <div className="flex justify-between">
                <dt className="text-gray-500">Phone</dt>
                <dd>{order.phone}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-gray-500">Address</dt>
              <dd className="text-right">{order.address}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">City</dt>
              <dd>{order.city}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Postal Code</dt>
              <dd>{order.postalCode}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500">Country</dt>
              <dd>{order.country}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Order items */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Items</h3>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Product</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-right">Qty</th>
              <th className="px-6 py-3 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {order.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-3">{item.product.name}</td>
                <td className="px-6 py-3 text-right">
                  &euro;{item.price.toFixed(2)}
                </td>
                <td className="px-6 py-3 text-right">{item.quantity}</td>
                <td className="px-6 py-3 text-right font-medium">
                  &euro;{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
