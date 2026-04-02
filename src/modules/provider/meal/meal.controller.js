import { MealService } from "./meal.service";
// PUBLIC
export const getMeals = async (_req, res) => {
    const meals = await MealService.getMeals();
    res.json(meals);
};
export const getMeal = async (req, res) => {
    const id = req.params.id;
    const meal = await MealService.getMealById(id);
    res.json(meal);
};
// PROVIDER ONLY
export const createMeal = async (req, res) => {
    try {
        const meal = await MealService.createMeal(req.user.id, req.body);
        res.status(201).json(meal);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
export const updateMeal = async (req, res) => {
    const id = req.params.id;
    const result = await MealService.updateMeal(id, req.user.id, req.body);
    if (result.count === 0) {
        return res.status(403).json({ message: "Not allowed" });
    }
    res.json({ success: true });
};
export const deleteMeal = async (req, res) => {
    const id = req.params.id;
    const result = await MealService.deleteMeal(id, req.user.id);
    if (result.count === 0) {
        return res.status(403).json({ message: "Not allowed" });
    }
    res.status(204).send();
};
