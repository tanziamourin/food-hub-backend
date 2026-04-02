import { prisma } from "../../../lib/prisma";
// GET PROFILE BY USER ID
const getProfile = async (userId) => {
    const profile = await prisma.providerProfile.findUnique({
        where: { userId },
        include: {
            user: true,
        },
    });
    if (!profile)
        throw new Error("Provider profile not found");
    return profile;
};
// GET ALL PROVIDERS
const getAllProviders = async () => {
    return prisma.providerProfile.findMany({
        include: {
            user: true,
            meals: {
                include: {
                    category: true,
                },
            },
        },
    });
};
// GET PROVIDER BY ID
const getProviderById = async (id) => {
    return prisma.providerProfile.findUnique({
        where: { id },
        include: {
            user: true,
            meals: {
                include: {
                    category: true,
                },
            },
        },
    });
};
// UPDATE OR CREATE PROFILE
const updateProfile = async (userId, data) => {
    const cleanData = {};
    if (data.shopName)
        cleanData.shopName = data.shopName;
    if (data.address)
        cleanData.address = data.address;
    if (data.phone)
        cleanData.phone = data.phone;
    if (data.description)
        cleanData.description = data.description;
    if (data.logo)
        cleanData.logo = data.logo;
    return prisma.providerProfile.upsert({
        where: { userId }, // ⚠️ MUST BE UNIQUE IN PRISMA
        update: cleanData,
        create: {
            userId,
            shopName: cleanData.shopName || "Default Shop",
            address: cleanData.address || "Default Address",
            phone: cleanData.phone,
            description: cleanData.description,
            logo: cleanData.logo,
        },
    });
};
export const ProviderProfileService = {
    getProfile,
    getAllProviders,
    getProviderById,
    updateProfile,
};
