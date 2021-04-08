// import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";

import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { session } from "next-auth/client";

const prisma = new PrismaClient();

// we will define `options` up next

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
    }),
    Providers.Credentials({
      name: 'Credentials',
      authorize: async (credentials) => {
        try {
          const user = await axios.post('/users/login', {
            user: {
              password: credentials.password,
              email: credentials.email
            }
          },
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json'
            }
          })

          if (user) return { status: 'success', data: user }
        } catch (error) {
          const errorMessage = e.reponse.data.errorMessage
          throw new Error(errorMessage + '&email=' + credentials.email)
        }
      },
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
  },
  async redirect (_url, baseUrl) {
    return Promise.resolve('/');
  },
}

const options = {
  providers,
  callbacks,
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  pages: {
    error: '/login',
  }
};



export default (req, res) => NextAuth(req, res, options);
