-- CreateTable
CREATE TABLE `weekly_drink_info` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `drinkType` ENUM('BEER_CIDER', 'WINE_FIZZ', 'SPIRITS_SHOTS') NOT NULL,
    `drinkName` VARCHAR(191) NOT NULL,
    `drinkVolume` VARCHAR(191) NOT NULL,
    `drinkQuantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weekly_drink_info` ADD CONSTRAINT `weekly_drink_info_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
