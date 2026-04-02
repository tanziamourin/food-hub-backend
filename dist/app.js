import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import errorHandler from "./middleware/globalErrorHandler.js";
import { notFound } from "./middleware/notFound.js";
import authMiddleware from "./middleware/auth.js";
import { prisma } from "./lib/prisma.js";
import { config } from "./config.js";
import { userRouter } from "./modules/customer/user.route.js";
import { mealsRouter } from "./modules/provider/meal/meal.routes.js";
import { providerOrderRouter } from "./modules/provider/order/provider.order.routes.js";
import { orderRouter } from "./modules/customer/order/order.routes.js";
import { adminRouter } from "./modules/admin/admin.route.js";
import { getMyProfile } from "./modules/customer/user.controller.js";
import { categoryRouter } from "./modules/category/category.routes.js";
import { providerProfileRouter } from "./modules/provider/profile/provider.profile.router.js";
const app = express();
const allowedOrigins = [
    config.app_url,
    "http://localhost:3000",
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express.json());
// Auth routes
app.get("/api/auth/me", authMiddleware(), getMyProfile);
app.use("/api/auth", toNodeHandler(auth));
app.post("/api/auth/register", async (req, res) => {
    console.log(" START:", req.body?.email);
    res.setHeader('Content-Type', 'application/json');
    try {
        const result = await auth.api.signUpEmail({ body: req.body });
        const data = result;
        if (data?.error) {
            return res.status(200).json({ error: data.error });
        }
        if (data?.user) {
            console.log(">>> [REG_PROXY] User created. Verifying email...");
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch((e) => {
                if (e instanceof Error) {
                    console.error(" Auto-verify failed:", e.message);
                }
                else {
                    console.error("Auto-verify failed:", e);
                }
            });
            return res.status(201).json({
                success: true,
                message: "Account created successfully",
                user: { ...data.user, emailVerified: true },
                session: data.session || null
            });
        }
        return res.status(200).json(result);
    }
    catch (e) {
        if (e instanceof Error) {
            console.error("FATAL:", e.message);
            return res.status(500).json({ error: { message: e.message } });
        }
        else {
            console.error("FATAL:", e);
            return res.status(500).json({ error: { message: "Internal Server Error" } });
        }
    }
});
app.post("/api/auth/login", async (req, res) => {
    try {
        const result = await auth.api.signInEmail({ body: req.body });
        const data = result;
        if (data?.user?.email) {
            console.log("User logged in. Ensuring emailVerified: true");
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch((e) => {
                if (e instanceof Error) {
                    console.error("Auto-verify failed:", e.message);
                }
                else {
                    console.error("Auto-verify failed:", e);
                }
            });
        }
        return res.json(result);
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
            return res.status(500).json({ error: { message: e.message } });
        }
        else {
            console.error(e);
            return res.status(500).json({ error: { message: "Internal Server Error" } });
        }
    }
});
// User routes
app.use("/api/users", userRouter);
// Orders
app.use("/api/orders", orderRouter);
// Public Meals & Categories
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
// Provider routes
app.use("/api/providers", providerProfileRouter);
app.use("/api/provider/meals", mealsRouter);
app.use("/api/provider/orders", providerOrderRouter);
// Admin routes
app.use("/api/admin", adminRouter);
// Root
app.get("/", (_req, res) => res.send("Food Hub Backend is running!"));
// Error handling
app.use(notFound);
app.use(errorHandler);
export default app;
//# sourceMappingURL=app.js.map