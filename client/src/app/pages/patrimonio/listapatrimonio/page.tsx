"use client"
import React, { useState, useEffect } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Divider,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Tooltip,
} from "@nextui-org/react";
import { PlusIcon } from "../../../../components/iconesCompartilhados/PlusIcon";
import { SearchIcon } from "../../../../components/iconesCompartilhados/SearchIcon";
// import ModalDeleteAcoes from "@/components/ModalDeleteAcoes";
import Paper from "@mui/material/Paper";
import { EditIcon } from "../../../../components/iconesCompartilhados/EditIcon";
import { DeleteIcon } from "../../../../components/iconesCompartilhados/DeleteIcon";
import { EyeIcon } from "../../../../components/iconesCompartilhados/EyeIcon";
import { api } from "@/lib/api";
import Link from 'next/link';
import currency from "@/components/Currency";

// import DividendosModal from '@/components/dividendosModal'
import { useRouter } from "next/navigation";
const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

interface Modal {
    show: boolean,
    objeto: any
}


export default function App() {
    const Router = useRouter()
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [openModalProventos, setOpenModalProventos] = useState(false)
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "age",
        direction: "ascending",
    });
    const [message, setMessage] = useState("");
    const [modalInfo, setModalInfo] = useState<Modal>({ show: false, objeto: null })

    const [dados, setDados] = useState([]);
    const emailUser = 'MAICOM.MATEUS@YAHOO.COM.BR'

    const buscaPatrimonios = async () => {
        if (emailUser) {
            const response = await api.get('/buscabem', {
                params: {
                    email: emailUser
                }
            });
            setDados(response.data);

        }
    }

    useEffect(() => {
        buscaPatrimonios();
    }, [emailUser]);

    const deleteInvestimento = async () => {
        const response = await api.delete('/deletainvestimentoacao', {
            params: {
                id: modalInfo.objeto._id
            }
        })
        if (response.status === 200) {
            setMessage(response.data.message)

            setTimeout(() => {
                setModalInfo({ show: false, objeto: null })
                setMessage("")
            }, 2000)
        }
        console.log(modalInfo.objeto._id)
    }


    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);
    console.log("🚀 ~ App ~ hasSearchFilter", hasSearchFilter)

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...dados];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) =>
                item.nomePatrimonio.toLowerCase().includes(filterValue.toLowerCase())
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

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((patrimonio, columnKey) => {
        const mandaRota = (id) => {
            Router.push(`/gastoscompatrimonio/${id}`)
        }
        const cellValue = patrimonio[columnKey];
        console.log("🚀 ~ renderCell ~ cellValue", cellValue)

        switch (columnKey) {
            case "nomePatrimonio":
                return (
                    <p>{patrimonio.nomePatrimonio}</p>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip className="" content="Detalhes">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon onClick={() => mandaRota(patrimonio.id)} />
                            </span>
                        </Tooltip>
                        <Tooltip className="" content="Editar">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-[#93fad6]" />
                            </span>
                        </Tooltip>
                        <Tooltip className="" color="danger" content="Deletar">
                            <span onClick={() => setModalInfo({ show: true, objeto: patrimonio })} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon className="text-red-500" />
                            </span>
                        </Tooltip>
                    </div>
                );
            case "valorPatrimonio":
                return (
                    <p>{currency(patrimonio.valorPatrimonio)}</p>
                );

            case "id":
                return (
                    <p>{patrimonio.id}</p>
                );
            case "nomePatrimonio":
                return (
                    <p>{patrimonio.nomepatrimonio}</p>
                );
            case "dataAquisicao":
                return (
                    <p>{new Date(patrimonio.dataAquisicao).toLocaleDateString()}</p>
                );
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value: string) => {
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

    const openDividendos = () => {
        setOpenModalProventos(true)
    }

    const headerTable = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4 border-b-2 border-gray-300 pb-4 p-4">
                <div className="flex justify-between gap-3 items-end py-4">
                    <Input
                        size="md"
                        fullWidth
                        className="w-full sm:max-w-[44%]  rounded-lg bg-default-100 text-default-400"
                        placeholder="Pesquisar patrimônio..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Button fullWidth color="success" variant="solid" endContent={<PlusIcon size={20} />}>
                            <Link href="/gastosdebens/cadastrodepatrimonio"> Novo patrimônio</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small font-extrabold">Total {dados.length} patrimônios cadastrados</span>
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
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Todos itens selecionados"
                        : `${selectedKeys.size} of ${filteredItems.length} Seleciondos`}
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
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div className="px-4 rounded-lg">
            <div className=" bg-primaryTable mt-12 ">
                <p className="pt-2 text-center font-bold">Meus Patrimônios</p>
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px] bg-primaryTable",
                    }}
                    selectedKeys={selectedKeys}
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
                    <TableBody emptyContent={"Não há patrimônios"} items={sortedItems}>
                        {(item) => (
                            <TableRow className="hover:text-primaryTableText" key={item._id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                {/* <ModalDeleteAcoes
                message={message}
                confirmaEsclusao={deleteInvestimento}
                objetoInvestimento={modalInfo.objeto}
                isOpen={modalInfo.show}
                onClose={() => setModalInfo({ ...modalInfo, show: false })}
            />
            <DividendosModal
                emailUser={emailUser}
                open={openModalProventos}
                onClose={() => setOpenModalProventos(false)}
            /> */}

            </div>
        </div>
    );
}

const columns = [
    {
        name: "id",
        uid: "id",
        sortable: true,
    },
    {
        name: "Nome do Patrimônio",
        uid: "nomePatrimonio",
        sortable: true,
    },
    {
        name: "Valor Pago",
        uid: "valorPatrimonio",
        sortable: true,
    },
    {
        name: "Data de Aquisição",
        uid: "dataAquisicao",
        sortable: true,
    },
    {
        name: "Ações",
        uid: "actions",
        align: "center",
    },
];