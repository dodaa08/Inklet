import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import type {  Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
    }
    
    interface User {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }

  interface BackendUser {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
  

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (credentials?.email && credentials?.password) {
            const response = await axios.post<BackendUser>("http://localhost:3003/api/signin", {
              email: credentials.email,
              password: credentials.password,
            });
      
            const user = response.data;
      
            if (user && user.id) {
              return user; 
            }
          }
        } catch (error) {
          console.error("Authorize error:", error);
        }
      
        return null;
      }
      
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin", // Optional: Custom Sign In page
  },
  callbacks: {
    async session({
        session,
        token,
      }: {
        session: Session;
        token: JWT;
      }): Promise<Session> {    
        session.user.id = token.sub!;
        return session;
      },

      // async redirect({ url, baseUrl }) {
      //   // Always redirect to /onboarding after successful login
      //   return `${baseUrl}/onboarding`;
      // },
  },
};
