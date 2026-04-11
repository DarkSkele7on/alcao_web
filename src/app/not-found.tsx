import Link from "next/link";
import { Home, ShoppingBag, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-burgundy/10 mb-8">
          <Search className="w-12 h-12 text-burgundy" />
        </div>

        <h1 className="text-6xl font-bold text-burgundy mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy-dark transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-burgundy text-burgundy rounded-lg hover:bg-burgundy hover:text-white transition-colors font-medium"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
