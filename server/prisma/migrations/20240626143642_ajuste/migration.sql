/*
  Warnings:

  - You are about to alter the column `idUser` on the `investimento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `investimento` MODIFY `idUser` INTEGER NOT NULL;
