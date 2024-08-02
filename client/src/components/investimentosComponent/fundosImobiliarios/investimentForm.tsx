import * as yup from "yup"

const initialValues = {
    nomefii: '',
    datacompra: '',
    quantidade: '',
    valorpago: '',

}

const validationSchema = yup.object().shape({
    nomefii: yup
        .string()
        .required('O Nome é Obrigatório'),
    datacompra: yup
        .date()
        .required('O Nome é Obrigatório'),


    quantidade: yup.
        number("Digite Apenas Números")
        .required('Campo Obrigatório'),


    valorpago: yup.
        string()
        .required('Campo Obrigatório'),


});

export {
    initialValues,
    validationSchema,
}

