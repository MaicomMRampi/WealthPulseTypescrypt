"use client"
import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import { Card } from '@nextui-org/react';
import Link from 'next/link';

type FiiData = {
    nome: string;
    quantidade: number;
    tipo: string;
};

type AgrupadoData = {
    name: string;
    value: number;
};

export default function MeusFundosImobiliarios() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [rendaFii, setRendaFii] = useState<FiiData[]>([]);

    const filtraParaFii = (investimentos: FiiData[]): FiiData[] => {
        const selectedFilter = 'fii';
        return investimentos.filter(investimento => investimento.tipo === selectedFilter);
    };

    const buscaContaMesAtual = async () => {
        if (!tokenUsuario) return;
        const response = await api.get<FiiData[]>(`/meusinvestimentos`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        const dadosFiltrados = filtraParaFii(response.data);
        setRendaFii(dadosFiltrados);
    };

    useEffect(() => {
        buscaContaMesAtual();
    }, []);

    const dadosAgrupados = rendaFii.reduce((acc: Record<string, FiiData>, item: FiiData) => {
        const { nome, quantidade } = item;

        if (!acc[nome]) {
            acc[nome] = {
                nome,
                quantidade: quantidade,
                tipo: item.tipo,
            };
        } else {
            acc[nome].quantidade += quantidade;
        }

        return acc;
    }, {});

    const arrayAgrupado: AgrupadoData[] = Object.values(dadosAgrupados).map(item => ({
        name: item.nome,
        value: item.quantidade,
    }));

    const COLORS = ['#cb3cff', '#0e43fb', '#00c2ff', '#FF8042'];

    const renderCustomizedLabel = ({ name }: AgrupadoData) => `${name}`;

    return (
        <Link href='/pages/investimentos/listainvestimento'>
            <Card fullWidth className="bg-BgCardPadrao p-4 text-textCards flex items-center">
                <h2 className='font-semibold text-center'>Meus Fundos Imobiliários</h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={arrayAgrupado}
                        cx="60%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {arrayAgrupado.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </Card>
        </Link>
    );
}
