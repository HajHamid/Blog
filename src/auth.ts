// import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";
import type { User } from "@prisma/client";
// import argon2 from "argon2";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: AuthOptions = {
    // adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }

                const user = await db.user.findUnique({
                    where: {
                        username: credentials.username,
                    },
                });

                if (!user || !user.hashedPassword) {
                    return null;
                }

                const isPasswordValid =
                    user.hashedPassword === credentials.password;

                if (!isPasswordValid) {
                    return null;
                }

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,
    // pages: { signIn: "/" },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
                token.username = (user as User).username;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        },
    },
};

// export const handler = NextAuth(authOptions);
