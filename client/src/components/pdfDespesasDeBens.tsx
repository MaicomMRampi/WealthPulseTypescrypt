"use client";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import currency from "./Currency";

interface Props {
    dadosRelatorios: any,
    tempoPatrimonio: any,
    totalDeGastos: string
}

// Estilos aprimorados
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#f9fafb',
        padding: 30,
    },
    header: {
        marginBottom: 20,
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 12,
        color: '#555',
        marginBottom: 5,
    },
    section: {
        marginBottom: 15,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        padding: 5,
    },
    tableCellHeader: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
        color: '#666',
    },
    totalSection: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
    },
    totalText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#000',
    },
    footer: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 10,
        color: '#888',
    },
});

// Componente do documento
const DocumentoDespesasBens = ({ dadosRelatorios, tempoPatrimonio, totalDeGastos }: Props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}>Relatório de Despesas de Bens Patrimoniais</Text>
                <Text style={styles.subtitle}>Tempo de Posse do Patrimônio: {tempoPatrimonio}</Text>
                <Text style={styles.subtitle}>Total de Gastos: R$ {totalDeGastos}</Text>
            </View>

            {/* Seção de despesas */}
            <View style={styles.section}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableCellHeader}>ID</Text>
                    <Text style={styles.tableCellHeader}>Tipo de Despesa</Text>
                    <Text style={styles.tableCellHeader}>Valor</Text>
                    <Text style={styles.tableCellHeader}>Data de Aquisição</Text>
                    <Text style={styles.tableCellHeader}>Responsável</Text>
                </View>

                {dadosRelatorios.map((item: any, index: any) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.id}</Text>
                        <Text style={styles.tableCell}>{item.TipoDespesa.nomeDespesa}</Text>
                        <Text style={styles.tableCell}>R$ {currency(item.valor)}</Text>
                        <Text style={styles.tableCell}>{item.dataAquisicao}</Text>
                        <Text style={styles.tableCell}>{item.responsavel || "Não informado"}</Text>
                    </View>
                ))}
            </View>

            {/* Seção de total de gastos */}
            <View style={styles.totalSection}>
                <Text style={styles.totalText}>Total de Gastos: R$ {totalDeGastos}</Text>
            </View>

            {/* Rodapé */}
            <View style={styles.footer}>
                <Text>Relatório gerado automaticamente - {new Date().toLocaleDateString()}</Text>
            </View>
        </Page>
    </Document>
);

export default DocumentoDespesasBens;
