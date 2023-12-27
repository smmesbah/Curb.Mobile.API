/*
  Warnings:

  - Added the required column `date` to the `daily_health_checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `daily_health_checkin` ADD COLUMN `date` VARCHAR(191) NOT NULL;
