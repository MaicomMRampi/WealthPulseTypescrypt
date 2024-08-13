import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    nome: '',
    instituicao: '',
    quantidade: '',
    precoCompra: '',
    dataCompra: today(getLocalTimeZone()),
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Patrimônio é obrigatório'),
    instituicao: Yup.string().required('Tipo é obrigatório'),
    quantidade: Yup.number().required('Tipo é obrigatório'),
    precoCompra: Yup.string().required('Valor é obrigatório'),
    dataCompra: Yup.date().required('Data é obrigatório'),
});

export { initialValues, validationSchema }