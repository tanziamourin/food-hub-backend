import { Router } from "express";
import { createPayment } from "./payment.controller";
const router = Router();
router.post("/create-payment-intent", createPayment);
export default router;
//# sourceMappingURL=payment.routes.js.map