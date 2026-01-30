import express, { Request, Response } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import authMiddleware from "./middleware/auth";
import { prisma } from "./lib/prisma";
import { config } from "./config";
import { getMyProfile } from "./modules/user/user.controller";
// import { categoryRouter } from "./modules/category/category.router";
// import { orderRouter } from "./modules/order/order.router";
// import { adminRouter } from "./modules/admin/admin.router";
// import { reviewRouter } from "./modules/review/review.router";
// import { userRouter } from "./modules/user/user.router";
// import { getMyProfile } from "./modules/user/user.controller";

const app = express();


const allowedOrigins = [
    config.app_url,
    // "http://localhost:3000",
    "http://localhost:3000",
    
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use(express.json());




app.get("/api/auth/me", authMiddleware(), getMyProfile);

// Custom Registration 
app.post("/api/auth-registration", async (req: Request, res: Response) => {
    console.log(">>> [REG_PROXY] START:", req.body?.email);
    res.setHeader('Content-Type', 'application/json');

    try {
        const result = await auth.api.signUpEmail({
            body: req.body,
        });

        const data = result as any;
        if (data?.error) {
            return res.status(200).json({ error: data.error });
        }

        if (data?.user) {
            console.log(">>> [REG_PROXY] User created. Verifying email...");

            // Auto-verify
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

    } catch (err: any) {
        console.error(">>> [REG_PROXY] FATAL:", err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }
});

// Custom Login 
app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
        const result = await auth.api.signInEmail({ body: req.body });
        const data = result as any;

        if (data?.user?.email) {
           
            await prisma.user.update({
                where: { email: data.user.email },
                data: { emailVerified: true }
            }).catch(e => console.error("custom login failed:", e.message));
        }

        return res.json(result);
    } catch (err: any) {
        console.error("Login error:", err);
        return res.status(500).json({
            error: { message: err.message || "Internal Server Error" }
        });
    }
});

// Better Auth  Handler
app.use("/api/auth", toNodeHandler(auth));

// Application Routes

// app.use("/api/categories", categoryRouter);
// app.use("/api/medicines", medicineRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/admin", adminRouter);
// app.use("/api/reviews", reviewRouter);
// app.use("/api/users", userRouter);
// 


app.get("/", (_req, res) => res.send("Food Hub Backend is running!"));

app.use(notFound);
app.use(errorHandler);

export default app;