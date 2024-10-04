"use client"
import useToken from '@/components/hooks/useToken'
import { api } from '@/lib/api'
import React, { use, useEffect, useState } from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
} from "@nextui-org/react";
import currency from '@/components/Currency';
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import formatarData from "@/components/funcoes/formataData";
import useVisibility from '@/components/hooks/useVisibility';
import { TiDocumentText } from "react-icons/ti";
import { DeleteIcon } from '@/components/iconesCompartilhados/DeleteIcon';
export default function Transações() {
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken()
    const [dados, setDados] = useState<any>()
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(dados && dados.length / rowsPerPage || 1);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = dados && dados.slice(startIndex, endIndex);
    const buscaTransacoes = async () => {
        const response = await api.get('/transacoes', {
            params: {
                id: tokenUsuario?.id
            }
        })
        setDados(response.data)
    }
    useEffect(() => {
        buscaTransacoes()
    }, [])
    return (
        <div className='w-[95%] mx-auto'>
            <Table aria-label="Tabela de Investimentos">
                <TableHeader>
                    <TableColumn>Nom investimento</TableColumn>
                    <TableColumn>Tipo Investimento</TableColumn>
                    <TableColumn>Valor Investido</TableColumn>
                    <TableColumn>Valor Resgatado</TableColumn>
                    <TableColumn>Data Fechamento</TableColumn>
                    <TableColumn>Retorno Obtido</TableColumn>
                    <TableColumn>Tipo de Fechamento</TableColumn>
                    <TableColumn>Observação</TableColumn>
                    <TableColumn>Data de Saque</TableColumn>
                    <TableColumn>Ações</TableColumn>
                </TableHeader>
                <TableBody>
                    {dados && dados.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.nomeInvestimento}</TableCell>
                            <TableCell>{item.tipoInvestimento}</TableCell>
                            <TableCell>{visibility ? currency(item.valorInvestido) : '****'}</TableCell>
                            <TableCell>{visibility ? currency(item.valorResgatado) : '****'}</TableCell>
                            <TableCell>{item.dataFechamento && AlteraVisualizacaoData(item.dataFechamento)}</TableCell>
                            <TableCell className={item.retornoObtido > 0 ? 'text-green-500' : 'text-red-500'}>{visibility ? currency(item.retornoObtido) : '****'}</TableCell>
                            <TableCell>{item.tipoFechamento}</TableCell>
                            <TableCell>{item.observacao || "N/A"}</TableCell>
                            <TableCell>{formatarData(item.dataSaque)}</TableCell>
                            <TableCell>
                                <div className='flex flex-row gap-3'>
                                    <TiDocumentText />
                                    <DeleteIcon className='cursor-pointer text-red-500' />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Pagination
                total={totalPages}
                initialPage={1}
                onChange={(page) => setPage(page)}
            /> */}
        </div>
    )
}
