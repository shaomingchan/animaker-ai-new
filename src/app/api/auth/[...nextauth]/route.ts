import { handlers } from "@/auth"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    return await handlers.GET(req)
  } catch (e: any) {
    console.error("[auth][route][GET] Unhandled error:", {
      message: e?.message,
      type: e?.type,
      name: e?.name,
      cause: e?.cause ? JSON.stringify(e.cause, Object.getOwnPropertyNames(e.cause), 2) : undefined,
      stack: e?.stack?.slice(0, 500),
    })
    throw e
  }
}

export async function POST(req: NextRequest) {
  try {
    return await handlers.POST(req)
  } catch (e: any) {
    console.error("[auth][route][POST] Unhandled error:", {
      message: e?.message,
      type: e?.type,
      name: e?.name,
      cause: e?.cause ? JSON.stringify(e.cause, Object.getOwnPropertyNames(e.cause), 2) : undefined,
      stack: e?.stack?.slice(0, 500),
    })
    throw e
  }
}
