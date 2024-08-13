/*
  Warnings:

  - Added the required column `idUser` to the `Banco` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `banco` ADD COLUMN `idUser` INTEGER NOT NULL;
