"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var node_1 = require("better-auth/node");
var auth_1 = require("./lib/auth");
var globalErrorHandler_1 = require("./middleware/globalErrorHandler");
var notFound_1 = require("./middleware/notFound");
var auth_2 = require("./middleware/auth");
// import { prisma } from "./lib/prisma";
var config_1 = require("./config");
// import {categoryRouter} from "./modules/category/category.route";
// import { getMyProfile } from "./modules/customer/user.controller";
var user_route_1 = require("./modules/customer/user.route");
var meal_routes_1 = require("./modules/provider/meal/meal.routes");
var provider_order_routes_1 = require("./modules/provider/order/provider.order.routes");
var prisma_1 = require("./lib/prisma");
var order_routes_1 = require("./modules/customer/order/order.routes");
var admin_route_1 = require("./modules/admin/admin.route");
var user_controller_1 = require("./modules/customer/user.controller");
var category_routes_1 = require("./modules/category/category.routes");
// import { adminRouter } from "./modules/admin/admin.routes";
var app = (0, express_1.default)();
var allowedOrigins = [
    config_1.config.app_url,
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
// Auth routes
app.get("/api/auth/me", (0, auth_2.default)(), user_controller_1.getMyProfile);
app.use("/api/auth", (0, node_1.toNodeHandler)(auth_1.auth));
app.post("/api/auth/register", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log(">>> [REG_PROXY] START:", (_a = req.body) === null || _a === void 0 ? void 0 : _a.email);
                res.setHeader('Content-Type', 'application/json');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                return [4 /*yield*/, auth_1.auth.api.signUpEmail({
                        body: req.body,
                    })];
            case 2:
                result = _b.sent();
                data = result;
                if (data === null || data === void 0 ? void 0 : data.error) {
                    return [2 /*return*/, res.status(200).json({ error: data.error })];
                }
                if (!(data === null || data === void 0 ? void 0 : data.user)) return [3 /*break*/, 4];
                console.log(">>> [REG_PROXY] User created. Verifying email...");
                // Auto-verify on registration
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: { email: data.user.email },
                        data: { emailVerified: true }
                    }).catch(function (e) { return console.error(">>> [REG_PROXY] Auto-verify failed:", e.message); })];
            case 3:
                // Auto-verify on registration
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        success: true,
                        message: "Account created successfully",
                        user: __assign(__assign({}, data.user), { emailVerified: true }),
                        session: data.session || null
                    })];
            case 4: return [2 /*return*/, res.status(200).json(result)];
            case 5:
                err_1 = _b.sent();
                console.error(">>> [REG_PROXY] FATAL:", err_1);
                return [2 /*return*/, res.status(500).json({
                        error: { message: err_1.message || "Internal Server Error" }
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); });
app.post("/api/auth/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, data, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                return [4 /*yield*/, auth_1.auth.api.signInEmail({ body: req.body })];
            case 1:
                result = _b.sent();
                data = result;
                if (!((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.email)) return [3 /*break*/, 3];
                console.log(" User logged in. Ensuring emailVerified: true");
                // Auto-verify on login (in case they were created before this change)
                return [4 /*yield*/, prisma_1.prisma.user.update({
                        where: { email: data.user.email },
                        data: { emailVerified: true }
                    }).catch(function (e) { return console.error(" Auto-verify failed:", e.message); })];
            case 2:
                // Auto-verify on login (in case they were created before this change)
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, res.json(result)];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                return [2 /*return*/, res.status(500).json({
                        error: { message: err_2.message || "Internal Server Error" }
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// User routes
app.use("/api/users", user_route_1.userRouter);
app.use("/api/orders", order_routes_1.orderRouter);
// Public Meals
app.use("/api/meals", meal_routes_1.mealsRouter);
app.use("/api/categories", category_routes_1.categoryRouter);
// Provider Management
app.use("/api/provider/meals", meal_routes_1.mealsRouter);
app.use("/api/provider/orders", provider_order_routes_1.providerOrderRouter);
app.use("/api/admin", admin_route_1.adminRouter);
// Root
app.get("/", function (_req, res) { return res.send("Food Hub Backend is running!"); });
// Error handling
app.use(notFound_1.notFound);
app.use(globalErrorHandler_1.default);
exports.default = app;
