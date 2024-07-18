import * as yup from "yup"

const initialValues = {
    cpf: '',
    senha: '',
}

const validationSchema = yup.object().shape({
    senha: yup
        .string()
        .required('A senha é Obrigatório'),
    cpf: yup.string().required('O CPF é obrigatório')
});

export {
    initialValues,
    validationSchema,
}