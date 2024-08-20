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
        <Card className='bg-bgCards col-span-1 h-[400px] p-4 hover:scale-105 duration-75'>
            <h2 className='text-white text-center'>Maiores Despesas Mês Atual</h2>
            <ul>
                {rendaFii && rendaFii.map((row) => (
                    <>
                        <div className='w-full text-white flex justify-between pt-4'>
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
