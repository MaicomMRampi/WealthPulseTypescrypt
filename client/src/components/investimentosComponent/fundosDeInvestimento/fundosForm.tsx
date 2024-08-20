import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    nome: '',
    tipoFundo: '',
    valorInvestido: '',
    instituicao: '',
    dataCompra: today(getLocalTimeZone()),
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Patrimônio é obrigatório'),
    tipoFundo: Yup.string().required('Patrimônio é obrigatório'),
    valorInvestido: Yup.string().required('Tipo é obrigatório'),
    instituicao: Yup.string().required('Patrimônio é obrigatório'),
    dataCompra: Yup.date().required('Data é obrigatório'),
});

export { initialValues, validationSchema }