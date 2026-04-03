"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Animaker.AI] Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            background:
              "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 40%, #2d1b69 70%, #0a0a0a 100%)",
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "28rem", margin: "0 auto" }}>
            {/* Icon */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                marginBottom: "1.5rem",
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                boxShadow: "0 0 40px rgba(168, 85, 247, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            {/* Title */}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#ffffff",
                marginBottom: "0.75rem",
              }}
            >
              Something went seriously wrong
            </h2>

            {/* Description */}
            <p
              style={{
                color: "#9ca3af",
                marginBottom: "2rem",
                lineHeight: 1.6,
              }}
            >
              A critical error occurred. This is rare — please try refreshing
              the page or return to the homepage.
            </p>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={reset}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: "0 4px 20px rgba(168, 85, 247, 0.3)",
                }}
              >
                Try Again
              </button>
              <Link
                href="/"
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontWeight: 500,
                  color: "#d1d5db",
                  border: "1px solid #374151",
                  textDecoration: "none",
                  fontSize: "1rem",
                  display: "inline-block",
                }}
              >
                Back to Home
              </Link>
            </div>

            {/* Error digest */}
            {error.digest && (
              <p style={{ marginTop: "2rem", fontSize: "0.75rem", color: "#4b5563" }}>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
