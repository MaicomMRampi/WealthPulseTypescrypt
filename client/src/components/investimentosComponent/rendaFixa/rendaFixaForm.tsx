import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    tipoTitulo: '',
    nome: '',
    instituicao: '',
    valorInvestido: '',

    dataVencimento: '',
    dataCompra: today(getLocalTimeZone()),
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    tipoTitulo: Yup.string().required('Campo é obrigatório'),
    nome: Yup.string().required('Campo é obrigatório'),
    instituicao: Yup.string().required('Campo é obrigatório'),
    valorInvestido: Yup.string().required('Campo é obrigatório'),
    dataVencimento: Yup.date().required('Campo é obrigatório'),
    dataCompra: Yup.date().required('Campo é obrigatório'),
});

export { initialValues, validationSchema }