import * as yup from "yup"
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
const initialValues = {
    responsavel: '',
    mescorrespondente: '',
    categoria: '',
    formadepagamento: '',
    valorgasto: '',
    dataaquisicao: today(getLocalTimeZone()),
    observacao: '',
}

const validationSchema = yup.object().shape({
    observacao: yup
        .string()
        .optional(),

    responsavel: yup
        .string()
        .required('O Nome é Obrigatório'),
    mescorrespondente: yup
        .date()
        .required('O Nome é Obrigatório'),


    categoria: yup.
        string()
        .required('Campo Obrigatório'),
    formadepagamento: yup.
        string()
        .required('Campo Obrigatório'),


    valorgasto: yup.string()
        .matches(/^\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/, 'Formato inválido')
        .required('Campo obrigatório'),
    dataaquisicao: yup.date().required('Data é obrigatório'),


});

export {
    initialValues,
    validationSchema,
}