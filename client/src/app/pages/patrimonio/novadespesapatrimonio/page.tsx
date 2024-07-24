"use client"
import React, { useEffect, useState } from "react";
import { Formik } from 'formik';

import { Alert } from '@mui/material';
import { valorMask, formatarNumero } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { api } from "@/lib/api";
import { Button, Input, MenuItem, Select, Textarea } from "@nextui-org/react";
import ModalAddTipoDespesa from "@/components/ModalAddTipoDespesa";
import { initialValues, validationSchema } from "./novaDespesaPatrForm";
import useToken from "@/components/hooks/useToken";


export default function App() {
    const [openModal, setOpenModal] = useState(false);
    const [dados, setDados] = useState([]);
    console.log("🚀 ~ App ~ dados", dados)
    const [dadosDespesas, setDadosDespesas] = useState([]);
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');
    const [messageDespesa, setMessageDespesa] = useState('');
    const [messageTipoDespesa, setMessageTipoDespesa] = useState('');
    const [open, setOpen] = useState(false);
    const [tipobem, setTipoBem] = useState([]);
    const { tokenUsuario } = useToken()
    const email = 'MAICOM.MATEUS@YAHOO.COM.BR'


    const buscaPatrimonios = async (email: string) => {
        try {
            const response = await api.get(`/buscabem`, {
                params: {
                    email: email
                }
            });
            setDados(response.data);
            console.log("🚀 ~ buscaPatrimonios ~ response", response);
        } catch (error) {
            console.error("🚀 ~ buscaPatrimonios ~ error", error);

        }
    };
    const buscaTipoDespesa = async (email: string) => {
        try {
            const response = await api.get(`/buscatipodespesa`, {
                params: {
                    email: email
                }
            });
            setDadosDespesas(response.data);
            console.log("🚀 ~ buscaPatrimonios ~ response", response);
        } catch (error) {
            console.error("🚀 ~ buscaPatrimonios ~ error", error);

        }
    };

    useEffect(() => {
        if (email) {
            buscaPatrimonios(email);
            buscaTipoDespesa(email);
        }
    }, [email]);

    const handleSubmit = async (values: object) => {
        const response = await api.post(`/despesadeconsumo`, {
            values,
            id: tokenUsuario?.id
        })
        if (response.status === 200) {
            setMessage('Despesa Cadastrada com Sucesso')
            setOpen(true)
            setTimeout(() => {
                setMessage('')
                setOpen(false)

            }, 2000)
        }

    }



    const novoTipoDespesa = async (value: object) => {
        console.log("🚀 ~ novoTipoDespesa ~ value", value)
        try {
            const response = await api.post(`/novotipodespesa`, {
                value,
                email
            });
            if (response.status === 200) {
                setMessageTipoDespesa('success')
                setMessageDespesa('Tipo de Despesa Cadastrado com Sucesso')
                setTimeout(() => {
                    setMessageTipoDespesa('')
                    setMessageDespesa('')
                    setOpenModal(false)
                    buscaTipoDespesa(email)
                }, 2000)
            }
            console.log("🚀 ~ novoTipoDespesa ~ response", response);
        } catch (error) {
            setMessageTipoDespesa('error')
            setMessageDespesa('Erro ao Cadastrar Tipo de Despesa')
            setTimeout(() => {
                setMessageTipoDespesa('')
                setMessageDespesa('')
                setOpenModal(false)
            }, 2000)
            console.error("🚀 ~ novoTipoDespesa ~ error", error);
        }
    }



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
                    setFieldValue,
                    touched,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="w-[90%] mx-auto">
                            <h2 className="text-3xl text-center font-bold py-8">Despesa de Bem</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    name='nomepatrimonio'
                                    value={values.nomepatrimonio}
                                    fullWidth
                                    isInvalid={touched.nomepatrimonio && Boolean(errors.nomepatrimonio)}
                                    label="Patrimônio"
                                    onChange={handleChange}
                                >
                                    {dados.map(item => (
                                        <MenuItem

                                            onClick={() => setTipoBem(item)} value={item} key={item.id}>
                                            {item.nomePatrimonio}
                                        </MenuItem>
                                    ))}
                                </Select>

                                <Select
                                    value={values.tipodespesa}
                                    isInvalid={touched.tipodespesa && Boolean(errors.tipodespesa)}
                                    label="Tipo de Despesa"
                                    name='tipodespesa'
                                    fullWidth
                                    onChange={handleChange}

                                >
                                    {dadosDespesas.map(item => (
                                        <MenuItem onClick={() => {
                                            values.kmatual = '';
                                            values.kmantigo = '';
                                        }} value={item.nomeDespesa} key={item.id}>
                                            {item.nomeDespesa}
                                        </MenuItem>
                                    ))}
                                </Select>

                                {
                                    tipobem == '3' ? (
                                        <>
                                            <Input
                                                fullWidth
                                                name="kmantigo"
                                                value={values.kmantigo && formatarNumero(values.kmantigo)}
                                                label="km Antigo"
                                                onChange={handleChange}

                                            />
                                            <Input
                                                fullWidth
                                                name="kmatual"
                                                label="km Atual"
                                                value={values.kmatual && formatarNumero(values.kmatual)}
                                                onChange={handleChange}
                                            />
                                            <Input
                                                fullWidth
                                                name="litros"
                                                label="Litros"
                                                type="number"
                                                value={values.litros}
                                                onChange={handleChange}
                                            />
                                        </>
                                    )
                                        : (
                                            null
                                        )
                                }
                                {errors.tipopatrimonio && touched.tipopatrimonio && <p className="text-red-500">{errors.tipopatrimonio}</p>}
                                <Input
                                    fullWidth
                                    label="Valor Gasto"
                                    isInvalid={touched.valorgasto && Boolean(errors.valorgasto)}
                                    name="valorgasto"
                                    value={values.valorgasto}
                                    onBlur={handleChange}
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        if (name === 'valorgasto') {
                                            const maskedValue = valorMask(value);
                                            setFieldValue(name, maskedValue);
                                        } else {
                                            setFieldValue(name, value);
                                        }
                                    }}
                                />
                                <I18nProvider locale="pt-BR">
                                    <DatePicker
                                        name="dataaquisicao"
                                        hideTimeZone
                                        defaultValue={today(getLocalTimeZone())} // Set default value directly
                                        onChange={(val) => setFieldValue("dataaquisicao", val)}
                                        maxValue={today(getLocalTimeZone())}
                                        label="Data de Aquisição"
                                    />
                                </I18nProvider>
                                <Input
                                    fullWidth
                                    name="responsavel"
                                    label="Responsável da Aquisição"
                                    value={values.responsavel}
                                    onChange={handleChange}
                                />
                                <Input
                                    fullWidth
                                    name="compradorpagador"
                                    label="Pagador da Despesa"
                                    value={values.compradorpagador}
                                    onChange={handleChange}
                                />
                                <Textarea
                                    fullWidth
                                    label="Observação"
                                    name="observacao"
                                    onChange={handleChange} />
                            </div>
                            <div className="flex justify-end gap-4 py-6">
                                <ButtonEnviarDadosPadrao
                                    onSubmit={handleSubmit}
                                />
                                <Button className="p-6" onClick={() => setOpenModal(true)} color="warning">
                                    Novo tipo de despesa e/ou investimento
                                </Button>
                            </div>

                        </div>
                        {message ?
                            (
                                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                                    <Alert
                                        onClose={() => setOpen(false)}
                                        severity="success"
                                        variant="filled"
                                        sx={{ width: '100%' }}
                                    >
                                        {message}
                                    </Alert>
                                </Snackbar>
                            ) : null}
                    </form>
                )}
            </Formik >
            <ModalAddTipoDespesa
                isOpen={openModal}
                objetoInvestimento={'fds'}
                onClose={() => setOpenModal(false)}
                onSubmit={novoTipoDespesa}
                message={messageDespesa}
                messageTipo={messageTipoDespesa}
            />
        </>
    );
}
