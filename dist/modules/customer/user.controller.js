import { UserService } from "./user.service.js";
import sendResponse from "../../helper/sendResponse.js";
import catchAsync from "../../helper/catchAsync.js";
export const getMyProfile = catchAsync(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const result = await UserService.getProfile(user.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile fetched successfully",
        data: result,
    });
});
export const updateMyProfile = catchAsync(async (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { name, image, phone } = req.body;
    const result = await UserService.updateProfile(user.id, { name, image, phone });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
//# sourceMappingURL=user.controller.js.map