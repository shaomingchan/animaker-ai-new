"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Animaker.AI] Client error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #2d1b69 70%, #0a0a0a 100%)",
      }}
    >
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white mb-3">
          Oops, something went wrong
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Don&apos;t worry — your work is safe.
          Try again or head back to the homepage.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 cursor-pointer hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
            }}
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg font-medium text-gray-300 border border-gray-700 transition-all duration-200 hover:border-purple-500 hover:text-white hover:scale-105 inline-block"
          >
            Back to Home
          </Link>
        </div>

        {/* Error digest for debugging */}
        {error.digest && (
          <p className="mt-8 text-xs text-gray-600">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
