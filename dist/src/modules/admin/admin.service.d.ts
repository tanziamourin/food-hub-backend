import { Role, UserStatus } from "../../generated/client/enums";
export declare const AdminService: {
    getAllUsers: () => Promise<any>;
    getAllProviders: () => Promise<any>;
    updateUserStatus: (id: string, status: UserStatus) => Promise<any>;
    getDashboardStats: () => Promise<{
        users: any;
        providers: any;
        meals: any;
        orders: any;
    }>;
    updateUserRole: (userId: string, role: Role) => Promise<any>;
};
//# sourceMappingURL=admin.service.d.ts.map