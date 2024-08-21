"use client"
import React, { useEffect, useState } from 'react';
import {
    PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import { Card } from '@nextui-org/react';

export default function MeusFundosImobiliarios() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [rendaFii, setRendaFii] = useState([]);

    const filtraParaFii = (investimentos: any) => {
        const selectedFilter = 'fii';
        return investimentos.filter(investimento => investimento.tipo === selectedFilter);
    };

    const buscaContaMesAtual = async () => {
        if (!tokenUsuario) return
        const response = await api.get(`/meusinvestimentos`, {
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

    const dadosAgrupados = rendaFii.reduce((acc, item) => {
        const { nome, quantidade } = item;

        if (!acc[nome]) {
            acc[nome] = {
                nome,
                quantidade: quantidade,
            };
        } else {
            acc[nome].quantidade += quantidade;
        }

        return acc;
    }, {});

    const arrayAgrupado = Object.values(dadosAgrupados);

    const data = arrayAgrupado.map(item => ({
        name: item.nome,
        value: item.quantidade,
    }));

    const COLORS = ['#cb3cff', '#0e43fb', '#00c2ff', '#FF8042'];

    const renderCustomizedLabel = ({ name, value }: any) => `${name}`;

    return (
        <Card fullWidth className="bg-BgCardPadrao p-4 hover:scale-105 duration-75 text-textCards flex items-center">
            <h2 className='font-semibold text-center'>Meus Fundos Imobiliários</h2>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx="60%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
        </Card>
    );
}
