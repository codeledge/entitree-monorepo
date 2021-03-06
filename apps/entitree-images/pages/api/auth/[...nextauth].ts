import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prismaClient } from "../../../prisma/prismaClient";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    //debug: true,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET_KEY,
    callbacks: {
      async session({ session, token, user }) {
        const userDoc = await prismaClient.user.findFirst({
          where: {
            id: user.id,
          },
        });
        session.userId = user.id;
        session.role = userDoc?.role;
        return session;
      },
    },
    adapter: PrismaAdapter(prismaClient),
  });
}
