import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth.js";
import { createOrder, getMyOrders } from "./order.controller.js";
const router = Router();
router.post("/", authorize(UserRole.CUSTOMER), createOrder);
router.get("/me", authorize(UserRole.CUSTOMER), getMyOrders);
export const orderRouter = router;
//# sourceMappingURL=order.routes.js.map