import * as Yup from "yup"


const initialValues = {
    nome: '',
    tipopatrimonio: '',
    valor: '',
    dataaquisicao: '',
};

// ... (Função Label - Se necessário) 

const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Patrimônio é obrigatório'),
    tipopatrimonio: Yup.string().required('Tipo é obrigatório'),
    valor: Yup.string().required('Valor é obrigatório'),
});

export { initialValues, validationSchema }