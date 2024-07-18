/*
  Warnings:

  - You are about to drop the column `formaDePagamento` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `formaDePagamentoId` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesas` DROP COLUMN `formaDePagamento`,
    ADD COLUMN `formaDePagamentoId` VARCHAR(191) NOT NULL,
    ADD COLUMN `formaPagamentoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Despesas` ADD CONSTRAINT `Despesas_formaPagamentoId_fkey` FOREIGN KEY (`formaPagamentoId`) REFERENCES `FormaPagamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
