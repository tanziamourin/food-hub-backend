import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth.js";
import { getProviderProfile, updateProviderProfile, getProvider, getAllProviders, } from "./provider.profile.controller.js";
import { upload } from "../../../cloudinary/upload.middleware.js";
const router = Router();
// PUBLIC ROUTES
router.get("/", getAllProviders);
router.get("/:id", getProvider);
// PROTECTED ROUTES (PROVIDER ONLY)
router.get("/profile", authorize(UserRole.PROVIDER), getProviderProfile);
router.patch("/profile", authorize(UserRole.PROVIDER), upload.single("logo"), updateProviderProfile);
export const providerProfileRouter = router;
//# sourceMappingURL=provider.profile.router.js.map