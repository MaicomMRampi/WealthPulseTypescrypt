import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
import useVisibility from '../hooks/useVisibility';
import { GiPayMoney } from "react-icons/gi";
interface Despesa {
    valorGasto: number;
}

export default function TotalDespesas() {
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken();
    const [DespesaSelect, setDespesaSelect] = useState([]);
    const buscaDespesaMesAtual = async () => {
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
        <Card fullWidth className='bg-bgCards p-4 hover:scale-105 duration-75 text-white'>
            <CardHeader>
                Despesas Mês Atual
            </CardHeader>
            <CardBody>
                <p className='text-white font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <GiPayMoney size={40} className='text-orange-500' /></p>
            </CardBody>
        </Card>
    )
}
