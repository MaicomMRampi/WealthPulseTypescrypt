"use client"
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { FiFileText } from "react-icons/fi"; // Ícone de ilustração
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Renda = {
    local: string;
    valorGasto: number;
    nomeCategoria: string;
    categoria: any;
}

export default function UltimasDespesas() {
    const router = useRouter();
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [rendaFii, setRendaFii] = useState<Renda[]>([]);

    const buscaDespesaMesAtual = async () => {
        if (!tokenUsuario) return;
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

    const mandaRota = () => {
        router.push('/pages/despesas/novadespesa');
    }


    const alteraOsDadosDespesas = rendaFii.sort((a: any, b: any) => b.id - a.id);



    return (
        <Link href="/pages/despesas/listadespesa">
            <Card fullWidth className="w-full h-full bg-BgCardPadrao rounded-lg shadow-md p-6 duration-75 ">
                {rendaFii.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        {/* Ícone ou ilustração */}
                        <FiFileText className="text-6xl text-gray-400" />
                        {/* Mensagem de estado vazio */}
                        <p className=' text-lg font-medium'>
                            Nenhuma despesa foi inserida ainda.
                        </p>
                        <Button color="primary" onClick={() => mandaRota()}>
                            Adicionar Despesa
                        </Button>
                    </div>
                ) : (
                    <>
                        <h2 className='font-semibold text-center text-lg mb-4'>Últimas Despesas Inseridas</h2>
                        <Table aria-label="Tabela de últimas despesas" fullWidth>
                            <TableHeader>
                                <TableColumn>Categoria</TableColumn>
                                <TableColumn>Valor Gasto</TableColumn>
                            </TableHeader>
                            <TableBody>
                                {alteraOsDadosDespesas && alteraOsDadosDespesas.slice(0, 5).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.categoria.nomeCategoria?.toUpperCase()}</TableCell>
                                        <TableCell>{visibility ? currency(row.valorGasto) : "****"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </>
                )}
            </Card>
        </Link>
    );
}
