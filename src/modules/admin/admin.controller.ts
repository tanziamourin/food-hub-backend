import { Request, Response } from "express";
import { AdminService } from "./admin.service";
import { UserRole } from "../../middleware/auth";

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
export const getProviders = async (_req: Request, res: Response) => {
  try {
    const providers = await AdminService.getAllProviders();

    res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch providers",
    });
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const userId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const { status } = req.body; 
    if (!userId) {
  return res.status(400).json({
    success: false,
    message: "User ID is required",
  });
}
    if (!userId || !status) {
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
      userId as string ,
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

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "User id and role are required",
      });
    }

    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role value",
      });
    }
    if (req.user!.id === userId) {
  return res.status(400).json({
    success: false,
    message: "You cannot change your own role",
  });
}

    const updatedUser = await AdminService.updateUserRole(
      userId as string,
      role
    );

    res.json({
      success: true,
      message: "User role updated",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update role",
    });
  }
};