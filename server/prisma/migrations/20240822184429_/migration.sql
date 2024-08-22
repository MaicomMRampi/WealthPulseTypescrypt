/*
  Warnings:

  - You are about to drop the column `nomefundo` on the `nomefundoimobiliario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nomeFundo]` on the table `NomeFundoImobiliario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUser` to the `NomeFundoImobiliario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeFundo` to the `NomeFundoImobiliario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `NomeFundoImobiliario_nomefundo_key` ON `nomefundoimobiliario`;

-- AlterTable
ALTER TABLE `nomefundoimobiliario` DROP COLUMN `nomefundo`,
    ADD COLUMN `idUser` INTEGER NOT NULL,
    ADD COLUMN `nomeFundo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `NomeFundoImobiliario_nomeFundo_key` ON `NomeFundoImobiliario`(`nomeFundo`);
