/*
  Warnings:

  - You are about to alter the column `idUser` on the `dividendo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `acao` MODIFY `dataCompra` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `dividendo` MODIFY `idUser` INTEGER NOT NULL;
