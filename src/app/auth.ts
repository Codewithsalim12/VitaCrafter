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
          let existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              role: user.email === process.env.ADMIN_EMAIL ? "admin" : "user",
              lastLogin: new Date(),
              loginCount: 1,
            });
            user.id = newUser._id.toString();
            user.role = newUser.role;
          } else {
            // Update analytics fields
            existingUser.lastLogin = new Date();
            existingUser.loginCount = (existingUser.loginCount || 0) + 1;
            // Ensure admin role if email matches
            if (
              existingUser.email === process.env.ADMIN_EMAIL &&
              existingUser.role !== "admin"
            ) {
              existingUser.role = "admin";
            }
            await existingUser.save();
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
      } else if (account?.provider === "credentials") {
        if (mongoose.connection.readyState !== 1) {
          await dbConnect();
        }
        try {
          const dbUser = await User.findOne({ email: user.email });
          if (dbUser) {
            dbUser.lastLogin = new Date();
            dbUser.loginCount = (dbUser.loginCount || 0) + 1;
            // Ensure admin role if email matches
            if (
              dbUser.email === process.env.ADMIN_EMAIL &&
              dbUser.role !== "admin"
            ) {
              dbUser.role = "admin";
            }
            await dbUser.save();
            user.role = dbUser.role;
          }
        } catch (error) {
          console.error("Error updating login analytics:", error);
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
