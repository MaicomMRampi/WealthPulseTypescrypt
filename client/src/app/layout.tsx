import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Fluxo do Capital ',
    template: 'WealthPulse | %s',
  },
  description: 'Sistema de gerenciamento de finanças',
  // siteName: 'WealthPulse',
  creator: 'Maicom Mateus Rampi',
  keywords: "controle financeiro, gestão de despesas, planejamento financeiro, investimentos financeiros, finanças pessoais, contabilidade financeira, orçamento familiar, economia doméstica, educação financeira, análise de investimentos, contas a pagar, contas a receber, carteira de investimentos, dicas de economia, mercado financeiro, renda passiva, poupança e investimento, finanças online, gerenciamento de dinheiro, planejador financeiro pessoal"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
