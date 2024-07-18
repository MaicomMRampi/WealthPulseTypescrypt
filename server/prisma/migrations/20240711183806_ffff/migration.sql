-- DropForeignKey
ALTER TABLE `despesas` DROP FOREIGN KEY `Despesas_formaPagamentoId_fkey`;

-- AddForeignKey
ALTER TABLE `Despesas` ADD CONSTRAINT `Despesas_formaDePagamentoId_fkey` FOREIGN KEY (`formaDePagamentoId`) REFERENCES `FormaPagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
