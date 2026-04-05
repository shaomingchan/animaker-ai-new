import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

function serializeError(err: unknown): string {
  if (!err) return String(err)
  if (typeof err === "string") return err
  if (err instanceof Error) {
    const obj: Record<string, unknown> = {
      name: err.name,
      message: err.message,
      stack: err.stack?.slice(0, 500),
    }
    if ("cause" in err && err.cause) {
      obj.cause = serializeError(err.cause)
    }
    if ("type" in err) obj.type = (err as any).type
    return JSON.stringify(obj)
  }
  try { return JSON.stringify(err) } catch { return String(err) }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      checks: ["state"],
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "noreply@animaker.dev",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("[auth][signIn]", JSON.stringify({
        userId: user?.id,
        email: user?.email,
        provider: account?.provider,
      }))
      return true
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  logger: {
    error(error, ...message) {
      console.error("[auth][error]", serializeError(error), ...message.map(m => serializeError(m)))
    },
    warn(code, ...message) {
      console.warn("[auth][warn]", code, ...message)
    },
    debug(code, ...message) {
      console.log("[auth][debug]", code, ...message.map(m => typeof m === "object" ? JSON.stringify(m) : m))
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  debug: true,
})
