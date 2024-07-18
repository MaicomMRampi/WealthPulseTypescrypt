/*
  Warnings:

  - You are about to alter the column `idUser` on the `despesadebens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idUser` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `despesadebens` MODIFY `idUser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `despesas` MODIFY `idUser` INTEGER NOT NULL;
