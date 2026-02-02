import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth";
import { createOrder, getMyOrders } from "./order.controller";

const router = Router(); 

router.post("/", authorize(UserRole.CUSTOMER), createOrder);
router.get("/me", authorize(UserRole.CUSTOMER), getMyOrders);

export const orderRouter = router;
