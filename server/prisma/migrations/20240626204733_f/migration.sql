/*
  Warnings:

  - You are about to alter the column `idInvestimento` on the `dividendo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `dividendo` MODIFY `idInvestimento` INTEGER NOT NULL;
