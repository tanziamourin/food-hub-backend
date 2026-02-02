import { Request, Response } from "express";
import * as OrderService from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
  const result = await OrderService.createOrderIntoDB(
    req.user!.id,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Order placed successfully",
    data: result,
  });
};

export const getMyOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getMyOrdersFromDB(req.user!.id);
  res.json({ success: true, data: result });
};
