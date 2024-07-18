/*
  Warnings:

  - You are about to alter the column `idNomeInvestimento` on the `dividendo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `dividendo` MODIFY `idNomeInvestimento` INTEGER NOT NULL;
