/*
  Warnings:

  - A unique constraint covering the columns `[nomeFormaPagamento]` on the table `FormaPagamento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `FormaPagamento_nomeFormaPagamento_key` ON `FormaPagamento`(`nomeFormaPagamento`);
