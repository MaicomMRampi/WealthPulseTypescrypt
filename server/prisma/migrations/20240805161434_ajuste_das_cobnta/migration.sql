/*
  Warnings:

  - You are about to drop the `controledecontas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `controledecontas`;

-- CreateTable
CREATE TABLE `Contas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `estabelecimento` VARCHAR(191) NOT NULL,
    `comprador` VARCHAR(191) NOT NULL,
    `pagador` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `datavencimento` VARCHAR(191) NOT NULL,
    `qtdparcelas` INTEGER NULL,
    `pago` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
