// meal.controller.ts
import { Request, Response } from "express";
import { MealService } from "./meal.service";

interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    role: any;
    emailVerified: boolean;
    status: "ACTIVE" | "SUSPENDED";
  };
}

// PUBLIC
export const getMeals = async (_req: Request, res: Response) => {
  const meals = await MealService.getMeals();
  res.json(meals);
};

export const getMeal = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const meal = await MealService.getMealById(id);
  res.json(meal);
};


// PROVIDER ONLY
export const createMeal = async (req: AuthRequest, res: Response) => {
  const meal = await MealService.createMeal({
    ...req.body,
    providerId: req.user!.id,
  });
  res.status(201).json(meal);
};


export const updateMeal = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
   if (!id) {
    return res.status(400).json({ message: "Meal id is required" });
  }
  const meal = await MealService.updateMeal(
    id,
    req.user!.id,
    req.body
  );

  res.json(meal);
};

export const deleteMeal = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  await MealService.deleteMeal(id, req.user!.id);
  res.status(204).send();
};

