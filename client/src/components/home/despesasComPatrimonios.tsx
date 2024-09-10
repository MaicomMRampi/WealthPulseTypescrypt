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
    valorPatrimonio: number,
    tipoPatrimonio: string,
    dataAquisicao: string,
    idUser: number
}

export default function DespesasComPatrimonios() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [patrimonios, setPatrimonios] = useState<Props[]>([]);

    const buscaPatrimonio = async () => {
        const response = await api.get(`/detalhespatrimoniohome`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setPatrimonios(response.data);
    };

    useEffect(() => {
        if (tokenUsuario?.id) {
            buscaPatrimonio();
        }
    }, [tokenUsuario]);

    const COLORS = ['#0e43fb', '#00c2ff', '#FF8042'];

    return (
        <Card className="bg-BgCardPadrao md:col-span-2 h-[400px] p-4">
            <h2 className="font-semibold text-center">Meus Patrimônios</h2>
            <div className="w-full h-full flex items-center justify-center">
                {patrimonios.length > 0 ? (
                    <ResponsiveContainer width="90%" height="100%">
                        <BarChart data={patrimonios}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="nomePatrimonio" />
                            <YAxis
                                tickFormatter={(value: number) => currency(value)}
                                width={130}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1f2127",
                                    color: "#fff",
                                }}
                                formatter={(value: number) => currency(value)}
                                cursor={false}
                            />
                            <Bar
                                barSize={20}
                                dataKey="valorPatrimonio"
                                fill={COLORS[0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>

                ) : (
                    <p className="text-center">Nenhum patrimônio encontrado</p>
                )}
            </div>
        </Card>
    );
}
