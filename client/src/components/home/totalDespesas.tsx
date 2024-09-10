"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
import useVisibility from '../hooks/useVisibility';
import { GiPayMoney } from "react-icons/gi";
import Link from 'next/link';
interface Despesa {
    valorGasto: number;
}

export default function TotalDespesas() {
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken();
    const [DespesaSelect, setDespesaSelect] = useState<Despesa[]>([]);
    const buscaDespesaMesAtual = async () => {
        if (!tokenUsuario) return
        const response = await api.get(`/buscadespesamesatual`, {
            params: {
                email: tokenUsuario?.id,
            },
        });
        setDespesaSelect(response.data);
    };
    useEffect(() => {
        buscaDespesaMesAtual();
    }, []);

    const somaValores =
        DespesaSelect &&
        DespesaSelect.reduce((acc, despesa) => acc + despesa.valorGasto, 0);


    return (
        <Card fullWidth className="bg-BgCardPadrao p-4 text-textCards w-full">
            <Link href="/pages/despesas/listadespesas">
                <CardHeader className='font-semibold'>
                    Despesas mês atual
                </CardHeader>
                <CardBody>
                    <p className='font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <GiPayMoney size={40} className='text-orange-500' /></p>
                </CardBody>
            </Link>
        </Card>
    )
}
