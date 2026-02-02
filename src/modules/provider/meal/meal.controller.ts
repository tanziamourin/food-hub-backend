
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
  try {
    const meal = await MealService.createMeal(req.user!.id, req.body);
    res.status(201).json(meal);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ 
      success: false, 
      message: error.message
    });
  }
};

export const updateMeal = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  const result = await MealService.updateMeal(
    id,
    req.user!.id,
    req.body
  );

  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.json({ success: true });
};

export const deleteMeal = async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  const result = await MealService.deleteMeal(id, req.user!.id);

  if (result.count === 0) {
    return res.status(403).json({ message: "Not allowed" });
  }

  res.status(204).send();
};

