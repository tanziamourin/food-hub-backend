import { Role, UserStatus } from "../../generated/client/enums";
export declare const AdminService: {
    getAllUsers: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        email: string;
        role: Role;
        status: UserStatus;
    }[]>;
    getAllProviders: () => Promise<({
        user: {
            name: string;
            email: string;
        };
    } & {
        id: string;
        phone: string | null;
        userId: string;
        description: string | null;
        shopName: string | null;
        address: string | null;
        logo: string | null;
    })[]>;
    updateUserStatus: (id: string, status: UserStatus) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: Role;
        phone: string | null;
        status: UserStatus;
    }>;
    getDashboardStats: () => Promise<{
        users: number;
        providers: number;
        meals: number;
        orders: number;
    }>;
    updateUserRole: (userId: string, role: Role) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        image: string | null;
        role: Role;
        phone: string | null;
        status: UserStatus;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map