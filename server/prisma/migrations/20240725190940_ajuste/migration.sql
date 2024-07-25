/*
  Warnings:

  - Made the column `tipoDespesaId` on table `despesadebens` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `despesadebens` DROP FOREIGN KEY `DespesaDeBens_tipoDespesaId_fkey`;

-- AlterTable
ALTER TABLE `despesadebens` MODIFY `tipoDespesaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DespesaDeBens` ADD CONSTRAINT `DespesaDeBens_tipoDespesaId_fkey` FOREIGN KEY (`tipoDespesaId`) REFERENCES `TipoDespesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
