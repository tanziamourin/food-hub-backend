import express, { Request, Response } from "express";
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

// ================= GLOBAL CORS =================
app.use((req, res, next) => {
  const allowedOrigin = "https://food-hub-frontend-ten.vercel.app";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // preflight response
  }

  next();
});

// ================= BODY PARSER =================
app.use(express.json());

// ================= AUTH =================
// Profile (custom)
app.get("/api/auth/me", authMiddleware(), getMyProfile);

// better-auth handler (must come AFTER CORS)
app.use("/api/auth", toNodeHandler(auth));

// ================= CUSTOM AUTH =================
// Register
app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signUpEmail({ body: req.body });
    const data = result as any;

    if (data?.error) return res.status(200).json({ error: data.error });

    if (data?.user) {
      await prisma.user.update({
        where: { email: data.user.email },
        data: { emailVerified: true },
      });

      return res.status(201).json({
        success: true,
        message: "Account created successfully",
        user: { ...data.user, emailVerified: true },
        session: data.session || null,
      });
    }

    return res.status(200).json(result);
  } catch (e: any) {
    return res.status(500).json({ error: { message: e.message || "Internal Server Error" } });
  }
});

// Login
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const result = await auth.api.signInEmail({ body: req.body });
    const data = result as any;

    if (data?.user?.email) {
      await prisma.user.update({
        where: { email: data.user.email },
        data: { emailVerified: true },
      });
    }

    return res.json(result);
  } catch (e: any) {
    return res.status(500).json({ error: { message: e.message || "Internal Server Error" } });
  }
});

// ================= ROUTES =================
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/providers", providerProfileRouter);
app.use("/api/provider/meals", mealsRouter);
app.use("/api/provider/orders", providerOrderRouter);
app.use("/api/admin", adminRouter);

// ================= ROOT =================
app.get("/", (_req, res) => res.send("Food Hub Backend is running!"));

// ================= ERROR HANDLING =================
app.use(notFound);
app.use(errorHandler);

export default app;