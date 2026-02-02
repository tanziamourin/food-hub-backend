
import { Router } from "express";
import authorize, { UserRole } from "../../../middleware/auth";
import {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal,
} from "./meal.controller";

const router = Router();

// public
router.get("/", getMeals);
router.get("/:id", getMeal);

// provider only
router.post("/", authorize(UserRole.PROVIDER), createMeal);
router.patch("/:id", authorize(UserRole.PROVIDER), updateMeal);
router.delete("/:id", authorize(UserRole.PROVIDER), deleteMeal);

export const mealsRouter = router;
