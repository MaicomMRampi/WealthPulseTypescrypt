-- AlterTable
ALTER TABLE `despesadebens` ADD COLUMN `tipoDespesaId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `DespesaDeBens` ADD CONSTRAINT `DespesaDeBens_tipoDespesaId_fkey` FOREIGN KEY (`tipoDespesaId`) REFERENCES `TipoDespesa`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
