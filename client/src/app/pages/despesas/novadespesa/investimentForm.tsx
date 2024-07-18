import * as yup from "yup"

const initialValues = {
    responsavel: '',
    mescorrespondente: '',
    categoria: '',
    formadepagamento: '',
    valorgasto: '',

}

const validationSchema = yup.object().shape({
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



});

export {
    initialValues,
    validationSchema,
}