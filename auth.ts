import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
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
          const res = await fetch("http://localhost:3000/api/findUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
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
  debug: true, // Enable debug mode to get more detailed error messages
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
