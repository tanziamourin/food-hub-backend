import { OrderStatus } from "../../../generated/client/enums";
export declare const ProviderOrderService: {
    getProviderOrders: (userId: string) => Promise<({
        customer: {
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
        items: ({
            meal: {
                name: string;
                id: string;
                image: string | null;
                providerId: string;
                description: string;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            quantity: number;
            mealId: string;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        status: OrderStatus;
        customerId: string;
        deliveryAddress: string;
        paymentStatus: import("../../../generated/client/enums").PaymentStatus;
        paymentIntentId: string | null;
        totalAmount: number;
    })[]>;
    updateOrderStatus: (orderId: string, userId: string, status: OrderStatus) => Promise<import("../../../generated/client/internal/prismaNamespace").BatchPayload>;
};
//# sourceMappingURL=provider.order.service.d.ts.map