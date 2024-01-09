/*
  Warnings:

  - You are about to drop the `north_east_and_yorkshire_post_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `north_east_and_yorkshire_post_codes`;

-- CreateTable
CREATE TABLE `drinking_insights_based_on_place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `place` ENUM('LONDON', 'NORTH_EAST', 'NORTH_WEST', 'YORKSHIRE_AND_HUMBER', 'EAST_MIDLANDS', 'WEST_MIDLANDS', 'EAST_OF_ENGLAND', 'SOUTH_EAST', 'SOUTH_WEST', 'SCOTLAND', 'WALES', 'NORTHERN_IRELAND', 'OTHER') NOT NULL,
    `habit` VARCHAR(191) NOT NULL,
    `insight` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `drinking_insights_based_on_place_habit_place_key`(`habit`, `place`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `yorkshire_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `yorkshire_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `north_east_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `north_east_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
