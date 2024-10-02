-- CreateTable
CREATE TABLE `FechamentoInvestimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idInvestimento` INTEGER NOT NULL,
    `idUser` INTEGER NOT NULL,
    `valorInvestido` DOUBLE NOT NULL,
    `valorResgatado` DOUBLE NOT NULL,
    `dataFechamento` VARCHAR(191) NOT NULL,
    `retornoObtido` DOUBLE NULL,
    `tipoFechamento` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `dataSaque` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
