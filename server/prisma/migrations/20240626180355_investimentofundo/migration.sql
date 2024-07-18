/*
  Warnings:

  - Added the required column `banco` to the `InvestimentoFundo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investimentofundo` ADD COLUMN `banco` VARCHAR(191) NOT NULL;
