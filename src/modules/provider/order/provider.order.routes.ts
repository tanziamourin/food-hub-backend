
import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth";
import {
  getProviderOrders,
  updateOrderStatus,
} from "./provider.order.controller";

const router = Router();

router.get(
  "/orders",
  authorize(UserRole.PROVIDER),
  getProviderOrders
);

router.patch(
  "/orders/:id",
  authorize(UserRole.PROVIDER),
  updateOrderStatus
);

export const providerOrderRouter = router;
