import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/index";
import type { NextAuthOptions } from "next-auth"

export const authOptions:NextAuthOptions = NextAuth({
  providers: [Google],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
    async signIn({ user, account, profile }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
        // Redirect to landing page after sign-in
        return baseUrl; // Redirect to base URL
      },
  },
});

export default NextAuth(authOptions)