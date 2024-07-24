import * as Yup from 'yup';
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
const initialValues = {
    nomepatrimonio: '',
    tipodespesa: '',
    valorgasto: '',
    dataaquisicao: today(getLocalTimeZone()),
};

const validationSchema = Yup.object().shape({
    nomepatrimonio: Yup.string().required('Patrimônio é obrigatório'),
    tipodespesa: Yup.string().required('Tipo é obrigatório'),
    valorgasto: Yup.string().required('Valor é obrigatório'),
    dataaquisicao: Yup.date().required('Data é obrigatório'),
});

export {
    initialValues,
    validationSchema,
}