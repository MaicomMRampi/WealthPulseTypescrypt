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
    Button,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import currency from '@/components/Currency';
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import formatarData from "@/components/funcoes/formataData";
import useVisibility from '@/components/hooks/useVisibility';
import { TiDocumentText } from "react-icons/ti";
import { DeleteIcon } from '@/components/iconesCompartilhados/DeleteIcon';
import TitlePage from '@/components/tituloPaginas';
import { ChevronDownIcon } from '@/components/iconesCompartilhados/ChevronDownIcon';
import statusOptions from './data'
import { capitalize } from '../listainvestimento/utils';
import ModalObservacaoTransacao from "@/components/ModalObservacaoTransacao";
import ModalDelete from '@/components/ModalDelete';
export default function Transações() {
    const [message, setMessage] = useState("");
    const [messageTipo, setMessageTipo] = useState<string>()
    const [dadosFiltrados, setDadosFiltrados] = useState<any[]>([]);
    console.log("🚀 ~ Transações ~ dadosFiltrados", dadosFiltrados)
    const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['todos']));
    const { visibility } = useVisibility();
    const { tokenUsuario } = useToken()
    const [dados, setDados] = useState<any>([])
    const [page, setPage] = useState(1);
    const [observacao, setObservacao] = useState<any>({
        open: false,
        object: null,
        openDelete: false,
        objectDelete: null

    });
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

    useEffect(() => {
        const selectedFilter = Array.from(statusFilter)[0] as string;
        if (selectedFilter === 'todos') {
            setDadosFiltrados(dados); // Exibe todos os dados se o filtro for 'todos'
        } else {
            const dadosFiltrados = dados.filter((item: any) => item.tipoInvestimento === selectedFilter);
            setDadosFiltrados(dadosFiltrados);
        }
    }, [statusFilter, dados]);

    const deleteTransacao = async () => {
        const response = await api.delete('/deletatransacao', {
            params: {
                id: observacao.objectDelete,
            }
        })
        try {

            if (response.status === 200) {
                setMessage(response.data.message);
                setMessageTipo('success');
                buscaTransacoes();
            }
            setTimeout(() => {
                setMessage('');
                setObservacao({ openDelete: false, objectDelete: null });

            }, 2000);
        } catch (error: any) {
            setMessage(error.response.data.message);
            setMessageTipo('error');
            setTimeout(() => {
                setMessage('');
                setObservacao({ openClose: false, objeto: null });
            }, 2000);
        }
    }

    return (
        <div className='w-[95%] mx-auto'>
            <TitlePage title="Transações" />
            <div className='flex justify-end'>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            endContent={<ChevronDownIcon className="text-small" />}
                            className="bg-buttonAzulClaro text-white"
                            variant="solid"
                        >
                            <p>Tipo de Investimento</p>
                        </Button>
                    </DropdownTrigger>

                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={true}
                        selectedKeys={statusFilter}
                        selectionMode="single"
                        onSelectionChange={(keys: any) => {
                            if (typeof keys === 'string') {
                                setStatusFilter(new Set([keys]));
                            } else if (keys instanceof Set) {
                                setStatusFilter(keys);
                            }
                        }}
                    >
                        {statusOptions.map((status) => (
                            <DropdownItem key={status.uid} className="capitalize">
                                {capitalize(status.name)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>

            </div>
            <Table aria-label="Tabela de Investimentos">
                <TableHeader>
                    <TableColumn>Nome investimento</TableColumn>
                    <TableColumn>Tipo Investimento</TableColumn>
                    <TableColumn>Valor Investido</TableColumn>
                    <TableColumn>Valor Resgatado</TableColumn>
                    <TableColumn>Data Fechamento</TableColumn>
                    <TableColumn>Retorno Obtido</TableColumn>
                    <TableColumn>Tipo de Fechamento</TableColumn>
                    <TableColumn>Quantidade Cotas</TableColumn>
                    <TableColumn>Data de Saque</TableColumn>
                    <TableColumn>Ações</TableColumn>
                </TableHeader>
                <TableBody>
                    {dadosFiltrados && dadosFiltrados.map((item: any) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.nomeInvestimento}</TableCell>
                            <TableCell>{item.tipoInvestimento}</TableCell>
                            <TableCell>{visibility ? currency(item.valorInvestido) : '****'}</TableCell>
                            <TableCell>{visibility ? currency(item.valorResgatado) : '****'}</TableCell>
                            <TableCell>{item.dataFechamento && AlteraVisualizacaoData(item.dataFechamento)}</TableCell>
                            <TableCell className={item.retornoObtido > 0 ? 'text-green-500' : 'text-red-500'}>{visibility ? currency(item.retornoObtido) : '****'}</TableCell>
                            <TableCell>{item.tipoFechamento}</TableCell>
                            <TableCell>{item.quantidadeCotas || "N/A"}</TableCell>
                            <TableCell>{formatarData(item.dataSaque)}</TableCell>
                            <TableCell>
                                <div className='flex flex-row gap-3'>
                                    <TiDocumentText className='cursor-pointer' onClick={() => setObservacao({ open: true, object: item })} />
                                    <DeleteIcon onClick={() => setObservacao({ openDelete: true, objectDelete: item })} className='cursor-pointer text-red-500' />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ModalObservacaoTransacao
                open={observacao.open}
                onClose={() => setObservacao({ open: false, object: null })}
                observacao={observacao.object}
            />
            {/* <Pagination
                total={totalPages}
                initialPage={1}
                onChange={(page) => setPage(page)}
            /> */}
            <ModalDelete
                isOpen={observacao.openDelete}
                onClose={() => setObservacao({ openDelete: false, objectDelete: null })}
                confirmaEsclusao={deleteTransacao}
                message={message}
                messageTipo={messageTipo}
                objeto={''}
            />
        </div>
    )
}
