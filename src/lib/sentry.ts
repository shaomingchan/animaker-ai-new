export function captureError(error: Error, context?: Record<string, unknown>) {
  console.error(error, context);
}

export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  console.log(`[${level}]`, message);
}
