import { SessionProps } from "./../types/lib/options";
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
        cnpj: {
          label: "cnpj",
          type: "text",
          placeholder: "76.840.537/0003-93"
        },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.cnpj && !credentials?.password) {
          throw new Error("CNPJ e senha são obrigatórios");
        }

        const res = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            cnpj: credentials?.cnpj,
            password: credentials?.password
          })
        });

        const user = await res.json();

        if (user) {
          // Adicione dados extras ao objeto de usuário
          const userWithExtras = {
            id: user.access_token,
            user: {
              name: user.name,
              cnpj: user.cnpj
            }
          };

          return userWithExtras;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/Login"
  },
  callbacks: {
    async session({ session, token, user }) {
      if (!token.sub) {
        throw new Error("Session invalid");
      }

      return { ...session, accessToken: token.sub };
    },
    async jwt({ token, account }) {
      if (token.sub) {
        return token;
      } else {
        throw new Error("Usuario não authenticado");
      }
    }
  }
};
