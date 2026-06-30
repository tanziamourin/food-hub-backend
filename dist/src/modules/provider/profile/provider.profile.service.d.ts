export declare const ProviderProfileService: {
    getProfile: (userId: string) => Promise<{
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../generated/client/enums").Role;
            phone: string | null;
            status: import("../../../generated/client/enums").UserStatus;
        };
    } & {
        id: string;
        phone: string | null;
        userId: string;
        description: string | null;
        shopName: string | null;
        address: string | null;
        logo: string | null;
    }>;
    getAllProviders: () => Promise<({
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../generated/client/enums").Role;
            phone: string | null;
            status: import("../../../generated/client/enums").UserStatus;
        };
        meals: ({
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
    } & {
        id: string;
        phone: string | null;
        userId: string;
        description: string | null;
        shopName: string | null;
        address: string | null;
        logo: string | null;
    })[]>;
    getProviderById: (id: string) => Promise<({
        user: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
            role: import("../../../generated/client/enums").Role;
            phone: string | null;
            status: import("../../../generated/client/enums").UserStatus;
        };
        meals: ({
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
    } & {
        id: string;
        phone: string | null;
        userId: string;
        description: string | null;
        shopName: string | null;
        address: string | null;
        logo: string | null;
    }) | null>;
    updateProfile: (userId: string, data: any) => Promise<{
        id: string;
        phone: string | null;
        userId: string;
        description: string | null;
        shopName: string | null;
        address: string | null;
        logo: string | null;
    }>;
};
//# sourceMappingURL=provider.profile.service.d.ts.map