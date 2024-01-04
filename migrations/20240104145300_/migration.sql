/*
  Warnings:

  - You are about to drop the column `step` on the `onboarding_steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `onboarding_steps` DROP COLUMN `step`,
    ADD COLUMN `stepCompleted` INTEGER NOT NULL DEFAULT 0;
