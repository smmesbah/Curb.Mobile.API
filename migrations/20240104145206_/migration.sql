/*
  Warnings:

  - You are about to drop the column `step_1` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_2` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_3` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_4` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_5` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_6` on the `onboarding_steps` table. All the data in the column will be lost.
  - You are about to drop the column `step_7` on the `onboarding_steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `onboarding_steps` DROP COLUMN `step_1`,
    DROP COLUMN `step_2`,
    DROP COLUMN `step_3`,
    DROP COLUMN `step_4`,
    DROP COLUMN `step_5`,
    DROP COLUMN `step_6`,
    DROP COLUMN `step_7`,
    ADD COLUMN `step` INTEGER NOT NULL DEFAULT 0;
