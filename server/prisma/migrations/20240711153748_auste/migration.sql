/*
  Warnings:

  - You are about to drop the column `categoria` on the `despesas` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `despesas` DROP COLUMN `categoria`,
    ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Despesas` ADD CONSTRAINT `Despesas_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
