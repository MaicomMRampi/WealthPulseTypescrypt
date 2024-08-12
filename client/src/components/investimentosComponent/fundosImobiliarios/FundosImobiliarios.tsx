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
import TitlePage from "@/components/tituloPaginas";
import { useRouter } from "next/navigation";
import patrimonios from "./tipoPatrimonio";

export default function App() {
    const router = useRouter()
    const { tokenUsuario } = useToken()
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');

    const handleSubmit = async (values: any) => {

        const response = await api.post('/postpatrimonio', {
            dados: values,
            token: tokenUsuario?.id,
        });

        if (response.status === 200) {
            setMessage('Patrimônio Cadastrado com Sucesso');
            setMessageTipo('success');
            setTimeout(() => {
                router.push('/pages/patrimonio/listapatrimonio');

            }, 2000);
        } else {
            setMessage('Erro ao Cadastrar Patrimônio');
            setMessageTipo('error');
        }
        setTimeout(() => {
            setMessage('');
            setMessageTipo('');

        }, 2000);

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
                    <form className="w-full gap-4 flex flex-col" onSubmit={handleSubmit}>

                        <Input
                            fullWidth
                            name="nomeFundo"
                            label="Nome do Fundo"
                            value={values.nomeFundo}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            name="quantidadeCotas"
                            label="Quantidade de Cotas"
                            value={values.quantidadeCotas}
                            onChange={handleChange}
                        />

                        <Input
                            fullWidth
                            name="precoCota"
                            label="Preço de Compra por Cota"
                            value={values.valor}
                            isInvalid={errors.valor && touched.valor}
                            onBlur={handleChange}
                            onChange={(event) => {
                                const { name, value } = event.target;
                                if (name === 'valor') {
                                    const maskedValue = valorMask(value);
                                    setFieldValue(name, maskedValue);
                                } else {
                                    setFieldValue(name, value);
                                }
                            }}
                            startContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-white text-small">R$</span>
                                </div>
                            }
                        />

                        <I18nProvider locale="pt-BR">
                            <DatePicker
                                name="dataCompra"
                                label="Data da Compra"
                                onChange={(val) => setFieldValue("dataCompra", val)}
                            />
                        </I18nProvider>



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
                    </form>
                )}
            </Formik>
        </>
    );
}
