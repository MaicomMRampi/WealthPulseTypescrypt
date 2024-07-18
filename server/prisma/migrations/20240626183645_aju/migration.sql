/*
  Warnings:

  - You are about to alter the column `idnomefundo` on the `investimentofundo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `investimentofundo` MODIFY `idnomefundo` INTEGER NOT NULL;
