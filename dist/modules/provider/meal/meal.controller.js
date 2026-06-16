import { MealService } from "./meal.service.js";
// ✅ PUBLIC
export const getMeals = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const meals = await MealService.getMeals({
            page,
            limit,
            search,
        });
        res.json(meals);
    }
    catch (error) {
        console.error("GET MEALS ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch meals",
        });
    }
};
export const getMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const meal = await MealService.getMealById(id);
        res.json(meal);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to get meal" });
    }
};
// ✅ PROVIDER ONLY
export const createMeal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const meal = await MealService.createMeal(req.user.id, req.body);
        res.status(201).json(meal);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const updateMeal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const id = req.params.id;
        const result = await MealService.updateMeal(id, req.user.id, req.body);
        if (result.count === 0) {
            return res.status(403).json({ message: "Not allowed" });
        }
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ message: "Update failed" });
    }
};
export const deleteMeal = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const id = req.params.id;
        const result = await MealService.deleteMeal(id, req.user.id);
        if (result.count === 0) {
            return res.status(403).json({ message: "Not allowed" });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Delete failed" });
    }
};
//# sourceMappingURL=meal.controller.js.map