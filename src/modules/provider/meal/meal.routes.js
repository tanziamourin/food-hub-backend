"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealsRouter = void 0;
var express_1 = require("express");
var auth_1 = require("../../../middleware/auth");
var meal_controller_1 = require("./meal.controller");
var router = (0, express_1.Router)();
// public
router.get("/", meal_controller_1.getMeals);
router.get("/:id", meal_controller_1.getMeal);
// provider only
router.post("/", (0, auth_1.default)(auth_1.UserRole.PROVIDER), meal_controller_1.createMeal);
router.patch("/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), meal_controller_1.updateMeal);
router.delete("/:id", (0, auth_1.default)(auth_1.UserRole.PROVIDER), meal_controller_1.deleteMeal);
exports.mealsRouter = router;
