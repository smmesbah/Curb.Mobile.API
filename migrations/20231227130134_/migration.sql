-- CreateTable
CREATE TABLE `daily_drink_checkin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `drinkType` ENUM('BEER_CIDER', 'WINE_FIZZ', 'SPIRITS_SHOTS') NOT NULL,
    `drinkName` VARCHAR(191) NOT NULL,
    `drinkVolume` VARCHAR(191) NOT NULL,
    `drinkQuantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `daily_health_checkin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sleep` VARCHAR(191) NOT NULL,
    `mood` VARCHAR(191) NOT NULL,
    `energy` VARCHAR(191) NOT NULL,
    `willPower` VARCHAR(191) NOT NULL,
    `place` VARCHAR(191) NOT NULL,
    `people` VARCHAR(191) NOT NULL,
    `activity` VARCHAR(191) NOT NULL,
    `note` VARCHAR(1000) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `daily_drink_checkin` ADD CONSTRAINT `daily_drink_checkin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `daily_health_checkin` ADD CONSTRAINT `daily_health_checkin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
