export declare const createOrderIntoDB: (userId: string, payload: any) => Promise<{
    order: {
        id: string;
        createdAt: Date;
        status: import("../../../generated/client/enums").OrderStatus;
        customerId: string;
        deliveryAddress: string;
        paymentStatus: import("../../../generated/client/enums").PaymentStatus;
        paymentIntentId: string | null;
        totalAmount: number;
    };
    clientSecret: string | null;
}>;
export declare const getMyOrdersFromDB: (userId: string) => Promise<({
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
    status: import("../../../generated/client/enums").OrderStatus;
    customerId: string;
    deliveryAddress: string;
    paymentStatus: import("../../../generated/client/enums").PaymentStatus;
    paymentIntentId: string | null;
    totalAmount: number;
})[]>;
//# sourceMappingURL=order.service.d.ts.map