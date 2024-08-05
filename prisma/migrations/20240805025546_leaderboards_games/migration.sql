-- AlterTable
ALTER TABLE `users` ADD COLUMN `avgAccuracy` DOUBLE NULL;

-- CreateTable
CREATE TABLE `leaderboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `rank` INTEGER NOT NULL,
    `avg` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `leaderboard_userId_key`(`userId`),
    INDEX `leaderboard_rank_idx`(`rank`),
    UNIQUE INDEX `leaderboard_userId_createdAt_key`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `solved` BOOLEAN NOT NULL,
    `accuracy` DOUBLE NOT NULL,
    `tries` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `leaderboard` ADD CONSTRAINT `leaderboard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
