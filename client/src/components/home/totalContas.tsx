import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { MdMoneyOff } from "react-icons/md";
import { api } from '@/lib/api';
import currency from '../Currency';
export default function TotalContas() {
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken();
    const [DespesaSelect, setDespesaSelect] = useState([]);
    const buscaContaMesAtual = async () => {
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
        <Card fullWidth className='bg-bgCards p-4 hover:scale-105 duration-75 text-white'>
            <CardHeader>
                Contas no Mês
            </CardHeader>
            <CardBody>
                <p className='text-white font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <MdMoneyOff size={40} className='text-red-500 ' /></p>
            </CardBody>
        </Card>
    )
}
