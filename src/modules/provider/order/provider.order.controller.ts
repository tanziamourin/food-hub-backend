import { Request, Response } from "express";
import { ProviderOrderService } from "./provider.order.service";

export const getProviderOrders = async (req: Request, res: Response) => {
  const providerId = req.user!.id;

  const orders = await ProviderOrderService.getProviderOrders(providerId);
  res.json(orders);
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  await ProviderOrderService.updateOrderStatus(
    id,
    req.user!.id,
    status
  );

  res.json({ message: "Order status updated" });
};
