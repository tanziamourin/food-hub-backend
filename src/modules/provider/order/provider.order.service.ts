
import { OrderStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";

const getProviderOrders = async (userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) throw new Error("Provider profile not found");

  return prisma.order.findMany({
    where: {
      items: {
        some: {
          meal: { providerId: provider.id },
        },
      },
    },
    include: {
      customer: true,
      items: {
        include: { meal: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (
  orderId: string,
  userId: string,
  status: OrderStatus
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!provider) throw new Error("Provider profile not found");

  const result = await prisma.order.updateMany({
    where: {
      id: orderId,
      items: {
        some: {
          meal: { providerId: provider.id },
        },
      },
    },
    data: { status },
  });

  if (result.count === 0) {
    throw new Error("Unauthorized or order not found");
  }

  return result;
};

export const ProviderOrderService = {
  getProviderOrders,
  updateOrderStatus,
};
