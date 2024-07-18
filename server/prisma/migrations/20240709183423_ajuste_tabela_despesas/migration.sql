/*
  Warnings:

  - You are about to alter the column `dataGasto` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - Added the required column `mescorrespondente` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesas` ADD COLUMN `mescorrespondente` VARCHAR(191) NOT NULL,
    MODIFY `dataGasto` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
