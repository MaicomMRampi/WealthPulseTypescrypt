/*
  Warnings:

  - Added the required column `litros` to the `DespesaDeBens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesadebens` ADD COLUMN `litros` DOUBLE NOT NULL;
