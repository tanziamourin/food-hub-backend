import { OrderStatus } from "../../../generated/client/enums";
export declare const ProviderOrderService: {
    getProviderOrders: (userId: string) => Promise<any>;
    updateOrderStatus: (orderId: string, userId: string, status: OrderStatus) => Promise<any>;
};
//# sourceMappingURL=provider.order.service.d.ts.map