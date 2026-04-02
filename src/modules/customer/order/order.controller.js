import * as OrderService from "./order.service";
import { createOrderIntoDB } from "./order.service";
// export const createOrder = async (req: Request, res: Response) => {
//   const result = await OrderService.createOrderIntoDB(
//     req.user!.id,
//     req.body
//   );
//   res.status(201).json({
//     success: true,
//     message: "Order placed successfully",
//     data: result,
//   });
// };
export const createOrder = async (req, res) => {
    const userId = req.user.id;
    const result = await createOrderIntoDB(userId, req.body);
    res.json({
        success: true,
        data: result,
    });
};
export const getMyOrders = async (req, res) => {
    const result = await OrderService.getMyOrdersFromDB(req.user.id);
    res.json({ success: true, data: result });
};
