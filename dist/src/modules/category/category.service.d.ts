export declare const CategoryService: {
    create: (payload: {
        name: string;
    }) => Promise<{
        name: string;
        id: string;
    }>;
    getAll: () => Promise<{
        name: string;
        id: string;
    }[]>;
    getById: (id: string) => Promise<{
        name: string;
        id: string;
    } | null>;
    update: (id: string, payload: {
        name: string;
    }) => Promise<{
        name: string;
        id: string;
    }>;
    remove: (id: string) => Promise<{
        name: string;
        id: string;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map