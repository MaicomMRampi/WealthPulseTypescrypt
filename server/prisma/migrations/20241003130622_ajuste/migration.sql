-- AlterTable
ALTER TABLE `fechamentoinvestimento` ADD COLUMN `nomeInvestimento` VARCHAR(191) NULL,
    ADD COLUMN `tipoInvestimento` VARCHAR(191) NULL,
    MODIFY `valorInvestido` DOUBLE NULL,
    MODIFY `valorResgatado` DOUBLE NULL,
    MODIFY `dataFechamento` VARCHAR(191) NULL,
    MODIFY `tipoFechamento` VARCHAR(191) NULL;
