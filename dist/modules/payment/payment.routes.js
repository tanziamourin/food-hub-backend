import { Router } from "express";
import { createPayment } from "./payment.controller.js";
const router = Router();
router.post("/create-payment-intent", createPayment);
export default router;
//# sourceMappingURL=payment.routes.js.map