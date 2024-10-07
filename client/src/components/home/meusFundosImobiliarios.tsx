"use client"
import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, Legend, Tooltip
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
    quantidade: number;
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
        try {
            const response = await api.get<FiiData[]>('/meusinvestimentos', {
                params: { id: tokenUsuario?.id },
            });
            const dadosFiltrados = filtraParaFii(response.data);
            setRendaFii(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao buscar investimentos:", error);
        }
    };

    useEffect(() => {
        buscaContaMesAtual();
    }, [tokenUsuario]);

    const dadosAgrupados = rendaFii.reduce((acc: Record<string, FiiData>, item: FiiData) => {
        const { nome, quantidade } = item;

        if (!acc[nome]) {
            acc[nome] = { nome, quantidade, tipo: item.tipo };
        } else {
            acc[nome].quantidade += quantidade;
        }

        return acc;
    }, {});

    const arrayAgrupado: AgrupadoData[] = Object.values(dadosAgrupados).map(item => ({
        name: item.nome.length > 0 ? item.nome : 'Nenhum Fundo Cadastrado',
        quantidade: item.quantidade > 0 ? item.quantidade : 0,
    }));

    const dadosParaExibir = arrayAgrupado.length > 0 ? arrayAgrupado : [{ name: 'Sem dados', quantidade: 1 }];

    const COLORS = ['#cb3cff', '#0e43fb', '#00c2ff', '#FF8042'];

    const renderCustomizedLabel = ({ name }: AgrupadoData) => `${name}`;

    return (
        <Link href='/pages/investimentos/listainvestimento'>
            <Card fullWidth className="bg-BgCardPadrao p-4 text-textCards cursor-pointer">
                <h2 className='font-semibold text-center '>Meus Fundos Imobiliários</h2>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <PieChart width={400} height={400}>

                        <Pie
                            data={dadosParaExibir}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="quantidade"
                        >
                            {dadosParaExibir.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                    </PieChart>
                </div>
            </Card>
        </Link>
    );
}
