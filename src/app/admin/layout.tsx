import Link from "next/link";
import { cookies } from "next/headers";
import AdminAuth from "@/components/AdminAuth";

export const metadata = {
  title: "ALCAO Admin",
};

async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) return false;

  const SECRET = process.env.SESSION_SECRET || "alcao-admin-secret-key";
  const PASSWORD = process.env.ADMIN_PASSWORD || "alcao2024";
  const expected = btoa(`${PASSWORD}:${SECRET}:admin-session`);

  return session.value === expected;
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAuth();

  return (
    <AdminAuth initialAuth={isAuthenticated}>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="w-60 bg-[#702E3E] text-white flex flex-col shrink-0">
          <div className="px-6 py-5 border-b border-white/20">
            <h1 className="text-xl font-bold tracking-wide">ALCAO Admin</h1>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1">
            <Link
              href="/admin"
              className="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/orders"
              className="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              Orders
            </Link>
            <Link
              href="/admin/products"
              className="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
            >
              Products
            </Link>
          </nav>
          <div className="px-6 py-4 border-t border-white/20 text-xs text-white/50">
            <Link href="/" className="hover:text-white/80">
              &larr; Back to site
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </AdminAuth>
  );
}
