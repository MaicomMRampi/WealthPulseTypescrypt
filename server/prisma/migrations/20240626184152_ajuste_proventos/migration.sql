/*
  Warnings:

  - You are about to alter the column `idinvestimento` on the `proventos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `iduser` on the `proventos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `idnomeinvestimento` on the `proventos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `proventos` MODIFY `idinvestimento` INTEGER NOT NULL,
    MODIFY `iduser` INTEGER NOT NULL,
    MODIFY `idnomeinvestimento` INTEGER NOT NULL;
