export declare const MealService: {
    createMeal: (userId: string, data: any) => Promise<{
        name: string;
        id: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    }>;
    getMeals: ({ page, limit, search, }: {
        page: number;
        limit: number;
        search: string;
    }) => Promise<{
        data: ({
            provider: {
                id: string;
                phone: string | null;
                userId: string;
                description: string | null;
                shopName: string | null;
                address: string | null;
                logo: string | null;
            };
            category: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            id: string;
            image: string | null;
            providerId: string;
            description: string;
            price: number;
            categoryId: string;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    }>;
    getMealById: (id: string) => import("../../../generated/client/models").Prisma__MealClient<({
        provider: {
            id: string;
            phone: string | null;
            userId: string;
            description: string | null;
            shopName: string | null;
            address: string | null;
            logo: string | null;
        };
        reviews: {
            id: string;
            userId: string;
            mealId: string;
            rating: number;
            comment: string;
        }[];
    } & {
        name: string;
        id: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/client/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateMeal: (mealId: string, userId: string, data: any) => Promise<import("../../../generated/client/internal/prismaNamespace").BatchPayload>;
    deleteMeal: (mealId: string, userId: string) => Promise<import("../../../generated/client/internal/prismaNamespace").BatchPayload>;
};
//# sourceMappingURL=meal.service.d.ts.map