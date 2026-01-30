import { Router } from "express";
import {
  getDashboardStats,
  getUsers,
  updateUserStatus,
} from "./admin.controller";
import authorize, { UserRole } from "../../middleware/auth";


const router = Router();

// Admin  routes
router.use(authorize(UserRole.ADMIN));

router.get("/users", getUsers);
router.patch("/users/:id/status", updateUserStatus);
router.get("/stats", getDashboardStats);

export const adminRouter = router;
