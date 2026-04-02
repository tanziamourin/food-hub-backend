

import { prisma } from "../../../lib/prisma";
import { createPaymentIntent } from "../../../stripe/stripe.service";

export const createOrderIntoDB = async (userId: string, payload: any) => {
  const meals = await prisma.meal.findMany({
    where: { id: { in: payload.items.map((i: any) => i.mealId) } },
  });

  let totalAmount = 0;

  const orderItems = payload.items.map((item: any) => {
    const meal = meals.find(m => m.id === item.mealId);
    if (!meal) throw new Error("Meal not found");

    totalAmount += meal.price * item.quantity;

    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  // 💳 Stripe
  const paymentIntent = await createPaymentIntent(totalAmount);

  // 🧾 Order
  const order = await prisma.order.create({
    data: {
      customerId: userId,
      deliveryAddress: payload.deliveryAddress,
      totalAmount,
      paymentIntentId: paymentIntent.id,
      paymentStatus: "PENDING",
      items: { create: orderItems },
    },
  });

  return {
    order,
    clientSecret: paymentIntent.client_secret,
  };
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
