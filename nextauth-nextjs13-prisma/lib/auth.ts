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
            cnpj: user.cnpj,
            access_token: user.access_token,
            name: user.name,
            // Adicione dados extras aqui
            role: "admin", // Por exemplo, você pode definir a função do usuário
            someOtherData: "value" // Outros dados personalizados que você deseja adicionar
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
      session.accessToken = token.sub;

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
