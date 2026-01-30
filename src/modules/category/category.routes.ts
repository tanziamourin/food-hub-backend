import { Router } from "express";
import { CategoryController } from "./category.controller";
import authorize, { UserRole } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  authorize(UserRole.ADMIN),
  CategoryController.create
);

router.get("/", CategoryController.getAll);

router.get("/:id", CategoryController.getById);

router.patch(
  "/:id",
  authorize(UserRole.ADMIN),
  CategoryController.update
);

router.delete(
  "/:id",
  authorize(UserRole.ADMIN),
  CategoryController.remove
);

export default router;
