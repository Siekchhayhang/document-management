import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./prisma/client"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email.toString() },
                });
                if (!user) return null;
                const passwordMatch = await bcrypt.compare(credentials.password.toString(), user.hashedPassword!);
                if (!passwordMatch) return null;
                return {
                    id: user.id.toString(), // Convert the id to string
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    password: user.hashedPassword,
                };
            }
        }),
        Google({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! })],
})