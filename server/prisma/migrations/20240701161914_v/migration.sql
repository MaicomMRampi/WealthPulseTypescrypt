/*
  Warnings:

  - You are about to drop the column `iduser` on the `tipodespesa` table. All the data in the column will be lost.
  - You are about to drop the column `nomedespesa` on the `tipodespesa` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `TipoDespesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeDespesa` to the `TipoDespesa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tipodespesa` DROP COLUMN `iduser`,
    DROP COLUMN `nomedespesa`,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    ADD COLUMN `nomeDespesa` VARCHAR(191) NOT NULL;
