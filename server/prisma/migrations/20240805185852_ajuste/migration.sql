/*
  Warnings:

  - You are about to drop the column `datavencimento` on the `contas` table. All the data in the column will be lost.
  - You are about to drop the column `qtdparcelas` on the `contas` table. All the data in the column will be lost.
  - Added the required column `dataVencimento` to the `Contas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `contas` DROP COLUMN `datavencimento`,
    DROP COLUMN `qtdparcelas`,
    ADD COLUMN `dataVencimento` VARCHAR(191) NOT NULL,
    ADD COLUMN `qtdParcelas` INTEGER NULL;
