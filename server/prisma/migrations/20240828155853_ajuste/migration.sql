/*
  Warnings:

  - Added the required column `statusPagamento` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `dataExpiracaoAcesso` DATETIME(3) NULL,
    ADD COLUMN `dataProximoPagamento` DATETIME(3) NULL,
    ADD COLUMN `statusPagamento` INTEGER NOT NULL;
