"use client"
import { Button, Card, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
export default function ultimasDespesas() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [rendaFii, setRendaFii] = useState([]);



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
        <Card fullWidth className="bg-BgCardPadrao p-4 hover:scale-105 duration-75 text-textCards">
            <h2 className='font-semibold'>Maiores Despesas Mês Atual</h2>
            <ul>
                {rendaFii && rendaFii.map((row) => (
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
