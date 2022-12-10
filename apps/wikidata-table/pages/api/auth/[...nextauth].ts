import GoogleProvider from "next-auth/providers/google";
import WikimediaProvider, {
  WikimediaProfile,
} from "next-auth/providers/wikimedia";

import NextAuth from "next-auth";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    //debug: true,
    providers: [
      // GoogleProvider({
      //   clientId: process.env.GOOGLE_CLIENT_ID as string,
      //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // }),
      WikimediaProvider({
        clientId: process.env.WIKIMEDIA_CLIENT_ID as string,
        clientSecret: process.env.WIKIMEDIA_CLIENT_SECRET as string,
        profile(profile: WikimediaProfile) {
          console.log(profile);
          return {
            name: profile.username,
            id: profile.sub.toString(),
            ...profile,
          };
        },
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const wikiProfile: WikimediaProfile = profile as WikimediaProfile;
        if (wikiProfile.confirmed_email) return true;
      },
      async session({ session, token, user }) {
        console.log({ session, user });
        session.role = "user";
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET_KEY,
  });
}
