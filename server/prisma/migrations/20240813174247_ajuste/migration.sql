/*
  Warnings:

  - Added the required column `idUser` to the `Investimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investimento` ADD COLUMN `idUser` INTEGER NOT NULL;
