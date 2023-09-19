import { SessionProps } from './../types/lib/options';
import { Login } from "@/app/service/axios";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";



export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch("http://localhost:8082/login", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password
          })
        });

        const user = await res.json();

        console.log(user.user);

        if (user.user) {
          return user.user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signIn"
  },
  callbacks: {
    async session({ session, token, user }: SessionProps) {

      session.accessToken = token.accessToken;
      
      console.log(session);
      
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    }
  }
};
