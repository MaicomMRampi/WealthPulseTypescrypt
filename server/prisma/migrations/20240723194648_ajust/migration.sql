/*
  Warnings:

  - Added the required column `idUser` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria` ADD COLUMN `idUser` INTEGER NOT NULL;
