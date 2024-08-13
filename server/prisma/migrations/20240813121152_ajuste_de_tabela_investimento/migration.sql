/*
  Warnings:

  - You are about to drop the column `observacao` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `parcela` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `banco` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `dataSemFormatacao` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `diasParaVencimento` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `emailUser` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `idUser` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `nomeInvestimento` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `tipoRenda` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `valorAtualinvestimento` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `vencimentoAtivo` on the `investimento` table. All the data in the column will be lost.
  - You are about to alter the column `dataCompra` on the `investimento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the `acao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investimentofundo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nome` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Investimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contas` DROP COLUMN `observacao`,
    DROP COLUMN `parcela`;

-- AlterTable
ALTER TABLE `investimento` DROP COLUMN `banco`,
    DROP COLUMN `dataSemFormatacao`,
    DROP COLUMN `diasParaVencimento`,
    DROP COLUMN `emailUser`,
    DROP COLUMN `idUser`,
    DROP COLUMN `nomeInvestimento`,
    DROP COLUMN `tipoRenda`,
    DROP COLUMN `valorAtualinvestimento`,
    DROP COLUMN `vencimentoAtivo`,
    ADD COLUMN `dataVencimento` DATETIME(3) NULL,
    ADD COLUMN `instituicao` VARCHAR(191) NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantidade` DOUBLE NULL,
    ADD COLUMN `taxaJuros` DOUBLE NULL,
    ADD COLUMN `ticker` VARCHAR(191) NULL,
    ADD COLUMN `tipo` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoFundo` VARCHAR(191) NULL,
    ADD COLUMN `tipoPlano` VARCHAR(191) NULL,
    MODIFY `dataCompra` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `acao`;

-- DropTable
DROP TABLE `investimentofundo`;
