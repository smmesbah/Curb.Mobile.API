-- CreateTable
CREATE TABLE `onboarding_steps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `step_1` BOOLEAN NOT NULL DEFAULT false,
    `step_2` BOOLEAN NOT NULL DEFAULT false,
    `step_3` BOOLEAN NOT NULL DEFAULT false,
    `step_4` BOOLEAN NOT NULL DEFAULT false,
    `step_5` BOOLEAN NOT NULL DEFAULT false,
    `step_6` BOOLEAN NOT NULL DEFAULT false,
    `step_7` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `onboarding_steps_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `onboarding_steps` ADD CONSTRAINT `onboarding_steps_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
