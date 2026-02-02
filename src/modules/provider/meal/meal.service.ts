// meal.service.ts
import { prisma } from "../../../lib/prisma";

const createMeal = async (userId: string, data: any) => {
  let provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) {
  
    provider = await prisma.providerProfile.create({
      data: {
        userId: userId,
        shopName: "My Shop",
        address: "Update your address", 
      },
    });
  }

  return prisma.meal.create({
    data: {
      name: data.name,
      price: parseFloat(data.price),
      description: data.description,
      providerId: provider.id,
      categoryId: data.categoryId, 
    },
  });
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

//  provider can update ONLY own meal
const updateMeal = async (
  mealId: string,
  userId: string,
  data: any
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId: provider?.id,
    },
    data,
  });
};


//  provider can delete ONLY own meal
const deleteMeal = async (mealId: string, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  return prisma.meal.deleteMany({
    where: {
      id: mealId,
      providerId: provider?.id,
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
