/*
  Warnings:

  - You are about to drop the column `dataaquisicao` on the `patrimonio` table. All the data in the column will be lost.
  - You are about to drop the column `nomepatrimonio` on the `patrimonio` table. All the data in the column will be lost.
  - You are about to drop the column `tipopatrimonio` on the `patrimonio` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `patrimonio` table. All the data in the column will be lost.
  - You are about to drop the column `valorpatrimonio` on the `patrimonio` table. All the data in the column will be lost.
  - Added the required column `dataAquisicao` to the `Patrimonio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUser` to the `Patrimonio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomePatrimonio` to the `Patrimonio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoPatrimonio` to the `Patrimonio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorPatrimonio` to the `Patrimonio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patrimonio` DROP COLUMN `dataaquisicao`,
    DROP COLUMN `nomepatrimonio`,
    DROP COLUMN `tipopatrimonio`,
    DROP COLUMN `userid`,
    DROP COLUMN `valorpatrimonio`,
    ADD COLUMN `dataAquisicao` DATETIME(3) NOT NULL,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    ADD COLUMN `nomePatrimonio` VARCHAR(191) NOT NULL,
    ADD COLUMN `tipoPatrimonio` VARCHAR(191) NOT NULL,
    ADD COLUMN `valorPatrimonio` DOUBLE NOT NULL;
