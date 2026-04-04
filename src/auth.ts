import { inspect } from "node:util"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "noreply@animaker.dev",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(
        "[auth][callback][signIn]",
        inspect(
          {
            user: user
              ? {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                }
              : null,
            account: account
              ? {
                  provider: account.provider,
                  type: account.type,
                  providerAccountId: account.providerAccountId,
                }
              : null,
            profile: profile
              ? {
                  sub: "sub" in profile ? profile.sub : undefined,
                  email: "email" in profile ? profile.email : undefined,
                  email_verified: "email_verified" in profile ? profile.email_verified : undefined,
                  name: "name" in profile ? profile.name : undefined,
                }
              : null,
          },
          { depth: null, breakLength: 120, showHidden: true, getters: true }
        )
      )
      return true
    },
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  logger: {
    error(code, ...message) {
      console.error(
        "[auth][logger][error]",
        code,
        ...message.map((entry) =>
          typeof entry === "string"
            ? entry
            : inspect(entry, { depth: null, breakLength: 120, showHidden: true, getters: true })
        )
      )
    },
    warn(code, ...message) {
      console.warn(
        "[auth][logger][warn]",
        code,
        ...message.map((entry) =>
          typeof entry === "string"
            ? entry
            : inspect(entry, { depth: null, breakLength: 120, showHidden: true, getters: true })
        )
      )
    },
  },
  pages: {
    signIn: "/login",
  },
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  debug: process.env.NODE_ENV === "development",
})
