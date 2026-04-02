export declare const UserService: {
    getProfile: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        image: string | null;
        role: import("../../generated/client/enums").Role;
        phone: string | null;
        status: import("../../generated/client/enums").UserStatus;
    } | null>;
    updateProfile: (id: string, data: {
        name?: string;
        image?: string;
        phone?: string;
    }) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        image: string | null;
        role: import("../../generated/client/enums").Role;
        phone: string | null;
        status: import("../../generated/client/enums").UserStatus;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map