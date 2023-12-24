/*
  Warnings:

  - A unique constraint covering the columns `[drinkName,drinkVolume,drinkPriceUK,drinkPriceLondon,drinkCalories,drinkUnits,sourceLink]` on the table `drink_formula` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `drink_formula_drinkName_drinkVolume_drinkPriceUK_drinkPriceL_key` ON `drink_formula`(`drinkName`, `drinkVolume`, `drinkPriceUK`, `drinkPriceLondon`, `drinkCalories`, `drinkUnits`, `sourceLink`);
