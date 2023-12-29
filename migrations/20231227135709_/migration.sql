/*
  Warnings:

  - You are about to drop the column `place` on the `daily_health_checkin` table. All the data in the column will be lost.
  - You are about to alter the column `sleep` on the `daily_health_checkin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `mood` on the `daily_health_checkin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `energy` on the `daily_health_checkin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `willPower` on the `daily_health_checkin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `places` to the `daily_health_checkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `daily_health_checkin` DROP COLUMN `place`,
    ADD COLUMN `places` VARCHAR(191) NOT NULL,
    MODIFY `sleep` INTEGER NOT NULL,
    MODIFY `mood` INTEGER NOT NULL,
    MODIFY `energy` INTEGER NOT NULL,
    MODIFY `willPower` INTEGER NOT NULL;
