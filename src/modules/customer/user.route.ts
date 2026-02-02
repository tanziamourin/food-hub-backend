import { Router } from "express";
import { getMyProfile, updateMyProfile } from "./user.controller";
// import authMiddleware from "../../middleware/auth";
import authorize from "../../middleware/auth";

const router = Router();

// Get own profile
router.get("/me", authorize(), getMyProfile);

// Update own profile
router.patch("/me", authorize(), updateMyProfile);

export const userRouter = router;