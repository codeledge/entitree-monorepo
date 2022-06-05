import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from ".prisma_chordstop/client";

const prisma = new PrismaClient();

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
    // callbacks: {
    //   async session({ session, token, user }) {
    //     // const sessionUser = session!.user as any;
    //     await connectDB();
    //     session.userId = user.id;

    //     const userDoc = await UserModel.findById(user.id, "role").lean();

    //     session.role = userDoc?.role;
    //     return session;
    //   },
    // },
    adapter: PrismaAdapter(prisma),
  });
}
