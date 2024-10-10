"use client"
import { api } from '@/lib/api';
import React from 'react'
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Divider, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, User, Pagination, Tooltip, Select, SelectItem, Card, Checkbox, } from "@nextui-org/react";
import { PlusIcon } from '@/components/iconesCompartilhados/PlusIcon';
import { SearchIcon } from '@/components/iconesCompartilhados/SearchIcon';
import { DeleteIcon } from '@/components/iconesCompartilhados/DeleteIcon';
import currency from '@/components/Currency';
import Link from 'next/link';
import ModalObservacao from '@/components/ModalObservacaoGastos';
import ModalObservacaoInativacao from '@/components/ModalObservacaoInativacao';
import { CheckIcon } from "./CheckIcon";
import { useMemo } from 'react';
import { useCallback } from 'react';
import columns from './colunas';
import { FaMagnifyingGlass } from "react-icons/fa6";
import ButtonVoltar from '@/components/ButtonVoltar';
import useVisibility from '@/components/hooks/useVisibility';
import useToken from '@/components/hooks/useToken';
import { PDFDownloadLink } from "@react-pdf/renderer";
import calcularTempo from '@/components/funcoes/calculaTempo';
import ModalDelete from '@/components/ModalDelete'
import { ImBlocked } from "react-icons/im";
import { MdRemoveRedEye } from 'react-icons/md';
import PdfDespesasDebens from '@/components/pdfDespesasDeBens';
import AlteraVisualizacaoData from '@/components/funcoes/alteraVisualizacaoData'
import useIdPatrimonio from "@/components/hooks/useIdPatrimonio";
import dynamic from 'next/dynamic';
interface Patrimonio {
    id: number;
    nomePatrimonio: string;
    tipoPatrimonio: string;
    valorPatrimonio: number;
    dataAquisicao: string;
}

interface TipoDespesa {
    id: number;
    nomeDespesa: string;
    idUser: number;
}

interface ModalObservacao {
    despesa: Despesa;
    valor: number;
}

interface Despesa {
    id: number;
    idPatrimonio: number;
    idUser: number;
    inativo: number;
    observacao: string;
    observacaoInativacao: string;
    responsavel: string;
    tipoDespesaId: number;
    valor: number;
    Patrimonio: Patrimonio;
    TipoDespesa: TipoDespesa;
}

interface ModalDeleteProps {
    openClose: boolean,
    objeto: any
}

export default function DetalhesDosGastos({ params }: any) {
    const { idPatrimonio } = useIdPatrimonio()
    const INITIAL_VISIBLE_COLUMNS = ["nomePatrimonio", "nomeDespesa", "tipoPatrimonio", "valor", "dataAquisicao", "actions"];
    const [openModalObservacao, setOpenModalObservacao] = useState(false);
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken()
    const [dados, setDados] = useState<Despesa[]>([]);
    const [filtroInativo, setFiltroInativo] = useState('todos');
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [observacao, setObservacao] = useState<any>();
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });


    const [message, setMessage] = useState("");
    const [modalInfo, setModalInfo] = useState<any>({ show: false, objeto: null });
    const [modalDelete, setModalDelete] = useState<ModalDeleteProps>({ openClose: false, objeto: null });

    const [tempoPatrimonio, setTempoPatrimonio] = useState({
        anos: 0,
        meses: 0,
        dias: 0,
    });

    const PDFDownloadLink = dynamic(
        () => import('@react-pdf/renderer').then((module) => module.PDFDownloadLink),
        { ssr: false }
    );


    const buscaPatrimonios = async () => {
        const response = await api.get('/detalhespatrimonio', {
            params: {
                id: idPatrimonio,
            }
        });
        setDados(response.data);
    };

    useEffect(() => {
        buscaPatrimonios();
    }, [filtroInativo]);


    const deleteDespesa = async () => {
        const response = await api.delete('/deletadespesapatrimonio', {
            params: {
                id: modalDelete.objeto.id,
            },
        });
        if (response.status === 200) {
            setMessage(response.data.message);
            buscaPatrimonios();
            setTimeout(() => {
                setModalDelete({ openClose: false, objeto: null }); // Fecha o modal e reseta o objeto
                setMessage("");
            }, 2000);
        }
    };

    const [page, setPage] = useState(1);
    const tempoComPatrimonio = calcularTempo(dados[0]?.Patrimonio?.dataAquisicao)

    const hasSearchFilter = Boolean(filterValue);
    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...dados];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item: any) =>
                item.TipoDespesa.nomeDespesa.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (filtroInativo !== 'todos') {
            const inativoStatus = filtroInativo === 'true' ? 1 : 0;

            filteredUsers = filteredUsers.filter(item => item.inativo === inativoStatus);
        }
        // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        //     filteredUsers = filteredUsers.filter((user) =>
        //         Array.from(statusFilter).includes(user.status)
        //     );
        // }

        return filteredUsers;
    }, [dados, filterValue, statusFilter, hasSearchFilter]);


    const somaDeDespesasPatrimonio = dados && dados.length > 0
        ? dados.reduce((acc, item) => acc + item.valor, 0)
        : 0;


    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    interface ModalObservacao {
        despesa: object,
        valor: number,
    }

    const openObservação = (despesa: Despesa, valor: number) => {
        setOpenModalObservacao(!openModalObservacao);
        const adicionaValorNasDespesas = {
            ...despesa,
            valorOpenModal: valor
        }
        setObservacao(adicionaValorNasDespesas);
    }

    const confirmaInativacao = async (values: any) => {
        const response = await api.put('/inativarpatrimonio', {
            observacao: values,
            dados: modalInfo.objeto.id
        })
        buscaPatrimonios();

    }

    const renderCell = useCallback((despesa: any, columnKey: any) => {
        const cellValue = despesa[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex gap-6 ">
                        {despesa.inativo === 1 ?

                            <>
                                <Tooltip className="" content='Mais detalhes'>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <MdRemoveRedEye className='text-buttonAzulClaro' onClick={() => openObservação(despesa, 0)} />
                                    </span>
                                </Tooltip>
                                <Tooltip color='warning' content='Motivo Inativação'>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <FaMagnifyingGlass onClick={() => openObservação(despesa, 1)} />
                                    </span>
                                </Tooltip>
                            </>
                            :
                            <>
                                <Tooltip className="" content='Mais detalhes'>
                                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <MdRemoveRedEye className='text-buttonAzulClaro' onClick={() => openObservação(despesa, 0)} />
                                    </span>
                                </Tooltip>
                                <Tooltip className="" content="Inativar">
                                    <span onClick={() => setModalInfo({ show: true, objeto: despesa })} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                        <ImBlocked className="text-iconeDeBloquiar" />
                                    </span>
                                </Tooltip>
                                <Tooltip className="" color="danger" content="Deletar">
                                    <span onClick={() => setModalDelete({ openClose: true, objeto: despesa })} className="text-lg text-danger cursor-pointer active:opacity-50">
                                        <DeleteIcon className="text-red-500" />
                                    </span>
                                </Tooltip>
                            </>
                        }

                    </div>
                );
            case "valor":
                return <p>{visibility ? currency(despesa.valor) : '****'} </p>;
            case "nomePatrimonio":
                return <p>{despesa.nomepatrimonio}</p>;
            case "tempo":
                return <p>{calcularTempo(despesa.dataAquisicao) || "N/A"}</p>;
            case "despesa.TipoDespesa.nomeDespesa":
                return <p>{despesa.TipoDespesa.nomeDespesa}</p>;
            case "tipopatrimonio":
                return <p>{despesa.tipopatrimonio}</p>;
            case "dataAquisicao":
                return <p>{AlteraVisualizacaoData(despesa.dataAquisicao)}</p>;
            case "inativo":
                return <p>
                    {
                        despesa.inativo === 0 ?
                            (
                                <Chip
                                    startContent={<CheckIcon size={18} />}
                                    variant="faded"
                                    color="success"
                                >
                                    Ativo
                                </Chip>
                            )
                            :
                            (
                                <Chip
                                    startContent={<CheckIcon size={18} />}
                                    variant="faded"
                                    color="danger"
                                >
                                    Inativo
                                </Chip>
                            )
                    }
                </p>

            default:
                return cellValue;
        }
    }, [visibility]);

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

    const onRowsPerPageChange = useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value: string) => {
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

    const filtroPorStatus = useCallback((status: string) => {

        const filtro = dados.filter
    }, []);





    const headerTable = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 p-4">
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
                            variant='bordered'
                        />
                        <Select
                            className="max-w-[200px] text-black"
                            size="md"
                            variant='bordered'
                            placeholder="Todos"
                            value={filtroInativo}
                            onChange={(e: any) => setFiltroInativo(e.target.value)}
                        >
                            <SelectItem key={"todos"} value="todos">Todos</SelectItem>
                            <SelectItem key={"true"} value={1}>Inativos</SelectItem>
                            <SelectItem key={"false"} value={0}>Ativos</SelectItem>
                        </Select>
                    </div>
                    <div className="flex gap-3">
                        <Button fullWidth color="success" variant="solid" endContent={<PlusIcon width={20} height={20} size={20} />}>
                            <Link href="/pages/patrimonio/novadespesapatrimonio"> Nova Despesa/investimento</Link>
                        </Button>
                    </div>
                    <PDFDownloadLink document={<PdfDespesasDebens dadosRelatorios={dados} tempoPatrimonio={tempoComPatrimonio} totalDeGastos={currency(somaDeDespesasPatrimonio)} />} fileName="Despesas Patrimônio " >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : <Button className=" bg-buttonAzulClaro text-white" variant="flat" fullWidth>Imprimir</Button>
                        }
                    </PDFDownloadLink>
                </div>
                <div className="flex justify-between items-center">
                    <div className='flex flex-col gap-3 text-default-500 text-small font-extrabold'>
                        <span >Total {dados.length} despesas/investimentos nesse patrimônio</span>
                        <span >Total de <span className='text-primaryTableText'>{visibility ? currency(somaDeDespesasPatrimonio) : '****'}
                        </span>  alocados nesse patrimômio
                        </span>
                        <span >
                            <p>
                                Tempo com o Patrimônio <span className='text-buttonAzulClaro'>
                                    {dados[0]?.Patrimonio?.nomePatrimonio}
                                </span> : {calcularTempo(dados[0]?.Patrimonio?.dataAquisicao)}
                            </p>

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
        visibility,
        tempoPatrimonio
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
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                    <ButtonVoltar
                        tamanho={false}
                        size='sm'
                    />
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div key={visibility.toString()} className="w-full px-4 py-12 ">
            {/* <p className='text-red-500'>{idPatrimonio}</p> */}
            <Card className={`p-4 bg-BgCardPadrao`} >
                <p className="pt-2 text-center font-bold">Detalhes do Patrimômio: <span className='text-buttonAzulClaro'>{dados.length > 0 && dados && dados[0].Patrimonio.nomePatrimonio}</span></p>
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px] bg-BgCardPadrao",
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
                                align={column.uid === "actions" ? "start" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"Não há investimentos"} items={sortedItems}>
                        {(item: any) => (
                            <TableRow className={` ${item.inativo ? 'text-default-500 ' : 'hover:text-primaryTableText'}`} key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
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
            <ModalDelete
                isOpen={modalDelete.openClose}
                onClose={() => setModalDelete({ ...modalDelete, openClose: false })}
                objeto={modalDelete.objeto}
                confirmaEsclusao={deleteDespesa}
                message={message}
                messageTipo={''}
            />
        </div>
    )
}

