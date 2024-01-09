-- CreateTable
CREATE TABLE `london_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `london_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `north_east_and_yorkshire_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `north_east_and_yorkshire_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `midlands_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `midlands_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `south_west_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `south_west_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `south_east_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `south_east_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `east_of_england_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `east_of_england_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `north_west_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `north_west_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scotland_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `scotland_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wales_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `wales_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `northern_ireland_post_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postCode` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `northern_ireland_post_codes_postCode_key`(`postCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
