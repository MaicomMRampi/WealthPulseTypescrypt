"use client"
import { api } from '@/lib/api';
import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Tooltip, Select, SelectItem, } from "@nextui-org/react";
import { PlusIcon } from '@/components/iconesCompartilhados/PlusIcon';
import { SearchIcon } from '@/components/iconesCompartilhados/SearchIcon';
import { EditIcon } from '@/components/iconesCompartilhados/EditIcon';
import { DeleteIcon } from '@/components/iconesCompartilhados/DeleteIcon';
import { EyeIcon } from '@/components/iconesCompartilhados/EyeIcon';
import Paper from '@mui/material/Paper';
import currency from '@/components/Currency';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import ModalObservacao from '@/components/ModalObservacaoGastos';
import ModalObservacaoInativacao from '@/components/ModalObservacaoInativacao';

import { useMemo } from 'react';
import { useCallback } from 'react';
import columns from './colunas';
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns';
import ButtonVoltar from '@/components/ButtonVoltar';
import useVisibility from '@/components/hooks/useVisibility';
import useToken from '@/components/hooks/useToken';

export default function DetalhesDosGastos({ params }) {
    const [openModalObservacao, setOpenModalObservacao] = useState(false);
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken()
    const Router = useRouter();
    const [dados, setDados] = useState([]);
    console.log("🚀 ~ DetalhesDosGastos ~ dados", dados)
    const [nome, setNome] = useState([]);
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(["nomepatrimonio", "nomedespesa", "tipopatrimonio", "valor", "dataaquisicao", "actions"]));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [observacao, setObservacao] = useState(false);
    const [filtroInativo, setFiltroInativo] = useState('todos');
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });

    const [message, setMessage] = useState("");
    const [modalInfo, setModalInfo] = useState({ show: false, objeto: null });

    const [tempoPatrimonio, setTempoPatrimonio] = useState({
        anos: 0,
        meses: 0,
        dias: 0,
    });



    const calculaTempo = (dataAquisicao: string) => {
        if (!dataAquisicao) return;

        const dataAquisicaoDate = new Date(dataAquisicao);
        const hoje = new Date();

        let anos = differenceInYears(hoje, dataAquisicaoDate);
        let meses = differenceInMonths(hoje, dataAquisicaoDate) - (anos * 12);
        let dias = differenceInDays(hoje, new Date(dataAquisicaoDate.getFullYear() + anos, dataAquisicaoDate.getMonth() + meses, dataAquisicaoDate.getDate()));

        setTempoPatrimonio({ anos, meses, dias });
    };


    const buscaPatrimonios = async () => {

        const response = await api.get('/detalhespatrimonio', {
            params,

        });
        setDados(response.data);
    };



    // const buscaPatrimonioNome = async () => {
    //     if (!email) return;
    //     const response = await api.get('/buscadespesasdetalhesnome', {
    //         params,
    //     });
    //     setNome(response.data);
    //     // Calcula o tempo quando o nome do patrimônio for carregado
    //     if (response.data.length > 0) {
    //         calculaTempo(response.data[0].dataAquisicao);
    //     }
    // };

    useEffect(() => {
        buscaPatrimonios();
    }, [email, nome, filtroInativo]);

    const somaDeDespesasPatrimonio = dados && dados.length > 0
        ? dados.reduce((acc, item) => acc + item.valor, 0)
        : 0;

    const deleteDespesa = async (idDespesa: number) => {
        const response = await api.delete('/deletedespesas', {
            params: {
                id: idDespesa,
            },
        });
        if (response.status === 200) {
            setMessage(response.data.message);
            buscaPatrimonios();
            setTimeout(() => {
                setModalInfo({ show: false, objeto: null });
                setMessage("");
            }, 2000);
        }
    };

    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);
    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...dados];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) =>
                item.nomeDespesa.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status)
            );
        }

        return filteredUsers;
    }, [dados, filterValue, statusFilter, hasSearchFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const openObservação = (cellValue) => {
        setOpenModalObservacao(!openModalObservacao);
        setObservacao(cellValue);
    };

    const confirmaInativacao = async (values) => {
        console.log("🚀 ~ confirmaInativacao ~ values", values)

        const response = await api.put('/inativarpatrimonio', {
            dados: modalInfo.objeto
        })
        buscaPatrimonios();

    }

    const renderCell = useCallback((despesa, columnKey) => {
        const mandaRota = (id) => {
            Router.push(`/gastoscompatrimonio/${id}`);
        };

        const cellValue = despesa[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip className="text-black" content='Visualizar'>
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => openObservação(despesa)} />
                            </span>
                        </Tooltip>
                        <Tooltip className="text-black" content="Editar">
                            <span onClick={() => setModalInfo({ show: true, objeto: despesa })} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-[#93fad6]" />
                            </span>
                        </Tooltip>
                        {despesa.inativo === 1 ? null :
                            <Tooltip className="text-black" color="danger" content="Deletar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon className="text-red-500" />
                                </span>
                            </Tooltip>
                        }

                    </div>
                );
            case "valorPatrimonio":
                return <p>{currency(despesa.valor)} </p>;
            case "nomePatrimonio":
                return <p>{despesa.nomepatrimonio}</p>;
            case "tempo":
                return <p>Aqui vai o tempo</p>;
            case "despesa.TipoDespesa.nomeDespesa":
                return <p>{despesa.TipoDespesa.nomeDespesa}</p>;
            case "tipopatrimonio":
                return <p>{despesa.tipopatrimonio}</p>;
            case "dataAquisicao":
                return <p>{despesa.dataAquisicao}</p>;
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const headerTable = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 border-b-2 border-gray-300 pb-4 p-4">
                <div className="flex justify-between gap-3 items-end py-4">
                    <div className='flex gap-3 w-full'>

                        <Input
                            size="md"
                            fullWidth
                            className="w-full sm:max-w-[44%]  rounded-lg bg-default-100 text-default-400"
                            placeholder="Pesquisar nome despesa..."
                            startContent={<SearchIcon />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                        <Select
                            className="bg-primaryTable max-w-[200px] text-black"
                            placeholder="Filtro Inativo"
                            size="md"
                            value={filtroInativo}
                            onChange={(e) => setFiltroInativo(e.target.value)}
                        >
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="true">Inativos</SelectItem>
                            <SelectItem value="false">Ativos</SelectItem>
                        </Select>
                    </div>
                    <div className="flex gap-3">
                        <Button fullWidth color="success" variant="solid" endContent={<PlusIcon size={20} />}>
                            <Link href="/gastosdebens/despesadebem"> Nova Despesa/investimento</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex flex-col gap-3'>
                        <span className="text-default-400 text-small font-extrabold">Total {dados.length} despesas/investimentos nesse patrimônio</span>
                        <span className="text-default-400 text-small font-extrabold ">Total de <span className='text-primaryTableText'>{currency(somaDeDespesasPatrimonio)}</span>  alocados nesse patrimômio</span>
                        <span className="text-default-400 text-small font-extrabold">
                            Total de
                            <span className='text-primaryTableText'>
                                {tempoPatrimonio.anos > 0 || tempoPatrimonio.meses > 0 || tempoPatrimonio.dias > 0
                                    ? ` ${tempoPatrimonio.anos} anos, ${tempoPatrimonio.meses} meses e ${tempoPatrimonio.dias} dias `
                                    : '0 dias '}
                                com esse patrimônio
                            </span>
                        </span>
                    </div>
                    <label className="flex items-center text-default-400 text-small">
                        Linhas por páginas
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        dados.length,
        onSearchChange,
        hasSearchFilter,
        tempoPatrimonio // Adicione tempoPatrimonio às dependências
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Todos itens selecionados"
                        : `${selectedKeys.size} of ${filteredItems.length} Selecionados`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <ButtonVoltar />
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div className="w-full px-4 py-12 ">
            <Paper elevation={16} className={`p-4 bg-primaryTable text-white`} >
                <p className="pt-2 text-center font-bold">Detalhes do Patrimômio: <span className='text-buttonAzulClaro'>{dados.length > 0 && dados && dados[0].Patrimonio.nomePatrimonio}</span></p>
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px] bg-primaryTable",
                    }}
                    // selectedKeys={selectedKeys}
                    selectionMode="none"
                    sortDescriptor={sortDescriptor}
                    topContent={headerTable}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn
                                className="text-primaryTableText font-bold "
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"Não há investimentos"} items={sortedItems}>
                        {(item) => (
                            <TableRow className={` ${item.inativo ? 'text-gray-500 ' : 'hover:text-primaryTableText'}`} key={item._id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
            <ModalObservacao
                open={openModalObservacao}
                onClose={() => setOpenModalObservacao(false)}
                observacao={observacao}
            />
            <ModalObservacaoInativacao
                open={modalInfo.show}
                onClose={() => setModalInfo({ ...modalInfo, show: false })}
                observacao={modalInfo.objeto}
                onSubmit={confirmaInativacao}
            />
        </div>
    );
}

