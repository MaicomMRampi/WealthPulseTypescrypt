"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import useVisibility from '../hooks/useVisibility';
import useToken from '../hooks/useToken';
import { api } from '@/lib/api';
import currency from '../Currency';
import AlteraVisualizacaoData from '../funcoes/alteraVisualizacaoData';
import Link from 'next/link';


type Despesa = {
    dataVencimento: string;
    valor: number;
    estabelecimento: string;
    mesCorrespondente: string;
    nome: string;
}


export default function TotalContas() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken();
    const [despesas, setDespesas] = useState<Despesa[]>([]);

    const buscaContaMesAtual = async () => {

        const response = await api.get(`/buscacontaproximavencer`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setDespesas(response.data);
    };

    useEffect(() => {
        buscaContaMesAtual();
    }, [tokenUsuario]);

    return (
        <Link href="/pages/contas/listaconta">
            <Card fullWidth className="bg-BgCardPadrao w-full h-full p-4 text-textCards flex items-center">
                <h2 className='font-semibold text-center'>Contas a vencer</h2>
                <CardBody>
                    {despesas.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {despesas.map((despesa, index) => (
                                <Card key={index} className="w-full">
                                    <CardBody className="space-y-2">
                                        <h3 className="text-lg font-bold">{despesa.estabelecimento}</h3>
                                        <p className="text-base text-green-400">{visibility && despesa.valor ? currency(despesa.valor) : '****'}</p>
                                        <p className="text-sm text-gray-300">{AlteraVisualizacaoData(despesa.dataVencimento)}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-center font-semibold">Nenhuma conta a vencer dentro de 10 dias</p>
                    )}
                </CardBody>
            </Card>
        </Link>
    );
}
