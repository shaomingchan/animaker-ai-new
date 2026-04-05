import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

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
    error(code, ...message) {
      console.error("[auth][error]", typeof code === "object" ? JSON.stringify(code, Object.getOwnPropertyNames(code)) : code, ...message.map(m => typeof m === "object" ? JSON.stringify(m, Object.getOwnPropertyNames(m)) : m))
    },
    warn(code, ...message) {
      console.warn("[auth][warn]", code, ...message)
    },
    debug(code, ...message) {
      console.log("[auth][debug]", code, ...message)
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  trustHost: true,
  debug: true,
})
