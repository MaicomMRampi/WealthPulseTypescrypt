-- AddForeignKey
ALTER TABLE `DespesaDeBens` ADD CONSTRAINT `DespesaDeBens_idPatrimonio_fkey` FOREIGN KEY (`idPatrimonio`) REFERENCES `Patrimonio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
