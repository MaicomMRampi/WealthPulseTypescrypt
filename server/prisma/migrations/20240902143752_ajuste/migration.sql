-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;

-- CreateTable
CREATE TABLE `GanhosInvestimentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeInvestimento` VARCHAR(191) NOT NULL,
    `dataDoRendimento` DATETIME(3) NULL,
    `valor` DOUBLE NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
