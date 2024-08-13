/*
  Warnings:

  - You are about to drop the column `nomeacao` on the `nomeacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomeAcao]` on the table `Nomeacao` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nomeAcao` to the `Nomeacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Nomeacao_nomeacao_key` ON `nomeacao`;

-- AlterTable
ALTER TABLE `investimento` ADD COLUMN `valorAtualFii` DOUBLE NULL,
    ADD COLUMN `valorPago` DOUBLE NULL,
    MODIFY `dataCompra` VARCHAR(191) NOT NULL,
    MODIFY `dataVencimento` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `nomeacao` DROP COLUMN `nomeacao`,
    ADD COLUMN `nomeAcao` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Nomeacao_nomeAcao_key` ON `Nomeacao`(`nomeAcao`);
