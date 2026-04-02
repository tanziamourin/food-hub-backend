import { Router } from "express";
import {
  getDashboardStats,
  getProviders,
  getUsers,
  updateUserRole,
  updateUserStatus,
} from "./admin.controller";
import authorize, { UserRole } from "../../middleware/auth";


const router = Router();

// Admin  routes
router.use(authorize(UserRole.ADMIN));

router.get("/users", getUsers);
router.get("/providers", getProviders);
router.patch("/users/:id/status", updateUserStatus);
router.patch(
  "/users/:id/role",
  authorize(UserRole.ADMIN),
  updateUserRole
);
router.get("/stats", getDashboardStats);

export const adminRouter = router;
