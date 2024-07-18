/*
  Warnings:

  - You are about to drop the column `valornomeacao` on the `nomeacao` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomeacao]` on the table `Nomeacao` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `nomeacao` DROP COLUMN `valornomeacao`;

-- CreateIndex
CREATE UNIQUE INDEX `Nomeacao_nomeacao_key` ON `Nomeacao`(`nomeacao`);
