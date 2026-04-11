"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-burgundy/10 mb-8">
          <AlertTriangle className="w-12 h-12 text-burgundy" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          An unexpected error occurred. Please try again, and if the problem
          persists, contact us for support.
        </p>

        <button
          onClick={() => unstable_retry()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy-dark transition-colors font-medium"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      </div>
    </div>
  );
}
