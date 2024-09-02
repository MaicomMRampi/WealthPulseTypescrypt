-- AlterTable
ALTER TABLE `investimento` ADD COLUMN `previsaoDeGanho` DOUBLE NULL;

-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;
