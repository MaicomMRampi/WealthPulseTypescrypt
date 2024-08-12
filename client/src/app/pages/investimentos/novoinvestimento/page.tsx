"use client"
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import Acoes from "@/components/investimentosComponent/acoes/Acoes";
import MeusFundosImobiliarios from "@/components/investimentosComponent/fundosImobiliarios/FundosImobiliarios";
import RendaFixa from "@/components/investimentosComponent/rendaFixa/RendaFixa";
import Criptomoedas from "@/components/investimentosComponent/criptomoedas/Criptomoedas";
import FundosInvestimento from "@/components/investimentosComponent/fundosDeInvestimento/FundosDeInvestimento";
import PrevidenciaPrivada from "@/components/investimentosComponent/previdenciaPrivada/PrevidenciaPrivada";
import Debentures from "@/components/investimentosComponent/debentures/Debentures";

export default function App() {
    const [tipoInvestimento, setTipoInvestimento] = useState("acao");
    return (
        <div className="flex w-[50%] mx-auto flex-col items-center gap-4 pt-8">

            <Select
                // value={value}
                name="tipoInvestimento"
                fullWidth
                label="Selecione o Tipo de Investimento"
                onChange={(e) => setTipoInvestimento(e.target.value)}
            >
                <SelectItem key={1} value="acao">Ações</SelectItem>
                <SelectItem key={2} value="fii">Fundos Imobiliários (FIIs)</SelectItem>
                <SelectItem key={3} value="rendaFixa">Renda Fixa</SelectItem>
                <SelectItem key={4} value="cripto">Criptomoedas</SelectItem>
                <SelectItem key={5} value="fundo">Fundos de Investimento</SelectItem>
                <SelectItem key={6} value="previdencia">Previdência Privada</SelectItem>
                <SelectItem key={7} value="debentures">Debêntures</SelectItem>
            </Select>

            {tipoInvestimento == '1' ? (
                <Acoes />
            ) : tipoInvestimento == '2' ? (
                <MeusFundosImobiliarios />
            ) : tipoInvestimento == '3' ? (
                <RendaFixa />
            ) : tipoInvestimento == '4' ? (
                <Criptomoedas />
            ) : tipoInvestimento == '5' ? (
                <FundosInvestimento />
            ) : tipoInvestimento == '6' ? (
                <PrevidenciaPrivada />
            ) : tipoInvestimento == '7' ? (
                <Debentures />
            ) :


                (null)}
        </div>
    );
}
