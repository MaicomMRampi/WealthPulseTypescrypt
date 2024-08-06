/*
  Warnings:

  - Added the required column `mesAno` to the `Contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contas` ADD COLUMN `mesAno` VARCHAR(191) NOT NULL;
