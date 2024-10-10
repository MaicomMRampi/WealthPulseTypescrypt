const columns = [
    {
        name: "Id",
        uid: "id",
        sortable: true,
    },
    {
        name: "Nome da Despesa",
        uid: "despesa.TipoDespesa.nomeDespesa",
        sortable: true,
    },
    {
        name: "Valor",
        uid: "valor",
        sortable: true,
    },
    {
        name: "Data Cadastro",
        uid: "dataAquisicao",
        sortable: true,
    },
    {
        name: "Tempo",
        uid: "tempo",
        sortable: true,
    },
    {
        name: "Status",
        uid: "inativo",
        sortable: true,
    },
    {
        name: "Ações",
        uid: "actions",
        align: "end",
    },
];


export default columns