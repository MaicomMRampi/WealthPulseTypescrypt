/*
  Warnings:

  - Added the required column `idInvestimento` to the `GanhosInvestimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ganhosinvestimentos` ADD COLUMN `idInvestimento` INTEGER NOT NULL;
