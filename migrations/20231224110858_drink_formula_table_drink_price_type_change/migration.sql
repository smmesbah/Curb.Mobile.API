/*
  Warnings:

  - You are about to alter the column `drinkPriceLondon` on the `drink_formula` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,4)`.
  - You are about to alter the column `drinkPriceUK` on the `drink_formula` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,4)`.
  - You are about to alter the column `drinkUnits` on the `drink_formula` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,4)`.

*/
-- AlterTable
ALTER TABLE `drink_formula` MODIFY `drinkPriceLondon` DECIMAL(10, 4) NULL,
    MODIFY `drinkPriceUK` DECIMAL(10, 4) NULL,
    MODIFY `drinkUnits` DECIMAL(10, 4) NOT NULL;
