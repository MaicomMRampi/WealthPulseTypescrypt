/*
  Warnings:

  - You are about to alter the column `idPatrimonio` on the `despesadebens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `valor` on the `despesadebens` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `despesadebens` MODIFY `idPatrimonio` INTEGER NOT NULL,
    MODIFY `valor` DOUBLE NOT NULL;
