/*
  Warnings:

  - A unique constraint covering the columns `[nomefundo]` on the table `NomeFundoImobiliario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `NomeFundoImobiliario_nomefundo_key` ON `NomeFundoImobiliario`(`nomefundo`);
