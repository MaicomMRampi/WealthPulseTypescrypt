/*
  Warnings:

  - You are about to drop the column `dataExpiracaoAcesso` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `dataProximoPagamento` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `statusPagamento` on the `usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `dataExpiracaoAcesso`,
    DROP COLUMN `dataProximoPagamento`,
    DROP COLUMN `statusPagamento`;

-- CreateTable
CREATE TABLE `UsuarioPagamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `valorPago` DOUBLE NOT NULL,
    `metodoPagamento` VARCHAR(191) NOT NULL DEFAULT 'pix',
    `dataCadastroUsuario` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataPagamento` DATETIME(3) NULL,
    `dataExpiracao` DATETIME(3) NOT NULL,
    `testeFree` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UsuarioPagamento` ADD CONSTRAINT `UsuarioPagamento_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
