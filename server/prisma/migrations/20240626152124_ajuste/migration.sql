/*
  Warnings:

  - You are about to alter the column `valorInvestido` on the `investimento` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Int`.

*/
-- AlterTable
ALTER TABLE `investimento` MODIFY `valorInvestido` INTEGER NOT NULL;
