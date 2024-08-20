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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const renderCustomizedLabel = ({ name, value }) => `${name}`;

    return (
        <Card className='bg-bgCards col-span-1 h-[400px] p-4 hover:scale-105 duration-75'>
            <h2 className='text-white text-center'>Meus Fundos Imobiliários</h2>
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
        </Card>
    );
}
