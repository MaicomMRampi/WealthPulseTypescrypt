/*
  Warnings:

  - You are about to alter the column `valorpago` on the `investimentofundo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valoratualfii` on the `investimentofundo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to alter the column `valorgasto` on the `investimentofundo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Double`.
  - You are about to drop the column `valornomefundo` on the `nomefundoimobiliario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `investimentofundo` MODIFY `valorpago` DOUBLE NOT NULL,
    MODIFY `valoratualfii` DOUBLE NOT NULL,
    MODIFY `valorgasto` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `nomefundoimobiliario` DROP COLUMN `valornomefundo`;
