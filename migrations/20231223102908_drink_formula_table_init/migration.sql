-- CreateTable
CREATE TABLE `drink_formula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drinkName` VARCHAR(255) NOT NULL,
    `drinkVolume` VARCHAR(255) NOT NULL,
    `drinkPrice` DOUBLE NOT NULL,
    `drinkCalories` INTEGER NOT NULL,
    `drinkQuantity` INTEGER NOT NULL,
    `sourceLink` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
