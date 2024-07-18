/*
  Warnings:

  - You are about to alter the column `formaDePagamentoId` on the `despesas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `despesas` MODIFY `formaDePagamentoId` INTEGER NOT NULL;
