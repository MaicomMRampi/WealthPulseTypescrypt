import * as Yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";

const initialValues = {
    nome: '',
    tipopatrimonio: '',
    valor: '',
    dataaquisicao: today(getLocalTimeZone()),
    localizacao: '',
    observacao: '',
    document: '',
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Patrimônio é obrigatório'),
    tipopatrimonio: Yup.string().required('Tipo é obrigatório'),
    valor: Yup.string().required('Valor é obrigatório'),
    dataaquisicao: Yup.date().required('Data é obrigatório'),
    localizacao: Yup.string().optional(),
    observacao: Yup.string().optional(),
    document: Yup.string().optional(),
});

export { initialValues, validationSchema }