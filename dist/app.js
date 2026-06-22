import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
// Middleware
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import authMiddleware from "./middleware/auth";
// Routes
import { userRouter } from "./modules/customer/user.route";
import { mealsRouter } from "./modules/provider/meal/meal.routes";
import { providerOrderRouter } from "./modules/provider/order/provider.order.routes";
import { orderRouter } from "./modules/customer/order/order.routes";
import { adminRouter } from "./modules/admin/admin.route";
import { getMyProfile } from "./modules/customer/user.controller";
import { categoryRouter } from "./modules/category/category.routes";
import { providerProfileRouter } from "./modules/provider/profile/provider.profile.router";
const app = express();
/* ================= CORS ================= */
const allowedOrigins = [
    "http://localhost:3000",
    "https://food-hub-frontend-ten.vercel.app",
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
}));
/* 🔥 FIX: Preflight handler (IMPORTANT) */
// app.options("*", cors());
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204);
//   }
//   next();
// });
/* ================= BODY ================= */
app.use(express.json());
/* ================= ROOT ================= */
// app.get("/api/test-session", async (req, res) => {
//   console.log("COOKIE:", req.headers.cookie);
//   const session = await auth.api.getSession({
//     headers: req.headers as any,
//   });
//   console.log("SESSION:", session);
//   return res.json({
//     cookie: req.headers.cookie || null,
//     session,
//   });
// });
// app.get("/debug-auth", async (req, res) => {
//   const count = await prisma.session.count();
//   res.json({
//     hasSecret: !!process.env.BETTER_AUTH_SECRET,
//     sessionCount: count,
//   });
// });
/* ================= CUSTOM AUTH ROUTES ================= */
// Register
// app.post("/api/auth/register", async (req: Request, res: Response) => {
//   try {
//     const result = await auth.api.signUpEmail({ body: req.body });
//     const data = result as any;
//     if (data?.error) {
//       return res.status(400).json({ error: data.error });
//     }
//     if (data?.user) {
//       await prisma.user.update({
//         where: { email: data.user.email },
//         data: { emailVerified: true },
//       });
//       return res.status(201).json({
//         success: true,
//         message: "Account created successfully",
//         user: { ...data.user, emailVerified: true },
//         session: data.session || null,
//       });
//     }
//   console.log("SIGNUP RESULT =", result);
//     return res.json(result);
//   } catch (err: any) {
//     console.error("REGISTER ERROR:", err);
//     return res.status(500).json({
//       error: { message: err.message || "Internal Server Error" },
//     });
//   }
// });
// Login
// app.post("/api/auth/login", async (req: Request, res: Response) => {
//   try {
//     const result = await auth.api.signInEmail({ body: req.body });
//     const data = result as any;
//     if (data?.user?.email) {
//       await prisma.user.update({
//         where: { email: data.user.email },
//         data: { emailVerified: true },
//       });
//     }
// console.log("RESULT:", result);
//     return res.json(result);
//   } catch (err: any) {
//     console.error("LOGIN ERROR:", err);
//     return res.status(500).json({
//       error: { message: err.message || "Internal Server Error" },
//     });
//   }
// });
/* ================= PROFILE ================= */
app.get("/api/auth/me", authMiddleware(), getMyProfile);
app.post("/api/auth/register", async (req, res) => {
    console.log(">>> [REG_PROXY] START:", req.body?.email);
    res.setHeader('Content-Type', 'application/json');
    try {
        const result = await auth.api.signUpEmail({
            body: req.body,
        });
        const data = result;
        if (data?.error) {
            return res.status(200).json({ error: data.error });
        }
        if (data?.user) {
            console.log(">>> [REG_PROXY] User created. Verifying email...");
            // Auto-verify on registration
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch(e => console.error(">>> [REG_PROXY] Auto-verify failed:", e.message));
            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                user: { ...data.user, emailVerified: true },
                session: data.session || null
            });
        }
        return res.status(200).json(result);
    }
    catch (err) {
        console.error(">>> [REG_PROXY] FATAL:", err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }
});
// Custom Login Proxy (Auto-verify email on login)
app.post("/api/auth/login", async (req, res) => {
    try {
        const result = await auth.api.signInEmail({ body: req.body });
        const data = result;
        if (data?.user?.email) {
            console.log(">>> [LOGIN_PROXY] User logged in. Ensuring emailVerified: true");
            // Auto-verify on login (in case they were created before this change)
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch(e => console.error(">>> [LOGIN_PROXY] Auto-verify failed:", e.message));
        }
        return res.json(result);
    }
    catch (err) {
        console.error(">>> [LOGIN_PROXY] FATAL:", err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }
});
/* ================= AUTH (IMPORTANT ORDER) ================= */
app.use("/api/auth", toNodeHandler(auth));
/* ================= APP ROUTES ================= */
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/providers", providerProfileRouter);
app.use("/api/provider/meals", mealsRouter);
app.use("/api/provider/orders", providerOrderRouter);
app.use("/api/admin", adminRouter);
app.get("/", (_req, res) => {
    res.send("Food Hub Backend is running!");
});
/* ================= ERROR HANDLING ================= */
app.use(notFound);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map