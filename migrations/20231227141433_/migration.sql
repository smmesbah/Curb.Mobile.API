/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `daily_health_checkin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `daily_health_checkin_userId_date_key` ON `daily_health_checkin`(`userId`, `date`);
