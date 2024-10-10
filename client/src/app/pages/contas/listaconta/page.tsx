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
    Progress,
    Accordion,
    AccordionItem,
    Checkbox,
    Chip,
    Card
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import currency from "@/components/Currency";
import Link from "next/link";
import { api } from "@/lib/api";
import { BsInfoCircle } from "react-icons/bs";
import ModalObservacao from "@/components/despesaComponents/ModalObservacao";
import columns from "./data";
import { format } from 'date-fns';
import { id, ptBR, vi } from 'date-fns/locale'
import { SearchIcon } from "@/components/iconesCompartilhados/SearchIcon";
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
import AlteraVisualizacaoData from "@/components/funcoes/alteraVisualizacaoData";
import ButtonVoltar from "@/components/ButtonVoltar";
import ModalFechaFatura from "@/components/despesaComponents/ModalFechaFatura"
import { CheckIcon } from "@/components/iconesCompartilhados/CheckIcon";
import { MdBlockFlipped } from "react-icons/md";
import orcamentoMensalControle from "@/components/funcoes/orcamentoMensalControle";
import { MdOutlinePayments } from "react-icons/md";

type Despesa = {
    id: string;
    dataGasto: string;
    valor: string;
    tipo: string;
    categoria: string;
    observacao: string;
    mesCorrespondente: any;
    pago: number;
}
interface Item {
    id: string;
    dataGasto: string;
    valor: string;
    tipo: string;
    categoria: string;
    observacao: string;
    mesCorrespondente: string; // Omitido quando extraído
}

interface Acumulador {
    [key: string]: {
        data: string;
        itens: Omit<Item, 'mesCorrespondente'>[];

    },
}


export default function ListaConta() {
    const dataAtual = new Date()
    const mesVenc = dataAtual.getMonth() + 1;
    const anoVenc = dataAtual.getFullYear();
    const dataInicioControle = `${anoVenc}-${mesVenc < 10 ? `0${mesVenc}` : mesVenc}`;

    const [dataControleMensal, setDataControleMensal] = useState<string>(dataInicioControle);
    const [orcamentoMensal, setOrcamentoMensal] = useState<any>();
    const [mesFatura, setMesFatura] = useState<string>();
    const [opemModalFatura, setOpenModalFatura] = useState(false);
    const [openModalObservacao, setOpenModalObservacao] = useState(false);
    const { visibility } = useVisibility()
    const [observacao, setObservacao] = useState<any>();
    const [selectedIndex, setSelectedIndex] = useState(0); // Inicia com -1 para nenhum item selecionado
    const [Despesa, setDespesa] = useState<Despesa[]>([]);
    const [DespesaSelect, setDespesaSelect] = useState<Despesa[]>([])
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

    const buscaContaMesAtual = async () => {
        const response = await api.get(`/buscacontamesatual`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setDespesaSelect(response.data);
    };

    const buscaConta = async () => {
        const response = await api.get(`/buscaconta`, {
            params: {
                id: tokenUsuario?.id,
            },
        });
        setDespesa(response.data);
    };



    useEffect(() => {
        buscaContaMesAtual();
        buscaConta()
    }, []);


    useEffect(() => {
        const fetchOrcamento = async () => {
            try {
                const resultado = await orcamentoMensalControle(dataControleMensal, tokenUsuario?.id);
                setOrcamentoMensal(resultado);
            } catch (error) {
                console.error("Erro ao buscar o orçamento mensal:", error);
            }
        };

        fetchOrcamento();
    }, [dataControleMensal, Despesa, dataInicioControle]);


    const opemModalFechaFatura = (mes: string) => {
        setMesFatura(mes)
        setOpenModalFatura(true)
    }



    const handleDataSelect = async (data: string) => {
        setDataControleMensal(data);
        const response = await api.post(`/buscacontadata`, {
            data: data,
            id: tokenUsuario?.id,
        });
        setDespesaSelect(response.data);
    };


    const pagamento = async (id: string | number, mesCorrespondente: any) => {
        const response = await api.put(`/pagaconta`, {
            id: id
        });

        handleDataSelect(mesCorrespondente);
        if (response.status === 200) {
            handleDataSelect(mesCorrespondente);
        }
    };
    const dadosAgrupados = Despesa
        ? Despesa.reduce<Acumulador>((acc, item) => {
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


    const datasOdenadasMaiorMenor = arrayAgrupado && arrayAgrupado.sort((b, a) => new Date(b.data).getTime() - new Date(a.data).getTime());


    const groupByYear = (data: any) => {
        return data.reduce((acc: any, item: any) => {
            const year = item.data.split('-')[0];
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(item);
            return acc;
        }, {});
    };

    const groupedData = groupByYear(arrayAgrupado);

    const somaValores =
        DespesaSelect &&
        DespesaSelect.reduce((acc: any, despesa: any) => acc + despesa.valor, 0);

    const openObservação = (observacao: object) => {
        setObservacao(observacao)
        setOpenModalObservacao(true)

    }
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...DespesaSelect];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item: any) =>
                item.estabelecimento.toLowerCase().includes(filterValue.toLowerCase())
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
        return [...items].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((despesa: any, columnKey: any) => {
        const cellValue = despesa[columnKey];
        switch (columnKey) {
            case "estabelecimento":
                return <p>{despesa.estabelecimento}</p>;
            case "dataVencimento":
                return <p>{despesa.dataVencimento && AlteraVisualizacaoData(despesa.dataVencimento)}</p>;
            case "mesCorrespondente":
                return <p>{AlteraVisualizacaoDataYYYYMM(despesa.mesCorrespondente)}</p>;
            case "valor":
                return (
                    <p>
                        {visibility ? currency(despesa.valor) : '****'}
                    </p>
                );
            case "pagador:":
                return (
                    <p>
                        {despesa.pagador}
                    </p>
                );
            case "pago":
                return <p>
                    {
                        despesa.pago === 0 ?
                            (
                                <Chip
                                    startContent={<MdBlockFlipped size={18} width={18} height={18} />}
                                    variant="faded"
                                    color="danger"
                                >
                                    Não pago
                                </Chip>
                            )
                            :
                            (
                                <Chip
                                    startContent={<CheckIcon size={18} width={18} height={18} />}
                                    variant="faded"
                                    color="success"
                                >
                                    Pago
                                </Chip>
                            )
                    }
                </p>




            case "actions":
                return (
                    <div className="relative flex items-center gap-12 ">
                        <Tooltip color="secondary" content="Detalhes">
                            <span onClick={() => openObservação(despesa)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip className="bg-buttonAzulClaro text-white" content="Fazer o Pagamento?">
                            <span onClick={() => pagamento(despesa.id, despesa.mesCorrespondente)} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <MdOutlinePayments className="text-buttonAzulClaro" />
                            </span>
                        </Tooltip>
                        {/* <Tooltip className="" content="Editar">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-[#93fad6]" />
                            </span>
                        </Tooltip> */}
                        <Tooltip className="" color="danger" content="Deletar">
                            <span onClick={() => setModalInfo({ show: true, objeto: despesa })} className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon className="text-red-500" />
                            </span>
                        </Tooltip>


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
    const porcentagem = orcamentoMensal?.porcentagem ?? 0;

    const headerTable = useMemo(() => {
        return (
            <div className="flex flex-col gap-4  pb-4 p-4" >
                <div className="flex justify-between gap-3 items-end py-4 w-full">
                    <Input
                        size="md"
                        fullWidth
                        className="w-full sm:max-w-[44%]  "
                        placeholder="Pesquisar Contas..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />

                    <div className="flex gap-3 w-full justify-end">
                        <Button className=" border-orange-500 text-white bg-orange-500" variant="solid" onClick={() => opemModalFechaFatura(DespesaSelect[0].mesCorrespondente)}>Fechar mês</Button>
                        <Link href="/pages/contas/novaconta">
                            <Button
                                color="primary"
                                variant="solid"
                                endContent={<PlusIcon size={18} width={18} height={18} />}
                            >
                                Nova Conta
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <Progress
                        size="sm"
                        radius="sm"
                        classNames={{
                            base: "max-w-md",
                            track: "drop-shadow-md border border-default",
                            indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                        }}
                        label="Controle de orçamento"
                        value={parseInt(porcentagem)}
                        showValueLabel={true}
                    />
                    <Tooltip color="warning" content="Soma entre despesas e contas" placement="right-end">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                            <BsInfoCircle />
                        </span>
                    </Tooltip>


                </div>
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
            </div >
        );
    }, [
        filterValue,
        onRowsPerPageChange,
        DespesaSelect.length,
        onSearchChange,
        hasSearchFilter,
        Despesa,
        dataControleMensal,
        orcamentoMensal

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
                    <ButtonVoltar tamanho={false} size="sm" />
                </div>
            </div>
        );
    }, [page, pages, hasSearchFilter]);

    return (
        <>
            <div className="w-[95%] m-auto" >
                <TitlePage title="Minhas Contas" />
                <div className="w-full grid grid-cols-1 md:grid-cols-12 pt-6">
                    <div className="col-span-2 justify-center" >
                        <Accordion
                            motionProps={{
                                variants: {
                                    enter: {
                                        y: 0,
                                        opacity: 1,
                                        height: 'auto',
                                        transition: {
                                            height: {
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                                duration: 1,
                                            },
                                            opacity: {
                                                easings: 'ease',
                                                duration: 1,
                                            },
                                        },
                                    },
                                    exit: {
                                        y: -10,
                                        opacity: 0,
                                        height: 0,
                                        transition: {
                                            height: {
                                                easings: 'ease',
                                                duration: 0.25,
                                            },
                                            opacity: {
                                                easings: 'ease',
                                                duration: 0.3,
                                            },
                                        },
                                    },
                                },
                            }}
                        >
                            {Object.keys(groupedData).map((year) => (
                                <AccordionItem
                                    classNames={{
                                        title: 'text-primaryTableText font-bold text-center border-b-orange-100 bg-BgCardPadrao'
                                    }}
                                    key={year}
                                    aria-label={`Acordeão ${year}`}
                                    title={year}>
                                    <div>
                                        {
                                            groupedData[year].map((item: any, index: number) => (
                                                <div
                                                    key={item.data}
                                                    className={`text-center border-b-orange-100 cursor-pointer ${index === selectedIndex ? 'bg-primaryTableText' : ''}`}
                                                    onClick={() => {
                                                        handleDataSelect(item.data);
                                                        setSelectedIndex(index);
                                                    }}
                                                >
                                                    {(() => {
                                                        const [ano, mes] = item.data.split('-').map(Number);
                                                        const data = new Date(ano, mes - 1);
                                                        return format(data, 'MMMM yyyy', { locale: ptBR }).toUpperCase();
                                                    })()}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div >
                    <div className="col-span-10 px-6  rounded-lg">
                        <Card className="bg-BgCardPadrao">
                            {headerTable}
                            <Table
                                key={String(visibility)}
                                aria-label="Example table with custom cells"
                                selectionMode="none"
                                classNames={{
                                    wrapper: "max-h-[382px]  bg-BgCardPadrao",
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
                                            align={column.uid === "actions" || column.uid === "pago" ? "center" : "start"}
                                        >
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody emptyContent={"Sem Contas"} items={sortedItems}>
                                    {(item) => (
                                        <TableRow className={` ${item.pago === 1 ? 'text-default-500 ' : 'hover:text-primaryTableText'}`} key={item.id}>
                                            {(columnKey) => (
                                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {bottomContent}
                        </Card>
                    </div>
                </div >
            </div >
            <ModalObservacao
                open={openModalObservacao}
                onClose={() => setOpenModalObservacao(false)}
                observacao={observacao}
            />
            {/* <ModalFechaFatura
                open={opemModalFatura}
                mes={mesFatura}
                onClose={() => setOpenModalFatura(false)}
                onSubmit={() => pagFatura()}
                mensagem={message}
            /> */}
        </>



    );
}