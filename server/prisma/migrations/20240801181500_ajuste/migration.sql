/*
  Warnings:

  - Added the required column `dataAquisicao` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesas` ADD COLUMN `dataAquisicao` VARCHAR(191) NOT NULL;
