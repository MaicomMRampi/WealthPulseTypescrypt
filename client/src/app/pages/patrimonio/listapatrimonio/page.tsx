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
    Button,
    Pagination,
    Tooltip,
    Navbar,
} from "@nextui-org/react";

import { PlusIcon } from "../../../../components/iconesCompartilhados/PlusIcon";
import { SearchIcon } from "../../../../components/iconesCompartilhados/SearchIcon";
// import ModalDeleteAcoes from "@/components/ModalDeleteAcoes";
import columns from "./columns"
import TitlePage from "@/components/tituloPaginas";
import { EditIcon } from "../../../../components/iconesCompartilhados/EditIcon";
import { DeleteIcon } from "../../../../components/iconesCompartilhados/DeleteIcon";
import { EyeIcon } from "../../../../components/iconesCompartilhados/EyeIcon";
import { api } from "@/lib/api";
import Link from 'next/link';
import currency from "@/components/Currency";
import { MdRemoveRedEye } from "react-icons/md";
// import DividendosModal from '@/components/dividendosModal'
import { useRouter } from "next/navigation";
import useVisibility from "@/components/hooks/useVisibility";
import ButtonVoltar from "@/components/ButtonVoltar";
import useToken from "@/components/hooks/useToken";
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import ModalDelete from "@/components/ModalDelete";
import ModalObservacaoPatrimonios from "@/components/ModalObservacaoPatrimonios";
import { GiPayMoney } from "react-icons/gi";
import { BsFiletypeDoc } from "react-icons/bs";

import useIdPtrimonio from "@/components/hooks/useIdPatrimonio";
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
interface ModalDelete {
    openClose: boolean,
    objeto: any
}


export default function App() {
    const { idPatrimonio, setIdPtrimonio } = useIdPtrimonio()
    console.log("🚀 ~ App ~ idPatrimonio", idPatrimonio)
    const { tokenUsuario } = useToken()
    const Router = useRouter()
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [openModalProventos, setOpenModalProventos] = useState(false)
    const [statusFilter, setStatusFilter] = useState("all");
    const [modalDelete, setModalDelete] = useState<ModalDelete>({ openClose: false, objeto: null });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });
    const [message, setMessage] = useState("");
    const [modalInfo, setModalInfo] = useState<Modal>({ show: false, objeto: null })
    const { visibility } = useVisibility()
    const [dados, setDados] = useState<any>([]);
    const [messageTipo, setMessageTipo] = useState<string>()


    const buscaPatrimonios = async () => {
        const response = await api.get('/buscabem', {
            params: {
                id: tokenUsuario?.id
            }
        });
        setDados(response.data);
    }

    useEffect(() => {
        buscaPatrimonios();
    }, []);



    const deletaPatrimonio = async () => {
        try {
            const response = await api.delete('/deletapatrimonio', {
                params: {
                    id: modalDelete.objeto,
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
        } catch (error: any) {
            setMessageTipo('error')
            // Verifica se existe uma resposta da API
            if (error.response) {
                // A API retornou um status e uma mensagem de erro
                setMessage(error.response.data.error);
            } else {
                // Caso o erro seja do lado cliente ou de rede
                setMessage("Erro ao deletar patrimônio.");
            }

            // Define a mensagem de erro no estado da aplicação
        }
        setTimeout(() => {
            setModalDelete({ openClose: false, objeto: null });
            setMessage("");
        }, 2000);
    };

    const downloadDocument = (nomeDoc: string) => {
        window.open(`https://fluxodocapital.com.br/api/uploads/document/${tokenUsuario?.id}/${nomeDoc}`, '_blank');
    }


    function formatarDataString(dataString: any) {
        const partesData = dataString.split('-'); // Divide a string pela barra '-'
        const ano = partesData[0];
        const mes = partesData[1];
        const dia = partesData[2];
        return `${dia}/${mes}/${ano}`;
    }

    const somaValores =
        dados &&
        dados.reduce((acc: number, dados: any) => acc + dados.valorPatrimonio, 0);


    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);
    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...dados];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item: any) =>
                item.nomePatrimonio.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        // if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        //     filteredUsers = filteredUsers.filter((user: any) =>
        //         Array.from(statusFilter).includes(user.status)
        //     );
        // }

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

    const mandaRota = (id: number) => {
        console.log("🚀 ~ mandaRota ~ id", id)
        Router.push(`/pages/patrimonio/detalhes`)
        setIdPtrimonio(id)
    }
    const renderCell = React.useCallback((patrimonio: any, columnKey: string) => {
        const cellValue = patrimonio[columnKey];

        switch (columnKey) {
            case "nomePatrimonio":
                return (
                    <p>{patrimonio.nomePatrimonio}</p>
                );
            case "actions":
                return (
                    <div className="relative flex gap-6 items-end ">
                        <Tooltip color="success" className="" content="Despesas com o Patrimônio">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <GiPayMoney className="text-[#93fad6]" onClick={() => mandaRota(patrimonio.id)} />
                            </span>
                        </Tooltip>
                        <Tooltip className="" content="Mais Informações">
                            <span onClick={() => setModalInfo({ show: true, objeto: patrimonio })} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-iconeDeBloquiar" />
                            </span>
                        </Tooltip>
                        <Tooltip className="" color="danger" content="Deletar">
                            <span onClick={() => setModalDelete({ openClose: true, objeto: patrimonio })} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon className="text-red-500" />
                            </span>
                        </Tooltip>
                        <Tooltip className="bg-slate-400" content="Dowload ">
                            <p>{patrimonio.documentoPath ? <BsFiletypeDoc onClick={() => downloadDocument(patrimonio.documentoPath)} className="text-lg text-white cursor-pointer active:opacity-50" /> : null}</p>
                        </Tooltip>

                    </div>
                );
            case "valorPatrimonio":
                return (
                    <p>{visibility ? currency(patrimonio.valorPatrimonio) : "****"}</p>
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
                    <p>{formatarDataString(patrimonio.dataAquisicao)}</p>
                );
            case "documentoPath":
                return (
                    <p>{patrimonio.documentoPath}</p>
                );
            default:
                return cellValue;
        }
    }, [visibility]);

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
                <div className="flex justify-between  gap-3 items-end py-4">
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
                        <Button fullWidth color="success" variant="solid" endContent={<PlusIcon height={20} width={20} size={20} />}>
                            <Link href="/pages/patrimonio/cadastropatrimonio"> Novo patrimônio</Link>
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <span className="text-default-400 text-small font-extrabold">Total de <span className="text-primaryTableHover">{dados.length}</span> patrimônios cadastrados</span>
                        <span className="text-default-400 text-small font-extrabold">Total em patrimônios <span className="text-primaryTableHover">{somaValores && currency(somaValores)}</span> </span>
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
                    <ButtonVoltar tamanho={false} size='sm' />
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (

        <div key={String(visibility)} className="px-4 w-full" >
            <TitlePage title="Meus Patrimônios" />
            <div className="rounded-lg bg-BgCardPadrao    mt-12 ">
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px] bg-BgCardPadrao",
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
                                align={column.uid === "actions" ? "start" : "start"}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"Não há patrimônios"} items={sortedItems}>
                        {(item: any) => (
                            <TableRow className="hover:text-primaryTableText" key={item.id}>
                                {(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ModalDelete
                    isOpen={modalDelete.openClose}
                    onClose={() => setModalDelete({ ...modalDelete, openClose: false })}
                    objeto={modalDelete.objeto}
                    confirmaEsclusao={deletaPatrimonio}
                    message={message}
                    messageTipo={messageTipo}
                />
                <ModalObservacaoPatrimonios
                    open={modalInfo.show}
                    observacao={modalInfo.objeto}
                    onClose={() => setModalInfo({ ...modalInfo, show: false })}
                />
            </div>
        </div>
    );
}

