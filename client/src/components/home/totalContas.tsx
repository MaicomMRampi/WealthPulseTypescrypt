"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { MdMoneyOff } from "react-icons/md";
import { api } from '@/lib/api';
import currency from '../Currency';
import Link from 'next/link';

type Contas = {
    valor: number;
}

export default function TotalContas() {
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken();
    const [DespesaSelect, setDespesaSelect] = useState<Contas[]>([]);
    const buscaContaMesAtual = async () => {
        if (!tokenUsuario) return
        const response = await api.get(`/buscacontamesatual`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setDespesaSelect(response.data);
    };
    useEffect(() => {
        buscaContaMesAtual();
    }, []);
    const somaValores =
        DespesaSelect &&
        DespesaSelect.reduce((acc, despesa) => acc + despesa.valor, 0);

    return (
        <Link href="/pages/contas/listaconta">
            <Card fullWidth className="bg-BgCardPadrao p-4 text-textCards">
                <CardHeader className='font-semibold'>
                    Contas no mês
                </CardHeader>
                <CardBody>
                    <p className='font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <MdMoneyOff size={40} className='text-red-500 ' /></p>
                </CardBody>
            </Card>
        </Link>
    )
}
