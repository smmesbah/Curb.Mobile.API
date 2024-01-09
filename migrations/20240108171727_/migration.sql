/*
  Warnings:

  - You are about to drop the `midlands_post_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `midlands_post_codes`;

-- CreateTable
CREATE TABLE `east_midlands_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `east_midlands_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `west_midlands_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `west_midlands_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
