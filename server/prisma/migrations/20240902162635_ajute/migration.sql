-- AlterTable
ALTER TABLE `ganhosinvestimentos` ADD COLUMN `tipoDeInvestimento` VARCHAR(191) NULL,
    MODIFY `nomeInvestimento` VARCHAR(191) NULL,
    MODIFY `valor` DOUBLE NULL,
    MODIFY `idUser` INTEGER NULL;

-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;
