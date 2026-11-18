/*
  Warnings:

  - You are about to drop the column `middlwName` on the `person` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `person` DROP COLUMN `middlwName`,
    ADD COLUMN `middleName` VARCHAR(50) NULL;
