import { Router } from "express";
import { getMyProfile, updateMyProfile } from "./user.controller.js";
// import authMiddleware from "../../middleware/auth.js";
import authorize from "../../middleware/auth.js";
const router = Router();
// Get own profile
router.get("/me", authorize(), getMyProfile);
// Update own profile
router.patch("/me", authorize(), updateMyProfile);
export const userRouter = router;
//# sourceMappingURL=user.route.js.map