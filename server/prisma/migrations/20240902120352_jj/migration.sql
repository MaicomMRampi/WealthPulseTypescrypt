-- DropIndex
DROP INDEX `NomeFundoImobiliario_nomeFundo_key` ON `nomefundoimobiliario`;

-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;
