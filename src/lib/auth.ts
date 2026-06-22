import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { oAuthProxy } from "better-auth/plugins";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
   secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
 logger: {
    level: "debug",
  },
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://food-hub-frontend-ten.vercel.app",
  ],

  user: {
    additionalFields: {
      role: { type: "string" },
      phone: { type: "string" },
      status: { type: "string" },
    },
  },

  // session: {
  //   additionalFields: {
  //     role: { type: "string" },
  //   },
  // },

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url }) => {
      await transporter.sendMail({
        from: `"Food Hub" <food-hub@gmail.com>`,
        to: user.email!,
        subject: "Verify your email",
        html: `<a href="${url}">Verify Email</a>`,
      });
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackUrl: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },

  advanced: {
    // cookies: {
    //   session_token: {
    //     name: "session_token",
    //     attributes: {
    //       httpOnly: true,
    //       secure: true,
    //       sameSite: "none", // required for cross-domain
    //     },
    //   },
    // },
  },

  plugins: [],
});