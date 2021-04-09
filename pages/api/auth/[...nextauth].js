import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const providers = [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    })
  ];

const callbacks = {
  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
    }
    return token;
  },
  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  }
}

const options = {
  providers,
  callbacks,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  pages: {
    error: '/login',
    signIn: '/auth/sigin'
  }
};

export default (req, res) => NextAuth(req, res, options);
