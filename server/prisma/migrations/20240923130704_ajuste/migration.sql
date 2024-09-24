-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `datacadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valorOrcamentoMensal` DOUBLE NULL,
    `imageUrl` VARCHAR(191) NULL,
    `openModal` INTEGER NULL,
    `dataExpiracao` DATETIME(3) NOT NULL,
    `statusFinanceiro` INTEGER NULL DEFAULT 1,

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuarioPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `valorPago` DOUBLE NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL DEFAULT 'pix',
    `dataPagamento` DATETIME(3) NULL,
    `dataExpiracao` DATETIME(3) NOT NULL,
    `status` INTEGER NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Banco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeBanco` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeCategoria` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `estabelecimento` VARCHAR(191) NOT NULL,
    `comprador` VARCHAR(191) NOT NULL,
    `pagador` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `dataVencimento` VARCHAR(191) NOT NULL,
    `qtdParcelas` INTEGER NULL,
    `pago` INTEGER NULL DEFAULT 0,
    `mesCorrespondente` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DespesaDeBens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idPatrimonio` INTEGER NOT NULL,
    `observacao` VARCHAR(191) NULL,
    `kmAntigo` INTEGER NULL,
    `kmAtual` INTEGER NULL,
    `valor` DOUBLE NOT NULL,
    `responsavel` VARCHAR(191) NULL,
    `dataAquisicao` VARCHAR(191) NOT NULL,
    `compradorPagador` VARCHAR(191) NULL,
    `idUser` INTEGER NOT NULL,
    `observacaoInativacao` VARCHAR(191) NULL,
    `inativo` INTEGER NOT NULL DEFAULT 0,
    `tipoDespesaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Despesas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `dataGasto` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `local` VARCHAR(191) NULL,
    `formaDePagamentoId` INTEGER NOT NULL,
    `valorGasto` DOUBLE NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `categoriaId` INTEGER NOT NULL,
    `pagante` VARCHAR(191) NOT NULL,
    `fechada` INTEGER NOT NULL DEFAULT 0,
    `observacao` VARCHAR(191) NULL,
    `mesCorrespondente` VARCHAR(191) NOT NULL,
    `dataAquisicao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dividendo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datainserido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valorDividendo` DOUBLE NOT NULL,
    `idInvestimento` INTEGER NOT NULL,
    `nomeInvestimento` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,
    `idNomeInvestimento` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormaPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFormaPagamento` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    UNIQUE INDEX `FormaPagamento_nomeFormaPagamento_key`(`nomeFormaPagamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nomeacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeAcao` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    UNIQUE INDEX `Nomeacao_nomeAcao_key`(`nomeAcao`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NomeFundoImobiliario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeFundo` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Investimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `quantidade` DOUBLE NULL,
    `valorPago` DOUBLE NULL,
    `tipoTitulo` VARCHAR(191) NULL,
    `valorInvestido` DOUBLE NOT NULL,
    `taxaJuros` DOUBLE NULL,
    `dataCompra` VARCHAR(191) NOT NULL,
    `valorAtualFii` DOUBLE NULL,
    `dataVencimento` VARCHAR(191) NULL,
    `ticker` VARCHAR(191) NULL,
    `instituicao` VARCHAR(191) NULL,
    `tipoPlano` VARCHAR(191) NULL,
    `tipoFundo` VARCHAR(191) NULL,
    `previsaoDeGanho` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GanhosInvestimentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeInvestimento` VARCHAR(191) NULL,
    `dataDoRendimento` VARCHAR(191) NULL,
    `valor` DOUBLE NULL,
    `idUser` INTEGER NULL,
    `tipoDeInvestimento` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Patrimonio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomePatrimonio` VARCHAR(191) NOT NULL,
    `tipoPatrimonio` VARCHAR(191) NOT NULL,
    `valorPatrimonio` DOUBLE NOT NULL,
    `dataAquisicao` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `datainserido` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `valorprovento` DOUBLE NOT NULL,
    `idinvestimento` INTEGER NOT NULL,
    `nomeinvestimento` VARCHAR(191) NOT NULL,
    `iduser` INTEGER NOT NULL,
    `idnomeinvestimento` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoDespesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeDespesa` VARCHAR(191) NOT NULL,
    `idUser` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ValorAtual` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idInvestimento` INTEGER NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioPagamento` ADD CONSTRAINT `UsuarioPagamento_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DespesaDeBens` ADD CONSTRAINT `DespesaDeBens_tipoDespesaId_fkey` FOREIGN KEY (`tipoDespesaId`) REFERENCES `TipoDespesa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DespesaDeBens` ADD CONSTRAINT `DespesaDeBens_idPatrimonio_fkey` FOREIGN KEY (`idPatrimonio`) REFERENCES `Patrimonio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesas` ADD CONSTRAINT `Despesas_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesas` ADD CONSTRAINT `Despesas_formaDePagamentoId_fkey` FOREIGN KEY (`formaDePagamentoId`) REFERENCES `FormaPagamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
