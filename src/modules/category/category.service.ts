import { prisma } from "../../lib/prisma";

const create = async (payload: { name: string }) => {
  return prisma.category.create({ data: payload });
};

const getAll = async () => {
  return prisma.category.findMany();
};

const getById = async (id: string) => {
  return prisma.category.findUnique({ where: { id } });
};

const update = async (id: string, payload: { name: string }) => {
  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const remove = async (id: string) => {
  return prisma.category.delete({ where: { id } });
};

export const CategoryService = {
  create,
  getAll,
  getById,
  update,
  remove,
};
