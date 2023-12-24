/*
  Warnings:

  - The values [AGE_18_29,AGE_30_49,AGE_OVER_50] on the enum `drinking_insights_ageGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `user_metadata` MODIFY `ageRange` ENUM('AGE_16_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_54', 'AGE_55_64', 'AGE_65_74', 'AGE_OVER_75') NOT NULL;

-- CreateTable
CREATE TABLE `drinking_insights` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ageGroup` ENUM('AGE_16_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_54', 'AGE_55_64', 'AGE_65_74', 'AGE_OVER_75') NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `habit` VARCHAR(191) NOT NULL,
    `insight` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `drinking_insights_ageGroup_gender_habit_key`(`ageGroup`, `gender`, `habit`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
