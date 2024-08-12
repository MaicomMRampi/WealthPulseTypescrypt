import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    acao: '',
    quantidade: '',
    precoCompra: '',
    dataCompra: today(getLocalTimeZone()),
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    acao: Yup.string().required('Patrimônio é obrigatório'),
    quantidade: Yup.string().required('Tipo é obrigatório'),
    precoCompra: Yup.string().required('Valor é obrigatório'),
    dataCompra: Yup.date().required('Data é obrigatório'),
});

export { initialValues, validationSchema }