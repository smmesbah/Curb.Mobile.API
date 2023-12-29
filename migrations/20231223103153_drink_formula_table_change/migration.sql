/*
  Warnings:

  - You are about to drop the column `drinkPrice` on the `drink_formula` table. All the data in the column will be lost.
  - You are about to drop the column `drinkQuantity` on the `drink_formula` table. All the data in the column will be lost.
  - You are about to alter the column `sourceLink` on the `drink_formula` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - Added the required column `drinkUnits` to the `drink_formula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `drink_formula` DROP COLUMN `drinkPrice`,
    DROP COLUMN `drinkQuantity`,
    ADD COLUMN `drinkPriceLondon` DECIMAL(65, 30) NULL,
    ADD COLUMN `drinkPriceUK` DECIMAL(65, 30) NULL,
    ADD COLUMN `drinkUnits` DECIMAL(65, 30) NOT NULL,
    MODIFY `sourceLink` VARCHAR(191) NULL;
