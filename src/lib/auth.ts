import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// Mail Transporter

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
    },
});


// Better Auth Config

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    trustedOrigins: [process.env.APP_URL!],


   
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
            },

            phone: {
                type: "string",
                required: false,
            },

            status: {
                type: "string",
                required: false,
            },
        },
    },

    // Email and Password Auth
   
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false,
    },

  
    // email verification
 
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,

        sendVerificationEmail: async ({ user, url, token }) => {
          
            await transporter.sendMail({
                from: `"Food Hub " <food-hub@gmail.com>`,
                to: user.email!,
                subject: "Verify your email address",
                html: `
            <p>Hello ${user.name},</p>
            <p>Please verify your email address:</p>
            <a href="${url}">Verify Email</a>
        `,
            });
        },
    },

    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackUrl: `${process.env.APP_URL}/api/auth/callback/google`
        },
    }
   
});