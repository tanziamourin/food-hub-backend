import { Request, Response } from "express";
import { AdminService } from "./admin.service";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { status } = req.body; // ACTIVE | SUSPENDED

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "User id and status are required",
      });
    }

    if (!["ACTIVE", "SUSPENDED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const user = await AdminService.updateUserStatus(
      id,
      status as "ACTIVE" | "SUSPENDED"
    );

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update user status",
    });
  }
};


export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const stats = await AdminService.getDashboardStats();

    res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};
