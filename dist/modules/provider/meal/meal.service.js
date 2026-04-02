// meal.service.ts
import { prisma } from "../../../lib/prisma.js";
const createMeal = async (userId, data) => {
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
const getMealById = (id) => {
    return prisma.meal.findUnique({
        where: { id },
        include: {
            reviews: true,
            provider: true,
        },
    });
};
//  provider can update ONLY own meal
const updateMeal = async (mealId, userId, data) => {
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
//  provider can delete ONLY own meal
const deleteMeal = async (mealId, userId) => {
    const provider = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (!provider) {
        throw new Error("Provider not found");
    }
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
//# sourceMappingURL=meal.service.js.map