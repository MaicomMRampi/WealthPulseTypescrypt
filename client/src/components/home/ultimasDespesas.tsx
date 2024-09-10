"use client"
import { Button, Card, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
import Link from 'next/link';

type Renda = {
    local: string;
    valorGasto: number;
    nomeCategoria: string,
    categoria: any
}

export default function UltimasDespesas() {
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
        <Link href="/pages/despesas/listadespesa">
            <Card fullWidth className="w-full h-full bg-BgCardPadrao p-4 duration-75 text-textCards">

                {rendaFii.length === 0 ? (
                    <>
                        <p className='text-center text-primaryTableHover text-xl'>Não há despesas inseridas</p>
                        <Button className="bg-primaryTableText text-white " size="sm" onClick={buscaDespesaMesAtual}>Atualizar</Button>
                    </>
                ) :
                    <>
                        <h2 className='font-semibold text-center'>Últimas Despesas Inseridas</h2>
                        <Table
                            aria-label="Tabela de últimas despesas"
                            fullWidth
                        >
                            <TableHeader>
                                <TableColumn>Categoria</TableColumn>
                                <TableColumn>Valor Gasto</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {rendaFii && rendaFii.slice(0, 5).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.categoria.nomeCategoria?.toUpperCase()}</TableCell>
                                        <TableCell>{visibility ? currency(row.valorGasto) : "****"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>

                }

            </Card>
        </Link>
    );
}
