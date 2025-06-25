import { config } from "dotenv";
config();

import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

if (
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET ||
  !process.env.NEXTAUTH_SECRET
) {
  throw new Error(
    "Missing required environment variables in .env for authentication"
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please enter an email and password");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (mongoose.connection.readyState !== 1) {
          await dbConnect();
        }
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
            });
            user.id = newUser._id.toString();
            user.role = newUser.role;
          } else {
            user.id = existingUser._id.toString();
            user.role = existingUser.role;
          }
          return true;
        } catch (error) {
          console.error(
            "Error during Google sign-in user check/creation: ",
            error
          );
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if ((!token.id || !token.role) && user) {
        if (mongoose.connection.readyState !== 1) {
          await dbConnect();
        }
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
};
