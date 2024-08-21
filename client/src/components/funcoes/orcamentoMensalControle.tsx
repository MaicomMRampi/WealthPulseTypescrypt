"use client";
import { api } from "@/lib/api";
async function ControleMensal(data: string, token: any | undefined) {
    const response = await api.post(`/controleorcamento`, {
        data: data,
        id: token,
    });


    return response.data; // Retorno de exemplo
}


export default ControleMensal