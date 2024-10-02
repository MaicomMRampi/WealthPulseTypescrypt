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
    const [tipoInvestimento, setTipoInvestimento] = useState("");
    return (
        <div className="pt-8 flex flex-col gap-3 md:w-[60%] xs:w-full px-4 mx-auto">
            <Select
                // value={value}
                name="tipoInvestimento"
                fullWidth
                label="Selecione o Tipo de Investimento"
                onChange={(e) => setTipoInvestimento(e.target.value)}
                value={tipoInvestimento}
            >
                <SelectItem key={'acao'} value="acao">Ações</SelectItem>
                <SelectItem key={"fii"} value="fii">Fundos Imobiliários (FIIs)</SelectItem>
                <SelectItem key={"rendaFixa"} value="rendaFixa">Renda Fixa</SelectItem>
                <SelectItem key={"cripto"} value="cripto">Criptomoedas</SelectItem>
                <SelectItem key={"fundo"} value="fundo">Fundos de Investimento</SelectItem>
                <SelectItem key={"previdencia"} value="previdencia">Previdência Privada</SelectItem>
                <SelectItem key={"debentures"} value="debentures">Debêntures</SelectItem>
            </Select>
            {tipoInvestimento == 'acao' ? (
                <Acoes tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'fii' ? (
                <MeusFundosImobiliarios tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'rendaFixa' ? (
                <RendaFixa tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'cripto' ? (
                <Criptomoedas tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'fundo' ? (
                <FundosInvestimento tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'previdencia' ? (
                <PrevidenciaPrivada tipoInvestimento={tipoInvestimento} />
            ) : tipoInvestimento == 'debentures' ? (
                <Debentures tipoInvestimento={tipoInvestimento} />
            ) :


                (null)}
        </div>
    );
}
