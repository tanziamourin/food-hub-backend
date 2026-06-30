export declare const MealService: {
    createMeal: (userId: string, data: any) => Promise<any>;
    getMeals: ({ page, limit, search, }: {
        page: number;
        limit: number;
        search: string;
    }) => Promise<{
        data: any;
        meta: {
            page: number;
            limit: number;
            total: any;
        };
    }>;
    getMealById: (id: string) => any;
    updateMeal: (mealId: string, userId: string, data: any) => Promise<any>;
    deleteMeal: (mealId: string, userId: string) => Promise<any>;
};
//# sourceMappingURL=meal.service.d.ts.map