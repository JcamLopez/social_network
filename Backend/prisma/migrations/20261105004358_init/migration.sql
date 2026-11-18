-- CreateTable
CREATE TABLE `Person` (
    `documnet` VARCHAR(10) NOT NULL,
    `typeDoc` ENUM('CC', 'PP', 'TI') NOT NULL,
    `firtsName` VARCHAR(50) NOT NULL,
    `middlwName` VARCHAR(50) NULL,
    `fullLastName` VARCHAR(50) NOT NULL,
    `age` INTEGER NOT NULL,

    PRIMARY KEY (`documnet`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeDocumnet` (
    `type` ENUM('CC', 'PP', 'TI') NOT NULL,
    `status` ENUM('ACTIVED', 'INACTIVED') NOT NULL DEFAULT 'ACTIVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `email` VARCHAR(100) NOT NULL,
    `personDocument` VARCHAR(10) NOT NULL,
    `password` VARCHAR(50) NOT NULL,
    `status` ENUM('ACTIVED', 'INACTIVED') NOT NULL DEFAULT 'ACTIVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_personDocument_key`(`personDocument`),
    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publication` (
    `publicationId` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(100) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('ACTIVED', 'INACTIVED') NOT NULL DEFAULT 'ACTIVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`publicationId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `categoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `status` ENUM('ACTIVED', 'INACTIVED') NOT NULL DEFAULT 'ACTIVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PublicationCategory` (
    `publicationId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `status` ENUM('ACTIVED', 'INACTIVED') NOT NULL DEFAULT 'ACTIVED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PublicationCategory_publicationId_categoryId_key`(`publicationId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Person` ADD CONSTRAINT `Person_typeDoc_fkey` FOREIGN KEY (`typeDoc`) REFERENCES `TypeDocumnet`(`type`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_personDocument_fkey` FOREIGN KEY (`personDocument`) REFERENCES `Person`(`documnet`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Publication` ADD CONSTRAINT `Publication_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationCategory` ADD CONSTRAINT `PublicationCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PublicationCategory` ADD CONSTRAINT `PublicationCategory_publicationId_fkey` FOREIGN KEY (`publicationId`) REFERENCES `Publication`(`publicationId`) ON DELETE RESTRICT ON UPDATE CASCADE;
