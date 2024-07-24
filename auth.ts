import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        if (!credentials.email || !credentials.password) {
          console.error("Missing credentials");
          return null;
        }

        try {
          await connectMongoDB();
          const res = await fetch(`${process.env.PUBLIC_URL}/api/findUserByEmail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
            }),
          });

          if (res.status !== 200) {
            throw new Error(`Failed to fetch user: ${res.statusText}`);
          }

          const { user } = await res.json();

          if (!user) {
            throw new Error("No user found with this email");
          }

          console.log("User found auth:", user);

          return user;
        } catch (error: any) {
          console.error("Error in authorization:", error.message);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        // User is available during sign-in
        token.id = user._id;
      }
      return token;
    },
    session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
});
