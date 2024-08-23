import * as yup from "yup"
const initialValues = {
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmaSenha: '',
}

const validationSchema = yup.object().shape({
    nome: yup
        .string()
        .required('O Nome é Obrigatório'),

    cpf: yup.string().required('O CPF é obrigatório'),

    senha: yup.
        string()
        .min(4, 'Digite uma Senha Maior')
        .required('Campo Obrigatório'),

    email: yup.string().email("Digite um E-mail Válido").required('Campo E-mail Obrigatório'),


    confirmaSenha: yup
        .string()
        .oneOf([yup.ref('senha'), undefined], 'As senhas não coincidem')
        .required('Campo Obrigatório')
});

export {
    initialValues,
    validationSchema,
}