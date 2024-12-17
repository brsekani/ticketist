import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUser } from "./date-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingUser = await getUser(user.email);
        if (!existingUser)
          await createUser({
            email: user.email,
            fullName: user.name,
          });
        return true;
      } catch {
        return false;
      }
    },
    async session(session) {
      const user = await getUser(session.session.user.email);
      session.session.user.user_id = user.user_id;
      return session.session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
