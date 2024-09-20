"use client";
import { Button, Card } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import useVisibility from "../hooks/useVisibility";
import useToken from "../hooks/useToken";
import { api } from "@/lib/api";
import currency from "../Currency";
import { FiPackage } from "react-icons/fi"; // Ícone para estado vazio
import { Router } from "next/router";
import { useRouter } from "next/navigation";

type Props = {
    nomePatrimonio: string;
    idPatrimonio: string;
    valorPatrimonio: number;
    tipoPatrimonio: string;
    dataAquisicao: string;
    idUser: number;
};

export default function DespesasComPatrimonios() {
    const router = useRouter()
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

    const COLORS = ["#0e43fb", "#00c2ff", "#FF8042"];

    const mandaRota = () => {
        router.push('/pages/patrimonio/cadastropatrimonio');
    }

    return (
        <Card className="bg-BgCardPadrao shadow-lg rounded-lg p-6 h-[400px] flex flex-col justify-between transition-all duration-300 md:col-span-2">
            <h2 className="font-bold text-center text-lg  mb-4">
                Meus Patrimônios
            </h2>
            <div className="w-full h-full flex items-center justify-center">
                {patrimonios.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={patrimonios} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
                            <XAxis dataKey="nomePatrimonio" tick={{ fill: '#6b7280' }} />
                            <YAxis
                                tickFormatter={(value: number) => currency(value)}
                                width={100}
                                tick={{ fill: '#6b7280' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#1f2937", // Fundo escuro
                                    borderRadius: "8px",
                                    border: "none",
                                    color: "#fff",
                                }}
                                formatter={(value: number) => currency(value)}
                                cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }} // Cursor sutil ao passar o mouse
                            />
                            <Bar
                                barSize={40}
                                dataKey="valorPatrimonio"
                                fill={COLORS[0]}
                                animationBegin={0}
                                animationDuration={1500}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="text-center flex flex-col items-center justify-center space-y-4">
                        <FiPackage className="text-6xl text-gray-400" />
                        <p className="text-gray-500 text-lg font-medium">
                            Nenhum patrimônio inserido
                        </p>
                        <Button color="primary" onClick={() => mandaRota()}>
                            Adicionar Patrimônio
                        </Button>
                    </div>
                )}
            </div>
        </Card>
    );
}
