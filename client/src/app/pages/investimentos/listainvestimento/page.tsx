"use client"
import React, { useEffect, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    Card
} from "@nextui-org/react";
import TitlePage from "@/components/tituloPaginas";
import { PlusIcon } from "@/components/iconesCompartilhados/PlusIcon";
import { VerticalDotsIcon } from "@/components/iconesCompartilhados/VerticalDotsIcon";
import { ChevronDownIcon } from "@/components/iconesCompartilhados/ChevronDownIcon";
import { SearchIcon } from "@/components/iconesCompartilhados/SearchIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import { api } from "@/lib/api";
import useToken from "@/components/hooks/useToken";
import Link from "next/link";
import currency from "@/components/Currency";
import useVisibility from "@/components/hooks/useVisibility";
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import ModalDetalhesFii from "@/components/ModalDetalhesFii";
import ModalJuros from "@/components/ModalJuros";
import { DeleteIcon } from "@/components/iconesCompartilhados/DeleteIcon";
import ModalDelete from "@/components/ModalDelete";
import ModalSacar from "@/components/ModalSacar";
import ModalvendaFii from "@/components/ModalVendaFii";
import { MdDeleteForever } from "react-icons/md";
import { FaArrowTrendDown } from "react-icons/fa6";
type Dados = {
    tipo: string
}
type Column = {
    name: string;
    uid: string;
    sortable?: boolean; // Aqui, a propriedade sortable é opcional
};

type ModalDelete = {
    openClose: any
    objeto: any
}



export default function App() {
    const [modalSacar, setModalSacar] = useState<any>({
        open: false,
        objeto: null,
        openVenda: false,
        objetoVenda: null

    })
    console.log("🚀 ~ App ~ modalSacar", modalSacar)
    const [total, setTotal] = useState(0)
    const [juros, setJuros] = useState<any>()
    const [modalDelete, setModalDelete] = useState<ModalDelete>({ openClose: false, objeto: null });
    const [dadosFiltro, setDadosFiltro] = useState<any>([])
    const [dados, setDados] = useState<any>([])
    const [modalDetalhes, setModalDetalhes] = useState(false)
    const [modalJuros, setModalJuros] = useState(false)
    const INITIAL_VISIBLE_COLUMNS = ["nome", "dataCompra", "instituicao", "valorInvestido", "actions"];
    const { tokenUsuario } = useToken()
    const [nomePagina, setNomePagina] = useState("Minhas Rendas Fixas");
    const [filterValue, setFilterValue] = useState<any>();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['todos']));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<any>({

        column: "age",
        direction: "ascending",
    });
    const [message, setMessage] = useState("");
    const [messageTipo, setMessageTipo] = useState<string>()
    const { visibility } = useVisibility()

    useEffect(() => {
        const selectedFilter = Array.from(statusFilter)[0] as string;
        switch (selectedFilter) {
            case "todos":
                setNomePagina("Todos")
                break;
            case "acao":
                setNomePagina("Minhas Ações")
                break;
            case "fii":
                setNomePagina("Meus Fundos Imobiliários (FIIs)")
                break;
            case "rendaFixa":
                setNomePagina("Minhas Rendas Fixas")
                break;
            case "cripto":
                setNomePagina("Minhas Criptomoedas")
                break;
            case "fundo":
                setNomePagina("Meus Fundos de Investimento")
                break;
            case "previdencia":
                setNomePagina("Previdência Privada")
                break;
            case "debentures":
                setNomePagina("Meus Debêntures")
                break;
            default:
                setNomePagina("Minhas Rendas Fixas")
        }
    }, [statusFilter])
    const buscaInvestimentos = async () => {
        if (!tokenUsuario) return
        const response = await api.get('/meusinvestimentos', {
            params: {
                id: tokenUsuario?.id
            }
        })
        setDados(response.data)
    }
    const buscaLucratividade = async () => {
        const response = await api.get('/lucratividade', {
            params: {
                id: tokenUsuario?.id
            }
        })
        setJuros(response.data)
    }

    useEffect(() => {
        buscaLucratividade()
        buscaInvestimentos()
    }, [statusFilter])

    const [page, setPage] = React.useState(1);


    const deletaInvestimento = async () => {

        try {
            const response = await api.delete('/deletainvestimento', {
                params: {
                    id: modalDelete.objeto,
                },
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                setMessageTipo('success');
                buscaLucratividade();
                buscaInvestimentos()
            }
            setTimeout(() => {
                setMessage('');
                setModalDelete({ openClose: false, objeto: null });

            }, 2000);
        } catch (error: any) {
            setMessage(error.response.data.message);
            setMessageTipo('error');
            setTimeout(() => {
                setMessage('');
                setModalDelete({ openClose: false, objeto: null });
            }, 2000);
        }

    }
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const selectedFilter = Array.from(statusFilter)[0] as string;

    // Novo useEffect para atualizar os juros
    useEffect(() => {
        const selectedFilter = Array.from(statusFilter)[0] as string;
        if (selectedFilter !== 'todos') {
            // Filtra os juros com base no tipo de investimento selecionado
            const jurosFiltrados = juros.filter((item: any) => item.tipoDeInvestimento === selectedFilter);
            setJuros(jurosFiltrados);
        } else {
            setJuros([]);
            buscaLucratividade();  // Recarrega todos os juros
        }
    }, [statusFilter, dados]); // Observa mudanças em statusFilter e dados



    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...dados];
        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((investimento: any) =>
                investimento.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (statusFilter) {

            if (selectedFilter != "todos") {
                filteredUsers = filteredUsers.filter((investimento) =>
                    investimento.tipo === selectedFilter
                )

            } else {
                filteredUsers = filteredUsers.filter((investimento) =>
                    investimento.tipo != selectedFilter
                )

            }

        }
        setDadosFiltro(filteredUsers)
        const somaValores =
            filteredUsers &&
            filteredUsers.reduce((acc, despesa) => acc + despesa.valorInvestido, 0);
        setTotal(somaValores)

        return filteredUsers;
    }, [dados, filterValue, statusFilter, selectedFilter]);




    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
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
    const renderCell = React.useCallback((investimento: any, columnKey: any) => {
        const cellValue = investimento[columnKey];

        switch (columnKey) {
            case "nome":
                return (
                    <p>{investimento.nome}</p>
                );
            case "dataCompra":
                return (
                    <p>{AlteraVisualizacaoData(investimento.dataCompra)}</p>
                );
            case "dataVencimento":
                return (
                    <p>{investimento.dataVencimento ? AlteraVisualizacaoData(investimento.dataVencimento) : null}</p>
                );
            case "valorInvestido":
                return (
                    <p>{visibility ? currency(investimento.valorInvestido) : '****'}</p>
                );
            case "valorPago":
                return (
                    <p>{visibility ? currency(investimento.valorPago) : '****'}</p>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <VerticalDotsIcon width={18} height={18} size={18} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => setModalDelete({ openClose: true, objeto: investimento.id })}><span className="flex gap-2 text-red-500 items-center"><MdDeleteForever />Deletar</span> </DropdownItem>
                                <DropdownItem>
                                    {investimento.tipo === 'fii' ? (
                                        <span className="flex items-center gap-2 text-orange-500" onClick={() => setModalSacar({ openVenda: true, objetoVenda: investimento })}>
                                            <FaArrowTrendDown /> Vender Cotas ?
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-orange-500" onClick={() => setModalSacar({ open: true, objeto: investimento })}>
                                            <FaArrowTrendDown /> Sacar/Vencido
                                        </span>
                                    )}
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [visibility]);


    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])
    const topContent = React.useMemo(() => {
        return (
            <div className="w-full flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                        variant="bordered"
                        size="md"
                        fullWidth
                        className=" "
                        placeholder="Pesquisar Investimento..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                        {Array.from(statusFilter)[0] as string === "todos" || Array.from(statusFilter)[0] as string === "acao" || Array.from(statusFilter)[0] as string === "fii" ?
                            <Button
                                endContent={<ChevronDownIcon className="text-small" />}
                                variant="solid"
                                onClick={() => setModalJuros(true)}
                            >
                                <p>Juros Ganhos</p>
                            </Button>
                            : null
                        }
                        {Array.from(statusFilter)[0] as string === "fii" ?
                            <Button
                                color="warning"
                                endContent={<ChevronDownIcon className="text-small" />}
                                onClick={() => setModalDetalhes(true)}
                                variant="solid"
                            >
                                <p className="text-lg">Detalhes</p>
                            </Button>
                            : null
                        }
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    className="bg-buttonCinzaPadrao text-black"
                                    variant="solid"
                                >
                                    Colunas
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            fullWidth
                            color="primary"
                            variant="solid"
                            endContent={<PlusIcon size={18} width={18} height={18} />}
                        >
                            <Link href="/pages/investimentos/novoinvestimento"> Novo Investimento</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1text-default-900 text-small">
                        <span>Total {dadosFiltro.length} Investimentos</span>
                        <span>{nomePagina}, <span className="text-primaryTableText">{visibility ? currency(total) : '****'}</span> Investidos </span>
                    </div>
                    <label className="flex items-center text-default-400 text-small">
                        Linhas por Páginas:
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
            </div >
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        hasSearchFilter,
        total,
        nomePagina,
        visibility
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-center items-center">
                <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={hasSearchFilter}
                    page={page}
                    total={pages}
                    variant="light"
                    onChange={setPage}
                />
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
    return (
        <div key={String(visibility)} className="w-full p-8">
            <Card className=" px-4 pt-4  bg-BgCardPadrao rounded-lg">
                <TitlePage title={
                    nomePagina}
                />
                <Table
                    isCompact
                    removeWrapper
                    aria-label="Example table with custom cells, pagination and sorting"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px] bg-BgCardPadrao ",
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="none"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column: any) => (
                            <TableColumn
                                className="text-primaryTableText font-bold "
                                key={column.uid}
                                allowsSorting={column.sortable}
                                align={column.uid === "actions" || column.uid === "pago" ? "center" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"Não há Investimentos Cadastrados"} items={sortedItems}>
                        {(item) => (
                            <TableRow className="hover:text-primaryTableText" key={item.id}>
                                {(columnKey) => <TableCell >{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
            <ModalDetalhesFii
                data={dadosFiltro}
                open={modalDetalhes}
                onClose={() => setModalDetalhes(false)}
            />
            <ModalJuros
                data={juros}
                open={modalJuros}
                onClose={() => setModalJuros(false)}
                funcao={buscaLucratividade}
            />
            <ModalDelete
                isOpen={modalDelete.openClose}
                onClose={() => setModalDelete({ openClose: false, objeto: null })}
                confirmaEsclusao={deletaInvestimento}
                message={message}
                messageTipo={messageTipo}
                objeto={''}
            />
            <ModalSacar
                open={modalSacar.open}
                onClose={() => setModalSacar({ open: false, objeto: null })}
                object={modalSacar.objeto}
                funcao={() => buscaInvestimentos()}
            />
            <ModalvendaFii
                open={modalSacar.openVenda}
                onClose={() => setModalSacar({ openVenda: false, objetoVenda: null })}
                object={modalSacar.objetoVenda}
                funcao={() => buscaInvestimentos()}
                dadosInvestmentos={dados}
            />
        </div>

    );
}
