/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,mealId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliveryAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "deliveryAddress" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_orderId_mealId_key" ON "OrderItem"("orderId", "mealId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_mealId_key" ON "Review"("userId", "mealId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
