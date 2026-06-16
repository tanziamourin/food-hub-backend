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

// ✅ FIXED getMeals with pagination + search
const getMeals = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search: string;
}) => {
  const skip = (page - 1) * limit;

  const meals = await prisma.meal.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
      provider: true,
    },
    skip,
    take: limit,
  });

  const total = await prisma.meal.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return {
    data: meals,
    meta: {
      page,
      limit,
      total,
    },
  };
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

const updateMeal = async (
  mealId: string,
  userId: string,
  data: any
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  return prisma.meal.updateMany({
    where: {
      id: mealId,
      providerId: provider.id,
    },
    data,
  });
};

const deleteMeal = async (mealId: string, userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  return prisma.meal.deleteMany({
    where: {
      id: mealId,
      providerId: provider.id,
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