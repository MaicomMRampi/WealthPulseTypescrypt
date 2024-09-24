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
    Card
} from "@nextui-org/react";
import dynamic from "next/dynamic";
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
import ModalDelete from "@/components/ModalDelete"
import orcamentoMensalControle from "@/components/funcoes/orcamentoMensalControle";
import { BsInfoCircle } from "react-icons/bs";
import useVisibilityCampo from '@/components/hooks/useVisibilityCampos';
interface Acumulador {
    [key: string]: {
        data: string;
        itens: Omit<Item, 'mesCorrespondente'>[];

    },
}

interface Item {
    id: string;
    dataGasto: string;
    valor: string;
    tipo: string;
    categoria: string;
    observacao: string;
    mesCorrespondente: any;
    pago: number;
}

interface ModalDelete {
    openClose: boolean;
    objeto: any;
}

export default function ListaDespesa() {
    const dataAtual = new Date()
    const mesVenc = dataAtual.getMonth() + 1;
    const anoVenc = dataAtual.getFullYear();
    const dataInicioControle = `${anoVenc}-${mesVenc < 10 ? `0${mesVenc}` : mesVenc}`;
    const { visibilityCampo } = useVisibilityCampo()
    const [valueInput, setValueInput] = useState<any>()
    const [dataControleMensal, setDataControleMensal] = useState<string>(dataInicioControle);
    const [mesFatura, setMesFatura] = useState<string>();
    const [opemModalFatura, setOpenModalFatura] = useState(false);
    const [openModalObservacao, setOpenModalObservacao] = useState(false);
    const { visibility } = useVisibility()
    const [observacao, setObservacao] = useState<any>();
    const [selectedIndex, setSelectedIndex] = useState(0); // Inicia com -1 para nenhum item selecionado
    const [Despesa, setDespesa] = useState<any>();
    const [DespesaSelect, setDespesaSelect] = useState<any>([]);
    const [modalDelete, setModalDelete] = useState<any>({ openClose: false, objeto: null });
    const [filterValue, setFilterValue] = useState<string>("");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [orcamentoMensal, setOrcamentoMensal] = useState<any>();
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "dataGasto",
        direction: "ascending",
    });
    const [message, setMessage] = useState("");
    const [messageTipo, setMessageTipo] = useState<string>()

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
        setMesFatura(mes)
        setOpenModalFatura(true)
    }

    const pagFatura = async () => {
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
        setDataControleMensal(data);
        const response = await api.post(`/buscadespesadata`, {
            data: data,
            emailUser: tokenUsuario?.id,
        });
        setDespesaSelect(response.data);
    };

    const fetchOrcamento = async () => {
        try {
            const resultado = await orcamentoMensalControle(dataControleMensal, tokenUsuario?.id);
            setOrcamentoMensal(resultado);
        } catch (error) {
            console.error("Erro ao buscar o orçamento mensal:", error);
        }
    };

    useEffect(() => {
        fetchOrcamento();
    }, [DespesaSelect, Despesa, dataControleMensal]);




    const handleDelete = async () => {

        try {
            const response = await api.delete('/deletadespesa', {
                params: {
                    id: modalDelete.objeto,
                },
            });
            if (response.status === 200) {
                setMessage(response.data.message);
                setMessageTipo('success');
                buscaDespesa();
                buscaDespesaMesAtual();
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


    const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then(mod => mod.PDFDownloadLink), { ssr: false });

    // Agora utilize o PDFDownloadLink no componente como de costume

    const dadosAgrupados = Despesa
        ? Despesa.reduce((acc: any, item: any) => {
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

    const somaValores =
        DespesaSelect &&
        DespesaSelect.reduce((acc: number, despesa: any) => acc + despesa.valorGasto, 0);

    const openObservação = (observacao: object) => {
        setObservacao(observacao)
        setOpenModalObservacao(true)

    }
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...DespesaSelect];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((item: any) =>
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
                        {/* <Tooltip className="" content="Editar">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon className="text-[#93fad6]" />
                            </span>
                        </Tooltip> */}
                        {despesa.fechada === 0 ? (
                            <Tooltip className="" color="danger" content="Deletar">
                                <span onClick={() => setModalDelete({ openClose: true, objeto: despesa.id })} className="text-lg text-danger cursor-pointer active:opacity-50">
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
    const porcentagem = orcamentoMensal?.porcentagem ?? 0;
    const headerTable = useMemo(() => {
        return (
            <div className="flex flex-col gap-4  pb-4 p-4" >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="col-span-1">
                        <Input
                            size="md"
                            fullWidth
                            variant="bordered"
                            // className="w-full sm:max-w-[44%]  "
                            placeholder="Pesquisar Despesa..."
                            startContent={<SearchIcon />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <input
                                value={valueInput}
                                placeholder={"Mês Correspondente da Fatura"}
                                className={`w-full rounded-xl h-[43px] 
                ${!visibilityCampo
                                        ? 'bg-[#27272a]'
                                        : 'bg-[#f4f4f5]'
                                    }`}
                                type="month"
                                name="mescorrespondente"
                                onChange={(e) => {
                                    setValueInput(e.target.value);

                                    const [year, month] = e.target.value.split('-'); // Divide a string no formato YYYY-MM
                                    let newMonth = parseInt(month) // Subtrai um mês

                                    let newYear = parseInt(year);
                                    if (newMonth === 0) { // Se o mês for janeiro, precisa ajustar o ano
                                        newMonth = 12;
                                        newYear -= 1;
                                    }

                                    // Formata o mês para dois dígitos
                                    const formattedMonth = String(newMonth).padStart(2, '0');

                                    // Formata o novo valor de ano e mês
                                    const previousMonthString = `${newYear}-${formattedMonth}`;

                                    // Chama a função passando o mês anterior
                                    handleDataSelect(previousMonthString);
                                }}
                            />

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
                                endContent={<PlusIcon size={16} width={16} height={16} />}
                            >
                                <Link href="/pages/despesas/novadespesa"> Nova Despesa</Link>
                            </Button>
                        </div>
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
            </div>
        );
    }, [
        filterValue,
        onRowsPerPageChange,
        DespesaSelect.length,
        onSearchChange,
        hasSearchFilter,
        Despesa,
        dataControleMensal,
        orcamentoMensal,
        visibilityCampo

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
                    <ButtonVoltar tamanho={false} />
                </div>
            </div>
        );
    }, [page, pages, hasSearchFilter]);

    return (
        <>

            <div key={String(visibility)} className="w-[95%] m-auto" >
                <TitlePage title="Minhas Despesas" />
                <div className="w-full grid grid-cols-1 md:grid-cols-12 pt-6">
                    <div className="col-span-2 items-center justify-center">
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
                    <div className="col-span-10 px-6  rounded-lg">
                        <Card className="bg-BgCardPadrao">
                            {headerTable}
                            <Table
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
                                            align={column.uid === "actions" ? "center" : "start"}
                                        >
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody emptyContent={"Sem Despesas"} items={sortedItems}>
                                    {(item: any) => (
                                        <TableRow className={` ${item.fechada === 1 ? 'text-default-500 ' : 'hover:text-primaryTableText'}`} key={item.id}>
                                            {(columnKey) => (
                                                <TableCell>{renderCell(item, columnKey)}</TableCell>
                                            )}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                            {bottomContent}
                        </Card >
                    </div>
                </div>
            </div >
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
            <ModalDelete
                isOpen={modalDelete.openClose}
                onClose={() => setModalDelete({ openClose: false, objeto: null })}
                message={message}
                confirmaEsclusao={handleDelete}
                objeto={modalDelete.objeto}
                messageTipo={messageTipo}
            />
        </>
    );
}