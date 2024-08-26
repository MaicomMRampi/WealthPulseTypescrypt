"use client";
import { Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import useVisibility from "../hooks/useVisibility";
import useToken from "../hooks/useToken";
import { api } from "@/lib/api";
import currency from "../Currency";

type Props = {
    nomePatrimonio: string,
    idPatrimonio: string,
    valorTotal: number,
    valor: number,
    Patrimonio: {
        idPatrimonio: number,
        nomePatrimonio: string,
        valorPatrimonio: number,
        valorTotal: number
    }
}

export default function DespesasComPatrimonios() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [despesas, setDespesas] = useState<Props[]>([]);

    const buscaContaMesAtual = async () => {
        const response = await api.get(`/detalhespatrimoniohome`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setDespesas(response.data);
    };

    useEffect(() => {
        if (tokenUsuario?.id) {
            buscaContaMesAtual();
        }
    }, [tokenUsuario]);

    // Agrupar e somar as despesas por patrimônio
    const despesasAgrupadas = despesas.reduce<{ idPatrimonio: string; nomePatrimonio: string; valorTotal: number; }[]>((acc, despesa) => {
        const { idPatrimonio, valor, Patrimonio } = despesa;
        const patrimonioExistente = acc.find(item => item.idPatrimonio === idPatrimonio);

        if (patrimonioExistente) {
            patrimonioExistente.valorTotal += valor;
        } else {
            acc.push({
                idPatrimonio,
                nomePatrimonio: Patrimonio.nomePatrimonio,
                valorTotal: valor,
            });
        }

        return acc;
    }, []);

    return (
        <Card className="bg-BgCardPadrao md:col-span-2 h-[400px] p-4">
            <h2 className="font-semibold text-center">Patrimônios e suas Despesas</h2>
            <div className="w-full h-full flex items-center justify-center">
                <ResponsiveContainer width="90%" height="100%">
                    <BarChart data={despesasAgrupadas}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nomePatrimonio" />
                        <YAxis
                            tickFormatter={(value: number) => currency(value)}
                            width={130} // Ajuste a largura para garantir que os rótulos não sejam cortados
                        />
                        <Tooltip
                            formatter={(value: number) => currency(value)}
                            cursor={false}
                        />
                        <Bar barSize={20} dataKey="valorTotal" fill="#0e43fb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
