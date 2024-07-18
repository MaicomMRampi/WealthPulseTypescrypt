/*
  Warnings:

  - You are about to drop the column `valorFormaPagamento` on the `formapagamento` table. All the data in the column will be lost.
  - You are about to drop the `controlegastos` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `formapagamento` DROP COLUMN `valorFormaPagamento`;

-- DropTable
DROP TABLE `controlegastos`;

-- CreateTable
CREATE TABLE `Despesas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` VARCHAR(191) NOT NULL,
    `dataGasto` VARCHAR(191) NOT NULL,
    `mesAno` VARCHAR(191) NOT NULL,
    `local` VARCHAR(191) NULL,
    `formaDePagamento` VARCHAR(191) NOT NULL,
    `valorGasto` DOUBLE NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `pagante` VARCHAR(191) NOT NULL,
    `emailUser` VARCHAR(191) NOT NULL,
    `fechada` INTEGER NOT NULL DEFAULT 0,
    `observacao` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
