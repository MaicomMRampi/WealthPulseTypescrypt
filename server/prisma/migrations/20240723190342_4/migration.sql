/*
  Warnings:

  - Added the required column `idUser` to the `FormaPagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `formapagamento` ADD COLUMN `idUser` INTEGER NOT NULL;
