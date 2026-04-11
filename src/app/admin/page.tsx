import Link from "next/link";
import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [totalOrders, recentOrdersCount, allOrders, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.order.findMany({ select: { total: true } }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Total Orders
          </p>
          <p className="text-3xl font-bold text-[#702E3E] mt-1">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Total Revenue
          </p>
          <p className="text-3xl font-bold text-[#702E3E] mt-1">
            &euro;{totalRevenue.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500 uppercase tracking-wide">
            Orders (Last 7 Days)
          </p>
          <p className="text-3xl font-bold text-[#702E3E] mt-1">
            {recentOrdersCount}
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="px-4 py-2 bg-[#702E3E] text-white rounded hover:bg-[#5a2532] transition-colors text-sm"
        >
          View All Orders
        </Link>
        <Link
          href="/admin/products"
          className="px-4 py-2 bg-[#702E3E] text-white rounded hover:bg-[#5a2532] transition-colors text-sm"
        >
          Manage Products
        </Link>
      </div>

      {/* Recent orders table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Orders
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-right">Total</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3">{order.customerName}</td>
                  <td className="px-6 py-3 text-gray-500">
                    {order.customerEmail}
                  </td>
                  <td className="px-6 py-3 text-right">
                    &euro;{order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
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
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No orders yet.
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
