"use client"
import React, { useEffect, useState } from "react";
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
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Card
} from "@nextui-org/react";
import TitlePage from "@/components/tituloPaginas";
import { PlusIcon } from "@/components/iconesCompartilhados/PlusIcon";
import { VerticalDotsIcon } from "@/components/iconesCompartilhados/VerticalDotsIcon";
import { ChevronDownIcon } from "@/components/iconesCompartilhados/ChevronDownIcon";
import { SearchIcon } from "@/components/iconesCompartilhados/SearchIcon";
import { columns, users, statusOptions } from "./data";
import { capitalize } from "./utils";
import { api } from "@/lib/api";
import useToken from "@/components/hooks/useToken";
import Link from "next/link";
import currency from "@/components/Currency";
import useVisibility from "@/components/hooks/useVisibility";
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import ModalDetalhesFii from "@/components/ModalDetalhesFii";
import { DeleteIcon } from "@/components/iconesCompartilhados/DeleteIcon";

// type User = typeof dados[0];

export default function App() {
    const [total, setTotal] = useState(0)
    const [dadosFiltro, setDadosFiltro] = useState([])
    const [dados, setDados] = useState([])
    const [modalDetalhes, setModalDetalhes] = useState(false)
    const INITIAL_VISIBLE_COLUMNS = ["nome", "dataCompra", "instituicao", "valorInvestido", "actions"];
    const { tokenUsuario } = useToken()
    const [nomePagina, setNomePagina] = useState("Minhas Rendas Fixas");
    const [filterValue, setFilterValue] = useState();
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<Set<string>>(new Set(['acao']));
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });
    const { visibility } = useVisibility()

    useEffect(() => {
        const selectedFilter = Array.from(statusFilter)[0] as string;
        switch (selectedFilter) {
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

    useEffect(() => {
        buscaInvestimentos()
    }, [])

    const [page, setPage] = React.useState(1);



    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...dados];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((investimento) =>
                investimento.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (statusFilter) {
            const selectedFilter = Array.from(statusFilter)[0] as string;
            console.log("🚀 ~ filteredItems ~ selectedFilter", statusFilter)

            filteredUsers = filteredUsers.filter((investimento) =>
                investimento.tipo === selectedFilter
            );
        }

        setDadosFiltro(filteredUsers)
        const somaValores =
            filteredUsers &&
            filteredUsers.reduce((acc, despesa) => acc + despesa.valorInvestido, 0);
        setTotal(somaValores)

        return filteredUsers;
    }, [dados, filterValue, statusFilter]);
    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: dados, b: dados) => {
            const first = a[sortDescriptor.column as keyof dados] as number;
            const second = b[sortDescriptor.column as keyof dados] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case "nome":
                return (
                    <p>{user.nome}</p>
                );
            case "dataCompra":
                return (
                    <p>{AlteraVisualizacaoData(user.dataCompra)}</p>
                );
            case "dataVencimento":
                return (
                    <p>{user.dataVencimento ? AlteraVisualizacaoData(user.dataVencimento) : null}</p>
                );
            case "valorInvestido":
                return (
                    <p>{visibility ? currency(user.valorInvestido) : '****'}</p>
                );
            case "valorPago":
                return (
                    <p>{visibility ? currency(user.valorPago) : '****'}</p>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                            <DropdownTrigger>
                                <Button isIconOnly radius="full" size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-400" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem><DeleteIcon /></DropdownItem>
                                <DropdownItem>Detalhes</DropdownItem>
                                <DropdownItem>Editar</DropdownItem>
                                <DropdownItem>Deletar</DropdownItem>
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
                        {Array.from(statusFilter)[0] as string === "fii" ?
                            <Button
                                color="warning"
                                endContent={<ChevronDownIcon className="text-small" />}
                                onClick={() => setModalDetalhes(true)}
                                variant="solid"
                            >
                                <h2 className="text-lg">Detalhes</h2>
                            </Button>
                            : null
                        }

                        {Array.from(statusFilter)[0] as string === "fii" ?
                            <Button
                                endContent={<ChevronDownIcon className="text-small" />}
                                className="bg-buttonAzulEscuro text-white"
                                variant="solid"
                            >
                                <h2 className="text-lg">Dividendos</h2>
                            </Button>
                            : null
                        }
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    className="bg-buttonAzulClaro text-white"
                                    variant="solid"
                                >
                                    <h2 className="text-lg">Tipo de Investimento</h2>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={true}
                                selectedKeys={statusFilter}
                                selectionMode="single"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button
                                    endContent={<ChevronDownIcon className="text-small" />}
                                    className="bg-buttonCinzaPadrao text-black"
                                    variant="solid"
                                >
                                    <h2 className="text-lg">Colunas</h2>
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
                            endContent={<PlusIcon />}
                        >
                            <Link href="/pages/investimentos/novoinvestimento"> Novo Investimento</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1text-default-900 text-small">
                        <span>Total {users.length} Investimentos</span>
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
        users.length,
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
        <div key={visibility} className="w-full p-8">
            <Card className=" px-4 pt-4  bg-primaryTable rounded-lg">
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
                        wrapper: "max-h-[382px] bg-primaryTable ",
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
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                                className="text-primaryTableText"
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"Não há Investimentos Cadastrados"} items={sortedItems}>
                        {(item) => (
                            <TableRow className="hover:text-primaryTableText text-white" key={item.id}>
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
        </div>

    );
}
