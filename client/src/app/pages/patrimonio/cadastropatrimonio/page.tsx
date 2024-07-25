"use client"
import React, { useState } from "react";
import { Formik } from 'formik';
import { valorMask } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import { initialValues, validationSchema } from "./patrimonioForm";
import { Input, Select, SelectItem } from "@nextui-org/react";
import useToken from "@/components/hooks/useToken";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { Alert } from "@mui/material";


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
                            <h2 className="text-3xl text-center font-bold">Cadastro de Patrimônio</h2>
                            <Input
                                fullWidth
                                name="nome"
                                isInvalid={errors.nome && touched.nome}
                                label="Nome do bem"
                                autoComplete="none"
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
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-white text-small">R$</span>
                                    </div>
                                }
                            />
                            {/* <input type="date" name="dataaquisicao" onChange={e => setFieldValue('dataaquisicao', e.target.value)} /> */}

                            {/* <DatePicker label="Birth date" className="max-w-[284px]" name="dataaquisicao" isRequired defaultValue={values.dataaquisicao} onChange={setFieldValue} /> */}
                            <I18nProvider locale="pt-BR">
                                <DatePicker
                                    name="dataaquisicao"
                                    hideTimeZone
                                    defaultValue={today(getLocalTimeZone())} // Set default value directly
                                    onChange={(val) => setFieldValue("dataaquisicao", val)}
                                    label="Data de Aquisição"
                                />
                            </I18nProvider>
                            <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                            {message ?
                                (
                                    <Alert
                                        severity="success"
                                        variant="filled"

                                    >
                                        {message}
                                    </Alert>

                                ) : null}
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
