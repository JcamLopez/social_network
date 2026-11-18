/*
  Warnings:

  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `documnet` on the `person` table. All the data in the column will be lost.
  - Added the required column `document` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_personDocument_fkey`;

-- AlterTable
ALTER TABLE `person` DROP PRIMARY KEY,
    DROP COLUMN `documnet`,
    ADD COLUMN `document` VARCHAR(10) NOT NULL,
    ADD PRIMARY KEY (`document`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_personDocument_fkey` FOREIGN KEY (`personDocument`) REFERENCES `Person`(`document`) ON DELETE RESTRICT ON UPDATE CASCADE;
