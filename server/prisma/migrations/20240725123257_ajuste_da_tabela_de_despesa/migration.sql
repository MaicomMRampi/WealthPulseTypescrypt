/*
  Warnings:

  - You are about to drop the column `litros` on the `despesadebens` table. All the data in the column will be lost.
  - You are about to drop the column `nomeDespesa` on the `despesadebens` table. All the data in the column will be lost.
  - You are about to drop the column `nomePatrimonio` on the `despesadebens` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPatrimonio` on the `despesadebens` table. All the data in the column will be lost.
  - You are about to alter the column `tipoDespesa` on the `despesadebens` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `despesadebens` DROP COLUMN `litros`,
    DROP COLUMN `nomeDespesa`,
    DROP COLUMN `nomePatrimonio`,
    DROP COLUMN `tipoPatrimonio`,
    MODIFY `observacao` VARCHAR(191) NULL,
    MODIFY `kmAntigo` INTEGER NULL,
    MODIFY `kmAtual` INTEGER NULL,
    MODIFY `tipoDespesa` INTEGER NOT NULL,
    MODIFY `responsavel` VARCHAR(191) NULL,
    MODIFY `compradorPagador` VARCHAR(191) NULL;
