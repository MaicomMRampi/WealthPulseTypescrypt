import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    estabelecimento: '',
    comprador: '',
    valor: '',
    datavencimento: '',
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    estabelecimento: Yup.string().required('Patrimônio é obrigatório'),
    comprador: Yup.string().required('Patrimônio é obrigatório'),
    valor: Yup.string().required('Valor é obrigatório'),
    datavencimento: Yup.date().required('Data é obrigatório'),
});

export { initialValues, validationSchema }