"use client";
import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import currency from "./Currency";

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        paddingTop: 10,
    },
    table: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#ddd",
        fontSize: 10,
        marginBottom: 5,
    },
    cell: {
        width: "25%",
        padding: 5,
    },
    rowLocal: {
        display: "flex",
        fontSize: 10,
        marginBottom: 5,
        gap: '10px',
    },
    headerQuanti: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        fontSize: 12,
        textAlign: "center",
        backgroundColor: "#e6e6e6",
        // border: '1px solid black',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5,
    },
    valorTotal: {
        display: "flex",
        fontSize: 10,
    },
    locals: {
        display: "flex",
        flexDirection: "row",
        fontSize: 10,
    },
    logo: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
    },
    textDespesa: {
        color: 'red',
        fontSize: 10,
    },
    textTittle: {
        paddingTop: 10,
        fontSize: 12,
        textAlign: "center",
        paddingBottom: 20,
    },
    footer: {
        padding: 10,
        borderTop: '1px solid black',
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 10,
    },
    assinatura: {
        display: "flex",
        textAlign: "center",
        fontSize: 10,
        marginTop: 20,
        borderTop: '1px solid black',
        paddingTop: 4,
        width: "30%",
    },
    assinaturaDiv: {
        display: "flex",
        alignItems: "center",
        marginTop: 30,
        width: "100%",
    },
    dataDiv: {
        display: "flex",
        alignItems: "flex-end",
        paddingTop: 20,
        marginBottom: 20,
        fontSize: 10,
    }
});

const dia = new Date().getDate();
const mes = new Date().getMonth() + 1;
const ano = new Date().getFullYear();
const data = `${dia}/${mes}/${ano}`;

interface Despesa {
    id: number;
    dataGasto: string;
    categoria: { nomeCategoria: string };
    local: string;
    valorGasto: number;
    pagante: string;
    mesCorrespondente: string;

}

interface Props {
    despesas: Despesa[];
    totalFatura: string;
    usuario: any;
}

const PdfDespesas = ({ despesas, totalFatura, usuario }: Props) => {
    const dadosAgrupadosLocal = despesas.reduce((acc: any, item: Despesa) => {
        const { categoria: { nomeCategoria }, valorGasto } = item;

        if (!acc[nomeCategoria]) {
            acc[nomeCategoria] = {
                categoria: `${nomeCategoria}:`,
                valorGastoLocal: valorGasto,
            };
        } else {
            acc[nomeCategoria].valorGastoLocal += valorGasto;
        }
        return acc;
    }, {});

    const arrayAgrupadoLocal = Object.values(dadosAgrupadosLocal);

    const dadosAgrupados = despesas.reduce((acc: any, item: Despesa) => {
        const { pagante, valorGasto } = item;

        if (!acc[pagante]) {
            acc[pagante] = {
                pagante: `${pagante}:`,
                totalvalorgasto: valorGasto,
            };
        } else {
            acc[pagante].totalvalorgasto += valorGasto;
        }

        return acc;
    }, {});
    const arrayAgrupado = Object.values(dadosAgrupados);

    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <Text style={styles.textTittle}>Demonstrativo de Despesas</Text>

                {/* DADOS QUANTITATIVOS */}
                <View>
                    <Text style={styles.headerQuanti}>Dados Quantitativos:</Text>
                    <View style={styles.rowLocal}>
                        {despesas.length > 0 ? (
                            <Text>Mês e Ano da(s) Despesa(s): {despesas[0].mesCorrespondente}</Text>
                        ) : (
                            <Text>Não há despesas disponíveis</Text>
                        )}
                        <Text style={styles.valorTotal}>
                            VALOR FATURA: <Text style={styles.textDespesa}>{currency(despesas.reduce((total, despesa) => total + despesa.valorGasto, 0))}</Text>
                        </Text>
                        <Text style={styles.headerQuanti}>Locais dos Gastos</Text>
                        {arrayAgrupadoLocal.map((row: any) => (
                            <View style={styles.locals} key={row.categoria}>
                                <Text>{row.categoria} </Text>
                                <Text>{currency(row.valorGastoLocal)}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.headerQuanti}>Pagantes</Text>
                    <View style={styles.rowLocal}>
                        {arrayAgrupado.map((row: any) => (
                            <View style={styles.locals} key={row.pagante}>
                                <Text>{row.pagante} </Text>
                                <Text>{currency(row.totalvalorgasto)}</Text>
                            </View>
                        ))}
                    </View>
                </View>
                {/* CRIA A TABELA */}
                <Text style={styles.headerQuanti}>Detalhes das Despesas</Text>
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Id</Text>
                        <Text style={styles.cell}>Data</Text>
                        <Text style={styles.cell}>Categoria</Text>
                        <Text style={styles.cell}>Local</Text>
                        <Text style={styles.cell}>Valor</Text>
                    </View>
                    {despesas.map((despesa: Despesa) => (
                        <View style={styles.row} key={despesa.id}>
                            <Text style={styles.cell}>{despesa.id}</Text>
                            <Text style={styles.cell}>{new Date(despesa.dataGasto).toLocaleDateString()}</Text>
                            <Text style={styles.cell}>{despesa.categoria.nomeCategoria}</Text>
                            <Text style={styles.cell}>{despesa.local}</Text>
                            <Text style={styles.cell}>{currency(despesa.valorGasto)}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.dataDiv}>
                    <Text>Emitido em: {data}</Text>
                </View>
                <View style={styles.assinaturaDiv}>
                    <Text style={styles.assinatura}>{usuario.nome}</Text>
                </View>


                {/* <View style={styles.assinaturaDiv}><Text style={styles.assinatura}>{usuario.email}</Text></View> */}
                <View style={styles.footer}>
                    <Text>Relatório emitido por WealthPulse</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PdfDespesas;
