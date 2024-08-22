"use client"
import { Button, Card, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';

type Renda = {
    local: string;
    valorGasto: number;
}

export default function ultimasDespesas() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [rendaFii, setRendaFii] = useState<Renda[]>([]);



    const buscaDespesaMesAtual = async () => {
        if (!tokenUsuario) return
        const response = await api.get(`/buscadespesamesatual`, {
            params: {
                email: tokenUsuario?.id,
            },
        });
        setRendaFii(response.data);
    };
    useEffect(() => {
        buscaDespesaMesAtual();
    }, []);
    return (
        <Card fullWidth className="bg-BgCardPadrao p-4 duration-75 text-textCards">
            <h2 className='font-semibold text-center'>Ultimas Despesas inseridas </h2>
            <ul>
                {rendaFii && rendaFii.map((row, index) => (
                    index < 5 &&
                    <>
                        <div className='w-full flex justify-between pt-4'>
                            <div>
                                <p>{row.local.toUpperCase()}</p>
                            </div>
                            <div>
                                {visibility ? currency(row.valorGasto) : "****"}
                            </div>
                        </div>
                        <Divider />
                    </>
                ))}
            </ul>

        </Card>
    )
}
