/*
  Warnings:

  - You are about to alter the column `valor` on the `contas` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.

*/
-- AlterTable
ALTER TABLE `contas` MODIFY `valor` DOUBLE NOT NULL;
