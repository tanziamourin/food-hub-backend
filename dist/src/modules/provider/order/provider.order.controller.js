import { ProviderOrderService } from "./provider.order.service";
export const getProviderOrders = async (req, res) => {
    const providerId = req.user.id;
    const orders = await ProviderOrderService.getProviderOrders(providerId);
    res.json(orders);
};
export const updateOrderStatus = async (req, res) => {
    const id = req.params.id;
    const { status } = req.body;
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    await ProviderOrderService.updateOrderStatus(id, req.user.id, status);
    res.json({ message: "Order status updated" });
};
//# sourceMappingURL=provider.order.controller.js.map