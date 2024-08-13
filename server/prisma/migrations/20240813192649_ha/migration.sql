/*
  Warnings:

  - You are about to drop the column `iduser` on the `nomeacao` table. All the data in the column will be lost.
  - Added the required column `idUser` to the `Nomeacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nomeacao` DROP COLUMN `iduser`,
    ADD COLUMN `idUser` INTEGER NOT NULL;
