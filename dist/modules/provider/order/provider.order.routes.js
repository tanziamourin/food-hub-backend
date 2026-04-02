import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth.js";
import { getProviderOrders, updateOrderStatus, } from "./provider.order.controller.js";
const router = Router();
router.get("/orders", authorize(UserRole.PROVIDER), getProviderOrders);
router.patch("/orders/:id", authorize(UserRole.PROVIDER), updateOrderStatus);
export const providerOrderRouter = router;
//# sourceMappingURL=provider.order.routes.js.map