import { CategoryService } from "./category.service";
const create = async (req, res) => {
    const result = await CategoryService.create(req.body);
    res.status(201).json(result);
};
const getAll = async (_req, res) => {
    const result = await CategoryService.getAll();
    res.json(result);
};
const getById = async (req, res) => {
    const result = await CategoryService.getById(req.params.id);
    if (!result) {
        return res.status(404).json({ message: "Category not found" });
    }
    res.json(result);
};
const update = async (req, res) => {
    const result = await CategoryService.update(req.params.id, req.body);
    res.json(result);
};
const remove = async (req, res) => {
    await CategoryService.remove(req.params.id);
    res.status(204).send();
};
export const CategoryController = {
    create,
    getAll,
    getById,
    update,
    remove,
};
