// meal.service.ts
import { prisma } from "../../lib/prisma";

const createMeal = (data: any) => {
  return prisma.meal.create({ data });
};

const getMeals = () => {
  return prisma.meal.findMany({
    include: {
      category: true,
      provider: true,
    },
  });
};

const getMealById = (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      reviews: true,
      provider: true,
    },
  });
};

// 🔒 provider can update ONLY own meal
const updateMeal = (mealId: string, providerId: string, data: any) => {
  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId,
    },
    data,
  });
};

// 🔒 provider can delete ONLY own meal
const deleteMeal = (mealId: string, providerId: string) => {
  return prisma.meal.deleteMany({
    where: {
      id: mealId,
      providerId,
    },
  });
};

export const MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
