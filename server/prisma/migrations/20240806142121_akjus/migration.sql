/*
  Warnings:

  - You are about to drop the column `mesAno` on the `contas` table. All the data in the column will be lost.
  - Added the required column `mesCorrespondente` to the `Contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contas` DROP COLUMN `mesAno`,
    ADD COLUMN `mesCorrespondente` VARCHAR(191) NOT NULL;
