"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = require("express");
var user_controller_1 = require("./user.controller");
// import authMiddleware from "../../middleware/auth";
var auth_1 = require("../../middleware/auth");
var router = (0, express_1.Router)();
// Get own profile
router.get("/me", (0, auth_1.default)(), user_controller_1.getMyProfile);
// Update own profile
router.patch("/me", (0, auth_1.default)(), user_controller_1.updateMyProfile);
exports.userRouter = router;
