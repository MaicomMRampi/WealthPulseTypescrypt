/*
  Warnings:

  - You are about to drop the column `mescorrespondente` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `mesCorrespondente` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesas` DROP COLUMN `mescorrespondente`,
    ADD COLUMN `mesCorrespondente` VARCHAR(191) NOT NULL;
