// app/api/auth/authOptions.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import AzureADProvider from "next-auth/providers/azure-ad";
import DiscordProvider from "next-auth/providers/discord";
import LINEProvider from "next-auth/providers/line";
import { createUser, getUserByEmailAndType } from "@/db/models/user";
import { createTokenJose } from "@/utils/jose";
import { cookies } from "next/headers";

const scopes = ["identify"].join(" ");
let check;

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    AzureADProvider({
      clientId: `${process.env.AZURE_ADP_ID}` || "",
      clientSecret: `${process.env.AZURE_ADP_SECRET}` || "",
      tenantId: process.env.AZURE_ADP_TENANT_ID || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists in the database
        let dbUser = await getUserByEmailAndType(
          user.email || "",
          account?.provider || ""
        );

        if (!dbUser) {
          dbUser = await createUser({
            username: user.name || profile?.name || "Anonymous", // Fallback for username
            email: user.email || "", // Provide fallback for email
            password: "oauth",
            phone_number: "",
            type: account?.provider || "unknown",
            account_type: "Personal",
            role: "user",
            status: "active",
          });
        }

        // Create token payload with user details
        const payload = {
          id: dbUser._id, // Use the ID from the database, cast to string
          email: dbUser.email,
          role: dbUser.role,
          account_type: dbUser.account_type,
          username: dbUser.username
        };

        // Generate token using jose
        const token = await createTokenJose(payload);

        // Set token as a cookie
        cookies().set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3-day expiration
          sameSite: "strict",
        });

        // Allow the sign-in process to proceed
        check = true;
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // After successful login, redirect the user
      return baseUrl; // Redirect to the homepage or any desired page
    },
  },
};

export default authOptions;
