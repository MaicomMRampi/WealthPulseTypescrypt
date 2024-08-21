"use client";
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
    Listbox,
    ListboxItem,
    Progress
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import currency from "@/components/Currency";
import Link from "next/link";
import { api } from "@/lib/api";
import PdfDespesas from "@/components/PdfDespesas";
import ModalObservacao from "@/components/despesaComponents/ModalObservacao";
import columns from "./data";
import { format } from 'date-fns';
import { ptBR, vi } from 'date-fns/locale'
import { SearchIcon } from "@/components/iconesCompartilhados/SearchIcon";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo } from "react";
import { useCallback } from "react";
import { EyeIcon } from "@/components/iconesCompartilhados/EyeIcon";
import { EditIcon } from "@/components/iconesCompartilhados/EditIcon";
import { DeleteIcon } from "@/components/iconesCompartilhados/DeleteIcon";
import useVisibility from "@/components/hooks/useVisibility";
import { PlusIcon } from "@/components/iconesCompartilhados/PlusIcon";
import useToken from "@/components/hooks/useToken";
import TitlePage from "@/components/tituloPaginas";
import AlteraVisualizacaoDataYYYYMM from "@/components/funcoes/alteraVisualizacaoDataYYYMM";
import ButtonVoltar from "@/components/ButtonVoltar";
import ModalFechaFatura from "@/components/despesaComponents/ModalFechaFatura"
export default function MinhasDespesas() {
    const [message, setMessage] = useState()
    const [mesFatura, setMesFatura] = useState<string>();
    const [opemModalFatura, setOpenModalFatura] = useState(false);
    const [openModalObservacao, setOpenModalObservacao] = useState(false);
    const { visibility } = useVisibility()
    const [observacao, setObservacao] = useState<object>(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // Inicia com -1 para nenhum item selecionado
    const [Despesa, setDespesa] = useState();
    const [DespesaSelect, setDespesaSelect] = useState([]);
    console.log("🚀 ~ MinhasDespesas ~ DespesaSelect", DespesaSelect)
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "dataGasto",
        direction: "ascending",
    });
    const [modalInfo, setModalInfo] = useState({
        show: false,
        objeto: {}
    })
    const { tokenUsuario } = useToken()

    const buscaDespesaMesAtual = async () => {
        const response = await api.get(`/buscadespesamesatual`, {
            params: {
                email: tokenUsuario?.id,
            },
        });
        setDespesaSelect(response.data);
    };

    const buscaDespesa = async () => {
        const response = await api.get(`/buscadespesa`, {
            params: {
                email: tokenUsuario?.id,
            },
        });
        setDespesa(response.data);
    };



    useEffect(() => {
        buscaDespesa();
        buscaDespesaMesAtual();
    }, []);


    const opemModalFechaFatura = (mes: string) => {
        console.log("🚀 ~ opemModalFechaFatura ~ mes", mes)
        setMesFatura(mes)
        setOpenModalFatura(true)
    }

    const pagFatura = async () => {
        console.log('MEs fatura apor confirmare', mesFatura)
        const response = await api.post(`/fecharfatura`, {
            idUsuario: tokenUsuario?.id,
            fatura: mesFatura
        });
        if (response.status == 200) {
            buscaDespesa();
            buscaDespesaMesAtual();
            setMessage(response.data.message)
            setTimeout(() => {
                setMesFatura('')
                setOpenModalFatura(false)
            }, 3000)
        } else {
            setOpenModalFatura(false)
        }
    }



    const handleDataSelect = async (data: string) => {
        const response = await api.post(`/buscadespesadata`, {
            data: data,
            emailUser: tokenUsuario?.id,
        });
        setDespesaSelect(response.data);
    };

    const dadosAgrupados = Despesa
        ? Despesa.reduce((acc, item) => {
            const { mesCorrespondente, ...outrasPropriedades } = item;
            if (!acc[mesCorrespondente]) {
                acc[mesCorrespondente] = {
                    data: mesCorrespondente,
                    itens: [outrasPropriedades],
                };
            } else {
                acc[mesCorrespondente].itens.push(outrasPropriedades);
            }
            return acc;
        }, {})
        : {};

    const arrayAgrupado = Despesa
        ? Object.keys(dadosAgrupados).map((key) => dadosAgrupados[key])
        : [];


    const datasOdenadasMaiorMenor = arrayAgrupado.sort((a, b) => new Date(b.data) - new Date(a.data));

    const somaValores =
        DespesaSelect &&
        DespesaSelect.reduce((acc, despesa) => acc + despesa.valorGasto, 0);

    const openObservação = (observacao: object) => {
        setObservacao(observacao)
        setOpenModalObservacao(true)

    }
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...DespesaSelect];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item) =>
                item.categoria.nomeCategoria.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredUsers;
    }, [DespesaSelect, filterValue, hasSearchFilter]);

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

    const renderCell = useCallback((despesa: any, columnKey: any) => {
        const cellValue = despesa[columnKey];
        switch (columnKey) {
            case "mesCorrespondente":
                return <p>{AlteraVisualizacaoDataYYYYMM(despesa.mesCorrespondente)}</p>;
            case "categoria":
                return <p>{despesa.categoria && despesa.categoria.nomeCategoria}</p>;
            case "valorGasto":
                return (
                    <p>
                        {visibility ? currency(despesa.valorGasto) : '****'}
                    </p>
                );
            case "local":
                return <p>{despesa.local}</p>;
            case "formaDePagamento":
                return <p>{despesa.FormaPagamento.nomeFormaPagamento}</p>;
            case "pagante":
                return <p>{despesa.pagante}</p>;
            case "responsavel":
                return <p>{despesa.responsavel}</p>;
            case "actions":
                return (
                    <div className="relative flex items-center gap-12 ">
                        <Tooltip color="secondary" content="Detalhes">
                            <span onClick={() => openObservação(despesa)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip className="" content="Editar">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-[#93fad6]" />
                            </span>
                        </Tooltip>
                        {despesa.fechada === 0 ? (
                            <Tooltip className="" color="danger" content="Deletar">
                                <span onClick={() => setModalInfo({ show: true, objeto: despesa })} className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon className="text-red-500" />
                                </span>
                            </Tooltip>
                        ) : (null)}

                    </div>
                );

            default:
                return cellValue;
        }


    }, [visibility, DespesaSelect]);

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

    const onRowsPerPageChange = useCallback(
        (e: any) => {
            setRowsPerPage(Number(e.target.value));
            setPage(1);
        },
        []
    );

    const onSearchChange = useCallback(
        (value: any) => {
            if (value) {
                setFilterValue(value);
                setPage(1);
            } else {
                setFilterValue("");
            }
        },
        []
    );

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const headerTable = useMemo(() => {
        return (
            <div className="flex flex-col gap-4  pb-4 p-4" >
                <div className="flex justify-between gap-3 items-end py-4">
                    <Input
                        size="md"
                        fullWidth
                        className="w-full sm:max-w-[44%]  "
                        placeholder="Pesquisar Despesa..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />

                    <div className="flex gap-3">
                        <PDFDownloadLink document={<PdfDespesas despesas={DespesaSelect} totalFatura={currency(somaValores)} usuario={tokenUsuario} />} fileName="Despesas Patrimônio " >
                            {({ blob, url, loading, error }) =>
                                loading ? 'Loading document...' : <Button className=" bg-buttonAzulClaro text-white" variant="flat" fullWidth>Imprimir</Button>
                            }
                        </PDFDownloadLink>
                        <Button className=" border-orange-500 text-white bg-orange-500" variant="solid" fullWidth onClick={() => opemModalFechaFatura(DespesaSelect[0].mesCorrespondente)}>Fechar mês</Button>
                        <Button
                            fullWidth
                            color="primary"
                            variant="solid"
                            endContent={<PlusIcon />}
                        >
                            <Link href="/pages/despesas/novadespesa"> Nova Despesa</Link>
                        </Button>
                    </div>
                </div>
                <Progress
                    size="sm"
                    radius="sm"
                    classNames={{
                        base: "max-w-md",
                        track: "drop-shadow-md border border-default",
                        indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        label: "text-white",
                        value: "text-white",
                    }}
                    label="Controle de orçamento"
                    value={80}
                    showValueLabel={true}
                />
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <span className="text-default-400 text-small font-extrabold">
                            Total {DespesaSelect.length} Despesas cadastradas
                        </span>
                        <span className="text-default-400 text-small font-extrabold">
                            Total de <span className="text-red-500">{currency(somaValores)}</span> Despesas no mês selecionado
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
        onRowsPerPageChange,
        DespesaSelect.length,
        onSearchChange,
        hasSearchFilter,

    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
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
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onPreviousPage}
                    >
                        Anterior
                    </Button>
                    <Button
                        isDisabled={pages === 1}
                        size="sm"
                        variant="flat"
                        onPress={onNextPage}
                    >
                        Próxima
                    </Button>
                    <ButtonVoltar size="sm" />
                </div>
            </div>
        );
    }, [page, pages, hasSearchFilter]);

    return (
        <>
            <div key={visibility} className="w-[95%] m-auto" >
                <TitlePage title="Minhas Despesas" />
                <div className="w-full grid grid-cols-1 md:grid-cols-12 pt-6">
                    <div className="col-span-2 ">
                        <Listbox
                            aria-label="Example with disabled actions"
                        >
                            {datasOdenadasMaiorMenor &&
                                datasOdenadasMaiorMenor.map((item, index) => (
                                    <ListboxItem
                                        key={item.data}
                                        className={`text-center border-b-orange-100 cursor-pointer ${index === selectedIndex ? 'bg-primaryTableText' : ''
                                            }`}
                                        onClick={() => {
                                            handleDataSelect(item.data);
                                            setSelectedIndex(index); // Define o índice do item selecionado
                                        }}
                                    >
                                        {(() => {
                                            const [ano, mes] = datasOdenadasMaiorMenor && item.data.split('-').map(Number);
                                            const data = new Date(ano, mes - 1); // Ajusta o mês (0-indexed)
                                            return format(data, 'MMMM yyyy', { locale: ptBR }).toUpperCase();
                                        })()}
                                    </ListboxItem>
                                ))}
                        </Listbox>
                    </div>
                    <div className="col-span-10 px-6 bg-BgCardPadraoTable rounded-lg">
                        {headerTable}
                        <Table
                            aria-label="Example table with custom cells"
                            selectionMode="none"
                            classNames={{
                                wrapper: "max-h-[382px] bg-primaryTable ",
                            }}
                            sortDescriptor={sortDescriptor}
                            onSortChange={setSortDescriptor}
                        >
                            <TableHeader columns={columns}>
                                {(column) => (
                                    <TableColumn
                                        className="text-primaryTableText font-bold "
                                        key={column.uid}
                                        allowsSorting={column.sortable}
                                        align={column.uid === "actions" ? "center" : "start"}
                                    >
                                        {column.name}
                                    </TableColumn>
                                )}
                            </TableHeader>
                            <TableBody emptyContent={"Sem Despesas"} items={sortedItems}>
                                {(item) => (
                                    <TableRow className={` ${item.fechada === 1 ? 'text-default-500 ' : 'hover:text-primaryTableText text-white'}`} key={item.id}>
                                        {(columnKey) => (
                                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {bottomContent}
                    </div>
                </div>
            </div>
            <ModalObservacao
                open={openModalObservacao}
                onClose={() => setOpenModalObservacao(false)}
                observacao={observacao}
            />
            <ModalFechaFatura
                open={opemModalFatura}
                mes={mesFatura}
                onClose={() => setOpenModalFatura(false)}
                onSubmit={() => pagFatura()}
                mensagem={message}
            />
        </>



    );
}