"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
var express_1 = require("express");
var admin_controller_1 = require("./admin.controller");
var auth_1 = require("../../middleware/auth");
var router = (0, express_1.Router)();
// Admin  routes
router.use((0, auth_1.default)(auth_1.UserRole.ADMIN));
router.get("/users", admin_controller_1.getUsers);
router.patch("/users/:id/status", admin_controller_1.updateUserStatus);
router.patch("/users/:id/role", (0, auth_1.default)(auth_1.UserRole.ADMIN), admin_controller_1.updateUserRole);
router.get("/stats", admin_controller_1.getDashboardStats);
exports.adminRouter = router;
