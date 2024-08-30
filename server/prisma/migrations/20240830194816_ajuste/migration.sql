/*
  Warnings:

  - You are about to drop the column `testeFree` on the `usuariopagamento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `statusFinanceiro` INTEGER NULL DEFAULT 1,
    ALTER COLUMN `dataExpiracao` DROP DEFAULT;

-- AlterTable
ALTER TABLE `usuariopagamento` DROP COLUMN `testeFree`,
    ADD COLUMN `status` INTEGER NULL DEFAULT 1;
