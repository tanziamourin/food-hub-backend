import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

import { auth } from "./lib/auth";
import errorHandler from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app = express();


app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.use(express.json());


app.all('/api/auth/*splat', toNodeHandler(auth));




app.get("/", (_req, res) => {
    res.send(" Hello from Food Hub Backend API ");
});


app.use(notFound);


app.use(errorHandler);

export default app;