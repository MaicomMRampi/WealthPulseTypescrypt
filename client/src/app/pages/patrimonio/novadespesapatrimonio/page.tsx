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
import ButtonVoltar from "@/components/ButtonVoltar";
import Link from "next/link";
import TitlePage from "@/components/tituloPaginas";
import { useRouter } from "next/navigation";


export default function App() {
    const [openModal, setOpenModal] = useState(false);
    const [dados, setDados] = useState([]);
    const [dadosDespesas, setDadosDespesas] = useState([]);
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');
    const [messageDespesa, setMessageDespesa] = useState('');
    const [messageTipoDespesa, setMessageTipoDespesa] = useState('');
    const [open, setOpen] = useState(false);
    const [tipobem, setTipoBem] = useState<any>([]);
    const { tokenUsuario } = useToken()
    const router = useRouter()


    const buscaPatrimonios = async () => {
        try {
            const response = await api.get(`/buscabem`, {
                params: {
                    id: tokenUsuario?.id
                }
            });
            setDados(response.data);
        } catch (error) {
            console.error("🚀 ~ buscaPatrimonios ~ error", error);

        }
    };
    const buscaTipoDespesa = async () => {
        try {
            const response = await api.get(`/buscatipodespesa`, {
                params: {
                    id: tokenUsuario?.id
                }
            });
            setDadosDespesas(response.data);
        } catch (error) {
            console.error("🚀 ~ buscaPatrimonios ~ error", error);

        }
    };

    useEffect(() => {
        buscaPatrimonios();
        buscaTipoDespesa();
    }, []);

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
                router.push('/pages/patrimonio/listapatrimonio')

            }, 2000)
        }

    }



    const novoTipoDespesa = async (value: object) => {
        try {
            const response = await api.post(`/novotipodespesa`, {
                value,
                id: tokenUsuario?.id
            });
            if (response.status === 200) {
                setMessageTipoDespesa('success')
                setMessageDespesa('Tipo de Despesa Cadastrado com Sucesso')
                setTimeout(() => {
                    setMessageTipoDespesa('')
                    setMessageDespesa('')
                    setOpenModal(false)
                    buscaTipoDespesa()
                }, 2000)
            }
        } catch (error) {
            setMessageTipoDespesa('error')
            setMessageDespesa('Erro ao Cadastrar Tipo de Despesa')
            setTimeout(() => {
                setMessageTipoDespesa('')
                setMessageDespesa('')
                setOpenModal(false)
            }, 2000)
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
                            <TitlePage title="Despesa de Bem" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Select
                                    name='nomepatrimonio'
                                    value={values.nomepatrimonio}
                                    fullWidth
                                    isInvalid={touched.nomepatrimonio && Boolean(errors.nomepatrimonio)}
                                    label="Patrimônio"
                                    onChange={handleChange}
                                >
                                    {dados.length > 0 ? (
                                        dados.map((item: any) => (
                                            <MenuItem
                                                onClick={() => setTipoBem(item)}
                                                value={item.id} // Certifique-se de que está usando o valor correto aqui
                                                key={item.id}
                                            >
                                                {item.nomePatrimonio}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem>Nenhum Patrimônio Cadastrado</MenuItem>
                                    )}

                                </Select>

                                <Select
                                    value={values.tipodespesa}
                                    isInvalid={touched.tipodespesa && Boolean(errors.tipodespesa)}
                                    label="Tipo de Despesa"
                                    name='tipodespesa'
                                    fullWidth
                                    onChange={handleChange}

                                >
                                    {dadosDespesas.map((item: any) => (
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
                                <Input
                                    fullWidth
                                    label="Valor Gasto"
                                    isInvalid={touched.valorgasto && Boolean(errors.valorgasto)}
                                    name="valorgasto"
                                    value={values.valorgasto}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-white text-small">R$</span>
                                        </div>
                                    }
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
                                        isInvalid={touched.dataaquisicao && Boolean(errors.dataaquisicao)}
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
                                <Button className="p-6 bg-buttonAzulClaro text-white " onClick={() => setOpenModal(true)} color="warning">
                                    Novo tipo de despesa e/ou investimento
                                </Button>
                                <Button className="bg-buttonAzulEscuro text-white" size="lg">
                                    <Link href={'/pages/patrimonio/novadespesapatrimonio'}>Novo Patrimônio</Link>
                                </Button>
                                <ButtonVoltar
                                    tamanho={false}
                                />
                            </div>

                        </div>
                        {message ?
                            (

                                <Alert
                                    onClose={() => setOpen(false)}
                                    severity="success"
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {message}
                                </Alert>

                            ) : null}
                    </form>
                )}
            </Formik >
            <ModalAddTipoDespesa
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={novoTipoDespesa}
                message={messageDespesa}
                messageTipo={messageTipoDespesa}
            />
        </>
    );
}
