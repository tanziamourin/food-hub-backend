import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const create = async (req: Request, res: Response) => {
  const result = await CategoryService.create(req.body);
  res.status(201).json(result);
};

const getAll = async (_req: Request, res: Response) => {
  const result = await CategoryService.getAll();
  res.json(result);
};

const getById = async (req: Request, res: Response) => {
  const result = await CategoryService.getById(req.params.id as string);
  if (!result) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(result);
};

const update = async (req: Request, res: Response) => {
  const result = await CategoryService.update(req.params.id as string, req.body);
  res.json(result);
};

const remove = async (req: Request, res: Response) => {
  await CategoryService.remove(req.params.id as string);
  res.status(204).send();
};

export const CategoryController = {
  create,
  getAll,
  getById,
  update,
  remove,
};
