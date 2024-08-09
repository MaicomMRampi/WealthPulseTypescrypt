"use client";
import { api } from "@/lib/api";

async function ControleMensal(data: string, token: any | undefined) {

    const response = await api.post(`/controleorcamento`, {
        data: data,
        id: token,
    });
    console.log("🚀 ~ file: orcamentoMensalControle.tsx:ControleMensal ~ data", response.data);

    return response.data; // Retorno de exemplo
}


export default ControleMensal