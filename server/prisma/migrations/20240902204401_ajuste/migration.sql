-- AlterTable
ALTER TABLE `ganhosinvestimentos` MODIFY `dataDoRendimento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;
