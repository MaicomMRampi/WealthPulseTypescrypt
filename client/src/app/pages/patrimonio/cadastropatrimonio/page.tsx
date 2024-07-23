"use client"
import React, { useState } from "react";
import { Formik } from 'formik';
import { valorMask } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import { initialValues, validationSchema } from "./patrimonioForm";
import { Input, Select, SelectItem } from "@nextui-org/react";
import useToken from "@/components/hooks/useToken";

const patrimonios = [
    { id: '1', nome: 'Imóvel' },
    { id: '3', nome: 'Veículo' },
    { id: '4', nome: 'Outros' },
];




export default function App() {
    const { tokenUsuario } = useToken()
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');

    const handleSubmit = async (values: object) => {
        const response = await api.post('/postpatrimonio', {
            dados: values,
            token: tokenUsuario?.id,
        });

        if (response.status === 200) {
            setMessage('Patrimônio Cadastrado com Sucesso');
            setMessageTipo('success');
        } else {
            setMessage('Erro ao Cadastrar Patrimônio');
            setMessageTipo('error');
        }
        setTimeout(() => {
            setMessage('');
            setMessageTipo('');
        }, 2000);
        console.log(response);
    };



    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    touched,
                }: any) => (
                    <form onSubmit={handleSubmit}>
                        <div className="pt-8 flex flex-col gap-3   md:w-[60%] xs:w-full px-4 mx-auto">
                            <h2 className="text-3xl text-center font-bold">Cadastro de Bens</h2>
                            <Input
                                fullWidth
                                name="nome"
                                isInvalid={errors.nome && touched.nome}
                                label="Nome do bem"
                                autoComplete="nome"
                                value={values.nome}
                                onChange={handleChange}
                            />
                            <Select
                                value={values.tipopatrimonio}
                                name='tipopatrimonio'
                                fullWidth
                                label="Patrimônio"
                                isInvalid={errors.tipopatrimonio && touched.tipopatrimonio}
                                onChange={handleChange}
                            >
                                {patrimonios.map(item => (
                                    <SelectItem value={item.nome} key={item.nome}>
                                        {item.nome}
                                    </SelectItem>
                                ))}
                            </Select>
                            {(values.tipopatrimonio) === '3' && (
                                <p>Ao selecionar o tipo de bem como veículo, o mesmo poderá ter controle de quilometragem.</p>
                            )}

                            <Input
                                fullWidth
                                name="valor"
                                label="Valor"
                                isInvalid={errors.valor && touched.valor}
                                value={valorMask(values.valor)}
                                onChange={handleChange}
                            />
                            <input type="date" name="dataaquisicao" onChange={e => setFieldValue('dataaquisicao', e.target.value)} />

                            {JSON.stringify(errors)}
                            <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                            {message && <p className={messageTipo === 'success' ? 'text-green-500' : 'text-red-500'}>{message}</p>}
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
