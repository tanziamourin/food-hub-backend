import { prisma } from "../../lib/prisma";
export const UserService = {
    getProfile: async (id) => {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                image: true,
                phone: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
    updateProfile: async (id, data) => {
        return prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                image: true,
                phone: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    },
};
//# sourceMappingURL=user.service.js.map