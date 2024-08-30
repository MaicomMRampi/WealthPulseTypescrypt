/*
  Warnings:

  - You are about to drop the column `dataCadastroUsuario` on the `usuariopagamento` table. All the data in the column will be lost.
  - You are about to drop the column `dataExpiracaoFree` on the `usuariopagamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `dataExpiracao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `usuariopagamento` DROP COLUMN `dataCadastroUsuario`,
    DROP COLUMN `dataExpiracaoFree`;
