import { inspect } from "node:util"
import type { NextRequest } from "next/server"
import { handlers } from "@/auth"

export async function GET(req: NextRequest) {
  if (req.nextUrl.pathname.includes("/callback/google")) {
    console.log(
      "[auth][route][callback]",
      inspect(
        {
          url: req.url,
          query: Object.fromEntries(req.nextUrl.searchParams.entries()),
          cookies: req.cookies.getAll().map((cookie) => cookie.name),
        },
        { depth: null, breakLength: 120, showHidden: true, getters: true }
      )
    )
  }

  return handlers.GET(req)
}

export const POST = handlers.POST
