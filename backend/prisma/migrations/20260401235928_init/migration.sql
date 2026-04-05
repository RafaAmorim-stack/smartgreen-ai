-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lane` (
    `id` VARCHAR(191) NOT NULL,
    `key` ENUM('NORTH', 'EAST', 'SOUTH', 'WEST') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `displayOrder` INTEGER NOT NULL,
    `currentVehicleCount` INTEGER NOT NULL DEFAULT 0,
    `signalColor` ENUM('RED', 'YELLOW', 'GREEN') NOT NULL DEFAULT 'RED',
    `lastPriorityAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Lane_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrafficFlowReading` (
    `id` VARCHAR(191) NOT NULL,
    `laneId` VARCHAR(191) NOT NULL,
    `vehicleCount` INTEGER NOT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `TrafficFlowReading_laneId_recordedAt_idx`(`laneId`, `recordedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TrafficLight` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `mode` ENUM('AUTOMATIC') NOT NULL DEFAULT 'AUTOMATIC',
    `statusText` VARCHAR(191) NOT NULL,
    `cycleSeconds` INTEGER NOT NULL DEFAULT 30,
    `currentPriorityLaneId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TrafficFlowReading` ADD CONSTRAINT `TrafficFlowReading_laneId_fkey` FOREIGN KEY (`laneId`) REFERENCES `Lane`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TrafficLight` ADD CONSTRAINT `TrafficLight_currentPriorityLaneId_fkey` FOREIGN KEY (`currentPriorityLaneId`) REFERENCES `Lane`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
