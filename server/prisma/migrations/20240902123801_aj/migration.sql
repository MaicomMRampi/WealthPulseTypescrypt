-- DropIndex
DROP INDEX `Banco_nomeBanco_key` ON `banco`;

-- AlterTable
ALTER TABLE `usuario` ALTER COLUMN `dataExpiracao` DROP DEFAULT;
