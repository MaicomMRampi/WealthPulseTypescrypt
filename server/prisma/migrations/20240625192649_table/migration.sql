/*
  Warnings:

  - You are about to alter the column `dataCompra` on the `acao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dataGasto` on the `controledecontas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `vencimento` on the `controledecontas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dataGasto` on the `controlegastos` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `dataAquisicao` on the `despesadebens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `acao` MODIFY `valorInvestido` DECIMAL(65, 30) NOT NULL,
    MODIFY `dataCompra` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `controledecontas` MODIFY `dataGasto` DATETIME(3) NOT NULL,
    MODIFY `vencimento` DATETIME(3) NOT NULL,
    MODIFY `valorConta` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `controlegastos` MODIFY `dataGasto` DATETIME(3) NOT NULL,
    MODIFY `valorGasto` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `despesadebens` MODIFY `valor` DECIMAL(65, 30) NOT NULL,
    MODIFY `dataAquisicao` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `dividendo` MODIFY `valorDividendo` DECIMAL(65, 30) NOT NULL;

-- CreateTable
CREATE TABLE `FormaPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFormaPagamento` VARCHAR(191) NOT NULL,
    `valorFormaPagamento` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FormaPagamento_nomeFormaPagamento_key`(`nomeFormaPagamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` VARCHAR(191) NOT NULL,
    `nomeinvestimento` VARCHAR(191) NOT NULL,
    `datacompra` DATETIME(3) NOT NULL,
    `valorinvestido` DECIMAL(65, 30) NOT NULL,
    `vencimentoativo` DATETIME(3) NOT NULL,
    `emailuser` VARCHAR(191) NOT NULL,
    `diasParaVencimento` INTEGER NOT NULL,
    `valoratualinvestimento` DECIMAL(65, 30) NOT NULL,
    `datasemformatacao` VARCHAR(191) NOT NULL,
    `banco` VARCHAR(191) NOT NULL,
    `tiporenda` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestimentoFundo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iduser` VARCHAR(191) NOT NULL,
    `nomefii` VARCHAR(191) NOT NULL,
    `datacompra` DATETIME(3) NOT NULL,
    `valorpago` DECIMAL(65, 30) NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valoratualfii` DECIMAL(65, 30) NOT NULL,
    `valorgasto` DECIMAL(65, 30) NOT NULL,
    `emailuser` VARCHAR(191) NOT NULL,
    `idnomefundo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nomeacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeacao` VARCHAR(191) NOT NULL,
    `valornomeacao` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NomeFundoImobiliario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomefundo` VARCHAR(191) NOT NULL,
    `valornomefundo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patrimonio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomepatrimonio` VARCHAR(191) NOT NULL,
    `tipopatrimonio` VARCHAR(191) NOT NULL,
    `valorpatrimonio` DECIMAL(65, 30) NOT NULL,
    `dataaquisicao` DATETIME(3) NOT NULL,
    `userid` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Patrimonio_nomepatrimonio_key`(`nomepatrimonio`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datainserido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valorprovento` DECIMAL(65, 30) NOT NULL,
    `idinvestimento` VARCHAR(191) NOT NULL,
    `nomeinvestimento` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `idnomeinvestimento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoDespesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomedespesa` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,
    `valordespesa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ValorAtual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idInvestimento` VARCHAR(191) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
