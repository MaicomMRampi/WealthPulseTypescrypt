import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { TbCreditCardPay } from "react-icons/tb";
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
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
        <Card fullWidth className='bg-[#1c1d24] p-4'>
            <CardHeader>
                Contas no Mês
            </CardHeader>
            <CardBody>
                <p className='text-white font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <TbCreditCardPay /></p>
            </CardBody>
        </Card>
    )
}
