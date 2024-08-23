import * as Yup from 'yup';
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
const initialValues = {
    nomepatrimonio: '',
    tipodespesa: '',
    valorgasto: '',
    dataaquisicao: today(getLocalTimeZone()),
    compradorpagador: '',
    responsavel: '',
    litros: '',
    kmatual: '',
    kmantigo: '',
};

const validationSchema = Yup.object().shape({
    nomepatrimonio: Yup.string().required('Patrimônio é obrigatório'),
    tipodespesa: Yup.string().required('Tipo é obrigatório'),
    valorgasto: Yup.string().required('Valor é obrigatório'),
    dataaquisicao: Yup.date().required('Data é obrigatório'),
    compradorpagador: Yup.string().optional(),
    responsavel: Yup.string().optional(),
    litros: Yup.string().optional(),
    kmatual: Yup.string().optional(),
    kmantigo: Yup.string().optional(),
});

export {
    initialValues,
    validationSchema,
}