/*
  Warnings:

  - You are about to drop the column `UserLoginCount` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `UserLoginCount`,
    ADD COLUMN `userLoginCount` INTEGER NOT NULL DEFAULT 0;
