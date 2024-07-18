/*
  Warnings:

  - You are about to alter the column `valorprovento` on the `proventos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `proventos` MODIFY `valorprovento` DOUBLE NOT NULL;
