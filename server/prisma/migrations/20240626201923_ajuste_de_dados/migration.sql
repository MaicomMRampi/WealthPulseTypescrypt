/*
  Warnings:

  - You are about to alter the column `valorInvestido` on the `acao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `idUser` on the `acao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `valorCategoria` on the `categoria` table. All the data in the column will be lost.
  - You are about to alter the column `idUser` on the `controledecontas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `iduser` on the `nomeacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `valorpatrimonio` on the `patrimonio` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `userid` on the `patrimonio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `valordespesa` on the `tipodespesa` table. All the data in the column will be lost.
  - You are about to alter the column `iduser` on the `tipodespesa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `ControleDeContas_idUser_key` ON `controledecontas`;

-- DropIndex
DROP INDEX `Patrimonio_nomepatrimonio_key` ON `patrimonio`;

-- AlterTable
ALTER TABLE `acao` MODIFY `valorInvestido` DOUBLE NOT NULL,
    MODIFY `idUser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `categoria` DROP COLUMN `valorCategoria`;

-- AlterTable
ALTER TABLE `controledecontas` MODIFY `idUser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `nomeacao` MODIFY `iduser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `patrimonio` MODIFY `valorpatrimonio` DOUBLE NOT NULL,
    MODIFY `userid` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tipodespesa` DROP COLUMN `valordespesa`,
    MODIFY `iduser` INTEGER NOT NULL;
