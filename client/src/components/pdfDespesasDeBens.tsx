"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import currency from "./Currency";

interface Props {
    dadosRelatorios: any,
    tempoPatrimonio: any,
    totalDeGastos: string
}

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4',
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
    },
});

// Create Document Component
const DocumentoDespesasBens = ({ dadosRelatorios, tempoPatrimonio, totalDeGastos }: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Relatório de Despesas</Text>
                <Text style={styles.subtitle}>Tempo de Posse do Patrimônio: {tempoPatrimonio}</Text>
                <Text style={styles.subtitle}>Total de Gastos: R$ {totalDeGastos}</Text>
            </View>
            <View style={styles.section}>
                {dadosRelatorios.map((item: any, index: any) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.subtitle}>Despesa {index + 1}</Text>
                        <Text style={styles.text}>ID: {item.id}</Text>
                        <Text style={styles.text}>Tipo de Despesa: {item.TipoDespesa.nomeDespesa}</Text>
                        <Text style={styles.text}>Valor: R$ {currency(item.valor)}</Text>
                        <Text style={styles.text}>Data de Aquisição: {item.dataAquisicao}</Text>
                        <Text style={styles.text}>Responsável: {item.responsavel || "Não informado"}</Text>
                        <Text style={styles.text}>Observação: {item.observacao || "Nenhuma"}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default DocumentoDespesasBens