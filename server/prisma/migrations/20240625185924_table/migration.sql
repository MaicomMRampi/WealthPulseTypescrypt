-- CreateTable
CREATE TABLE `Acao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeInvestimento` VARCHAR(191) NOT NULL,
    `valorInvestido` DOUBLE NOT NULL,
    `banco` VARCHAR(191) NOT NULL,
    `tipoRenda` VARCHAR(191) NOT NULL,
    `dataCompra` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `emailUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeBanco` VARCHAR(191) NOT NULL,
    `valorBanco` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Banco_nomeBanco_key`(`nomeBanco`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCategoria` VARCHAR(191) NOT NULL,
    `valorCategoria` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Categoria_nomeCategoria_key`(`nomeCategoria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ControleDeContas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `dataGasto` VARCHAR(191) NOT NULL,
    `vencimento` VARCHAR(191) NOT NULL,
    `parcelamento` INTEGER NOT NULL,
    `valorConta` DOUBLE NOT NULL,
    `formaDePagamento` VARCHAR(191) NOT NULL,
    `pago` BOOLEAN NOT NULL DEFAULT false,
    `mesAno` VARCHAR(191) NOT NULL,
    `emailUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ControleDeContas_idUser_key`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DespesaDeBens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPatrimonio` VARCHAR(191) NOT NULL,
    `observacao` VARCHAR(191) NOT NULL,
    `nomePatrimonio` VARCHAR(191) NOT NULL,
    `kmAntigo` INTEGER NOT NULL,
    `kmAtual` INTEGER NOT NULL,
    `tipoDespesa` VARCHAR(191) NOT NULL,
    `nomeDespesa` VARCHAR(191) NOT NULL,
    `tipoPatrimonio` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `dataAquisicao` VARCHAR(191) NOT NULL,
    `compradorPagador` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ControleGastos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` VARCHAR(191) NOT NULL,
    `dataGasto` VARCHAR(191) NOT NULL,
    `mesAno` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NULL,
    `formaDePagamento` VARCHAR(191) NOT NULL,
    `valorGasto` DOUBLE NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `pagante` VARCHAR(191) NOT NULL,
    `emailUser` VARCHAR(191) NOT NULL,
    `fechada` INTEGER NOT NULL DEFAULT 0,
    `observacao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dividendo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datainserido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valorDividendo` DOUBLE NOT NULL,
    `idInvestimento` VARCHAR(191) NOT NULL,
    `nomeInvestimento` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NOT NULL,
    `idNomeInvestimento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
