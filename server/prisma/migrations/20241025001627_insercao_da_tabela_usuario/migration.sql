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

-- AddForeignKey
ALTER TABLE `UsuarioPagamento` ADD CONSTRAINT `UsuarioPagamento_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
