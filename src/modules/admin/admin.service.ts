import { UserStatus, Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";


export const AdminService = {
  getAllUsers: async () => {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
getAllProviders: async () => {
  return prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      shopName: "asc",
    },
  });
},
  updateUserStatus: async (id: string, status: UserStatus) => {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  },

  getDashboardStats: async () => {
    const [
      totalUsers,
      totalProviders,
      totalMeals,
      totalOrders,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.providerProfile.count(),
      prisma.meal.count(),
      prisma.order.count(),
    ]);

    return {
      users: totalUsers,
      providers: totalProviders,
      meals: totalMeals,
      orders: totalOrders,
    };
  },
updateUserRole: async (userId: string, role: Role) => {
  return prisma.user.update({
    where: { id: userId },
    data: { role },
  });
},
  
};
