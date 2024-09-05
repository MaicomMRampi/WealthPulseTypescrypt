"use client"
import React, { useEffect, useState } from "react";
import { Formik } from 'formik';
import { valorMask } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import { initialValues, validationSchema } from "./patrimonioForm";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import useToken from "@/components/hooks/useToken";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { Alert } from "@mui/material";
import { useRouter } from 'next/navigation';


import ModalNovaInstituicao from "@/components/ModalNovaInstituicao";
import ModalNovoNome from '@/components/ModalNovoNome';
export default function App({ tipoInvestimento }: any) {
    const router = useRouter()
    const [messageBanco, setMessageBanco] = useState<string>()
    const [messageBancoTipo, setMessageBancoTipo] = useState<string>()
    const [banco, setBanco] = useState([])
    const { tokenUsuario } = useToken()
    const [messageTipoAlert, setmessageTipoAlert] = useState<string>()
    const [messageResposta, setMessageResposta] = useState<string>()
    const [modalOpenBanco, setModalOpenBanco] = useState<boolean>(false);
    const [modalNovoNome, setModalNovoNome] = useState<boolean>(false);
    const [dadosNomeFundo, setDadosNomeFundo] = useState([]);
    const buscaBanco = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get('/buscabanco', {
                params: {
                    id: tokenUsuario?.id,
                }
            })
            setBanco(response.data)

        }
        catch (error) {
        }
    }

    const buscarNome = async () => {
        try {
            const response = await api.get(`/buscanomefundonovo`, {
                params: {
                    id: tokenUsuario?.id,
                }
            })
            setDadosNomeFundo(response.data)
        } catch (error) {
            console.error('Erro ao buscar nome:', error);
        }
    }

    useEffect(() => {
        buscaBanco()
        buscarNome()
    }, [])

    const handleSubmit = async (values: any) => {
        const valorParaBack = {
            ...values,
            tipoInvestimento: tipoInvestimento,
        }
        const response = await api.post('/novoinvestimento', {
            dados: valorParaBack,
            token: tokenUsuario?.id,
        });

        if (response.status === 200) {

            setMessageResposta('Investimento Cadastrado com Sucesso');
            setmessageTipoAlert('success');
        } else {
            setMessageResposta('Erro ao Cadastrar Investimento');
            setmessageTipoAlert('error');
        }
        setTimeout(() => {
            router.push('/pages/investimentos/listainvestimento')
            setMessageResposta('');
            setmessageTipoAlert('');

        }, 2000);

    };

    const handleSubmitModalBanco = async (values: any) => {
        try {
            const response = await api.post(`/banco`, {
                values,
                token: tokenUsuario?.id,
            })

            if (response.status === 200) {
                setmessageTipoAlert("success")
                buscaBanco()
                setMessageResposta(response.data.message)
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenBanco(false)
                }, 2000)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // O banco já está cadastrado
                setmessageTipoAlert("error")
                setMessageResposta(error.response.data.message)
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenBanco(false)
                }, 2000)
            } else {
                // Outro erro inesperado
                console.error('Erro ao tentar cadastrar banco:', error);
                setmessageTipoAlert("error")
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenBanco(false)
                }, 2000)
                setMessageResposta("Erro ao tentar cadastrar banco. Por favor, tente novamente mais tarde.")
            }
        }
    }
    const opemModalInstituicao = () => {
        setModalOpenBanco(true);
    }

    const handleSubmitNome = async (values: any) => {
        const nomefundo = values.nomefundo
        try {
            const response = await api.post(`/novonome`, {
                nomefundo,
                id: tokenUsuario?.id
            })
            if (response.status === 200) {
                setMessageBancoTipo("success")
                buscarNome()
                setMessageBanco(response.data.message)
                setTimeout(() => {
                    setMessageBanco("")
                    setModalNovoNome(false)
                }, 2000)
            } else {
                setMessageBanco("Nome Já cadastrado ")
                setTimeout(() => {
                    setMessageBanco("")
                    setModalNovoNome(false)
                }, 2000)
            }
        } catch (error) {
            setMessageBancoTipo("error")
            setMessageBanco('Nome já existe.')
            console.error('Erro salvar nome:', error);
            buscarNome()
            setTimeout(() => {
                setMessageBanco("")
                setModalNovoNome(false)
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
                    isSubmitting,
                    setFieldValue,
                    touched,
                }: any) => (
                    <form className="w-full gap-4 flex flex-col" onSubmit={handleSubmit}>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                            <Select
                                fullWidth
                                name="nome"
                                label="Nome do Fundo"
                                autoComplete="off"
                                isInvalid={touched.nome && !!errors.nome}
                                value={values.nome}
                                onChange={handleChange}
                            >
                                {dadosNomeFundo && dadosNomeFundo.map((item: any) => (
                                    <SelectItem value={item.nomeFundo} key={item.nomeFundo}>
                                        {item.nomeFundo}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input
                                fullWidth
                                name="quantidade"
                                autoComplete="off"
                                isInvalid={touched.quantidade && !!errors.quantidade}
                                type="number"
                                label="Quantidade de Cotas"
                                value={values.quantidadeCotas}
                                onChange={handleChange}
                            />
                            <Select
                                name="instituicao"
                                fullWidth
                                value={values.instituicao}
                                label="Instituição Financeira"
                                onChange={handleChange}
                                isInvalid={touched.instituicao && !!errors.instituicao}
                            >

                                {banco.map((item: any) => (
                                    <SelectItem value={item.nomeBanco} key={item.nomeBanco}>
                                        {item.nomeBanco}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Input
                                fullWidth
                                name="valorPago"
                                label="Preço de Compra por Cota"
                                value={values.valorPago}
                                isInvalid={errors.valorPago && touched.valorPago}
                                onBlur={handleChange}
                                onChange={(event) => {
                                    const { name, value } = event.target;
                                    if (name === 'valorPago') {
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
                                    isInvalid={touched.dataCompra && !!errors.dataCompra}
                                    hideTimeZone
                                    label="Data da Compra"
                                    onChange={(val) => setFieldValue("dataCompra", val)}
                                    defaultValue={today(getLocalTimeZone())}
                                />
                            </I18nProvider>
                        </div>
                        <Button fullWidth className="bg-buttonAzulEscuro text-white" onClick={() => setModalNovoNome(true)}>Novo nome Fii</Button>
                        <Button fullWidth className="bg-buttonAzulClaro text-white" onClick={() => opemModalInstituicao()}>Nova Instituição</Button>
                        <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                        {messageResposta && <Alert severity={messageTipoAlert as 'success' | 'info' | 'warning' | 'error'}>{messageResposta}</Alert>}
                    </form>


                )}
            </Formik>
            <ModalNovaInstituicao
                open={modalOpenBanco}
                onClose={() => setModalOpenBanco(false)}
                onSubmit={handleSubmitModalBanco}
                message={messageResposta}
                messageTipo={messageTipoAlert}
            />
            <ModalNovoNome
                message={messageBanco}
                messageTipo={messageBancoTipo}
                onSubmit={handleSubmitNome}
                open={modalNovoNome}
                onClose={() => setModalNovoNome(false)}
            />
        </>
    );
}
