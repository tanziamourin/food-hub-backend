// import { prisma } from "../../lib/prisma";

import { prisma } from "../../../lib/prisma";

export const createOrderIntoDB = async (
  userId: string,
  payload: {
    deliveryAddress: string;
    items: { mealId: string; quantity: number }[];
  }
) => {
  const meals = await prisma.meal.findMany({
    where: { id: { in: payload.items.map(i => i.mealId) } },
    select: { id: true, price: true },
  });

  const orderItems = payload.items.map(item => {
    const meal = meals.find(m => m.id === item.mealId);
    if (!meal) throw new Error("Meal not found");

    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  return prisma.order.create({
    data: {
      customerId: userId,
      deliveryAddress: payload.deliveryAddress,
      items: { create: orderItems },
    },
    include: {
      items: { include: { meal: true } },
    },
  });
};

export const getMyOrdersFromDB = async (userId: string) => {
  return prisma.order.findMany({
    where: { customerId: userId },
    include: {
      items: { include: { meal: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};
