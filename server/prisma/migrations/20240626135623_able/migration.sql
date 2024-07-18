/*
  Warnings:

  - You are about to drop the column `datacompra` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `datasemformatacao` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `emailuser` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `iduser` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `nomeinvestimento` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `tiporenda` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `valoratualinvestimento` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `valorinvestido` on the `investimento` table. All the data in the column will be lost.
  - You are about to drop the column `vencimentoativo` on the `investimento` table. All the data in the column will be lost.
  - Added the required column `dataCompra` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dataSemFormatacao` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailUser` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeInvestimento` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoRenda` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorAtualinvestimento` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorInvestido` to the `Investimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vencimentoAtivo` to the `Investimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investimento` DROP COLUMN `datacompra`,
    DROP COLUMN `datasemformatacao`,
    DROP COLUMN `emailuser`,
    DROP COLUMN `iduser`,
    DROP COLUMN `nomeinvestimento`,
    DROP COLUMN `tiporenda`,
    DROP COLUMN `valoratualinvestimento`,
    DROP COLUMN `valorinvestido`,
    DROP COLUMN `vencimentoativo`,
    ADD COLUMN `dataCompra` DATETIME(3) NOT NULL,
    ADD COLUMN `dataSemFormatacao` VARCHAR(191) NOT NULL,
    ADD COLUMN `emailUser` VARCHAR(191) NOT NULL,
    ADD COLUMN `idUser` VARCHAR(191) NOT NULL,
    ADD COLUMN `nomeInvestimento` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoRenda` VARCHAR(191) NOT NULL,
    ADD COLUMN `valorAtualinvestimento` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `valorInvestido` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `vencimentoAtivo` DATETIME(3) NOT NULL;
