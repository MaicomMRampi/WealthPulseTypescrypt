"use client"
import { Button, Card, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import orcamentoMensalControle from "@/components/funcoes/orcamentoMensalControle";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import currency from '../Currency';

type Porcentagem = {
    total: number;
    porcentagem: number;
    orcamentoUsuario: number;
};

type PieData = {
    name: string;
    value: number;
};

export default function UltimasDespesas() {
    const dataAtual = new Date();
    const mesVenc = dataAtual.getMonth() + 1;
    const anoVenc = dataAtual.getFullYear();
    const dataInicioControle = `${anoVenc}-${mesVenc < 10 ? `0${mesVenc}` : mesVenc}`;

    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [orcamentoMensal, setOrcamentoMensal] = useState<Porcentagem>({
        total: 0,
        porcentagem: 0,
        orcamentoUsuario: 0,
    });

    const [dataControleMensal, setDataControleMensal] = useState<string>(dataInicioControle);

    useEffect(() => {
        const fetchOrcamento = async () => {
            try {
                const resultado = await orcamentoMensalControle(dataControleMensal, tokenUsuario?.id);
                setOrcamentoMensal(resultado);
            } catch (error) {
                console.error("Erro ao buscar o orçamento mensal:", error);
            }
        };

        fetchOrcamento();
    }, [dataControleMensal, tokenUsuario]);

    const data: PieData[] = [
        { name: 'Usado', value: orcamentoMensal.total },
        { name: 'Restante', value: orcamentoMensal.orcamentoUsuario - orcamentoMensal.total },
    ];

    const COLORS = ['#ff00007a', '#0e43fb', '#00c2ff', '#FF8042'];

    return (
        <Card fullWidth className="bg-BgCardPadrao p-4 text-textCards">
            <h2 className='font-semibold text-center'>Porcentagem gastos no mês</h2>
            <div className='w-full h-full flex flex-col items-center justify-center'>
                <PieChart width={200} height={200}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => currency(value)} // Formata o valor no tooltip
                    />
                </PieChart>

                <div className="text-center mt-4">
                    <p className="text-lg font-semibold">
                        {visibility ? `${currency(orcamentoMensal.total)} / ${currency(orcamentoMensal.orcamentoUsuario)}` : '****'}
                    </p>
                    <p className="text-sm">
                        {orcamentoMensal.porcentagem}% alcançado
                    </p>
                </div>
            </div>
        </Card>
    );
}
