/*
  Warnings:

  - Added the required column `drinkDate` to the `daily_drink_checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `daily_drink_checkin` ADD COLUMN `drinkDate` DATETIME(3) NOT NULL;
