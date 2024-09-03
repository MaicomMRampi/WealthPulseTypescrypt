"use client"
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { I18nProvider } from '@react-aria/i18n';
import { DatePicker } from "@nextui-org/date-picker";
import { Formik } from 'formik';
import { initialValues, validationSchema } from "./acoesForm";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import ButtonEnviarDadosPadrao from '@/components/ButtonEnviarDadosPadrao';
import { valorMask } from '@/components/Mask';
import { api } from '@/lib/api';
import ModalNovaInstituicao from "@/components/ModalNovaInstituicao";
import ModalNovaAcao from "./ModalNovaAção";
import useToken from '@/components/hooks/useToken';
import { Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
export default function Acoes({ tipoInvestimento }: any) {
    const [messageTipoAlert, setmessageTipoAlert] = useState<string>()
    const [messageResposta, setMessageResposta] = useState<string>()
    const [modalOpenBanco, setModalOpenBanco] = useState<boolean>(false);
    const [modalOpenAcao, setModalOpenAcao] = useState<boolean>(false);
    const [dados, setDados] = useState([])
    const [banco, setBanco] = useState([])
    const router = useRouter()
    const { tokenUsuario } = useToken()

    const buscaAcoes = async () => {
        if (!tokenUsuario) return
        try {
            const response = await api.get('/buscanomeacao', {
                params: {
                    id: tokenUsuario?.id,
                }
            })
            setDados(response.data)

        }
        catch (error) {
        }
    }
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

    useEffect(() => {
        buscaAcoes()
        buscaBanco()
    }, [])



    // =====================MODAIS============

    const opemModalInstituicao = () => {
        setModalOpenBanco(true);
    }
    const opemModalAcao = () => {
        setModalOpenAcao(true);
    }
    // =======================================


    // =============MANDA VALORES AO BACK=================
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
    const handleSubmitModalAcoes = async (values: any) => {
        try {
            const response = await api.post(`/novonomeacao`, {
                values,
                token: tokenUsuario?.id,
            })

            if (response.status === 200) {
                setmessageTipoAlert("success")
                buscaAcoes()
                setMessageResposta(response.data.message)
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenAcao(false)
                }, 2000)
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                // O banco já está cadastrado
                setmessageTipoAlert("error")
                setMessageResposta(error.response.data.message)
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenAcao(false)
                }, 2000)
            } else {
                // Outro erro inesperado
                console.error('Erro ao tentar cadastrar banco:', error);
                setmessageTipoAlert("error")
                setTimeout(() => {
                    setMessageResposta("")
                    setModalOpenAcao(false)
                }, 2000)
                setMessageResposta("Erro ao tentar cadastrar banco. Por favor, tente novamente mais tarde.")
            }
        }
    }

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
    // ===============================================

    return (
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
                <form className='w-full gap-4 flex flex-col' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        <Select
                            name="nome"
                            fullWidth
                            label="Nome da Ação"
                            onChange={handleChange}
                            value={values.nome}
                            isInvalid={touched.nome && !!errors.nome}
                        >
                            {/* Supondo que você tenha uma lista de ações */}
                            {dados.map((item: any) => (
                                <SelectItem value={item.nomeAcao} key={item.nomeAcao}>
                                    {item.nomeAcao}
                                </SelectItem>
                            ))}
                        </Select>
                        <Select
                            name="instituicao"
                            fullWidth
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
                            isInvalid={touched.quantidade && !!errors.quantidade}
                            name="quantidade"
                            label="Quantidade de Ações"
                            value={values.quantidade}
                            autoComplete='off'
                            type='number'
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            isInvalid={touched.precoCompra && !!errors.precoCompra}
                            name="precoCompra"
                            label="Preço de Compra por Ação"
                            value={values.precoCompra}
                            onBlur={handleChange}
                            onChange={(event) => {
                                const { name, value } = event.target;
                                if (name === 'precoCompra') {
                                    const maskedValue = valorMask(value);
                                    setFieldValue(name, maskedValue);
                                } else {
                                    setFieldValue(name, value);
                                }
                            }}
                            startContent={<span className="text-white text-small">R$</span>}
                        />
                        <I18nProvider locale="pt-BR">
                            <DatePicker
                                isInvalid={touched.dataCompra && !!errors.dataCompra}
                                name="dataCompra"
                                label="Data da Compra"
                                onChange={(val) => setFieldValue("dataCompra", val)}
                                hideTimeZone
                                defaultValue={today(getLocalTimeZone())}
                            />
                        </I18nProvider>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <Button className="bg-buttonCinzaPadrao text-black" fullWidth onClick={() => opemModalAcao()}>Nova Ação</Button>
                        <Button fullWidth className="bg-buttonAzulClaro text-white" onClick={() => opemModalInstituicao()}>Nova Instituição</Button>
                    </div>
                    <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                    {messageResposta && <Alert severity={messageTipoAlert as any}>{messageResposta}</Alert>}
                    <ModalNovaInstituicao
                        open={modalOpenBanco}
                        onClose={() => setModalOpenBanco(false)}
                        onSubmit={handleSubmitModalBanco}
                        message={messageResposta}
                        messageTipo={messageTipoAlert}
                    />
                    <ModalNovaAcao
                        open={modalOpenAcao}
                        onClose={() => setModalOpenAcao(false)}
                        onSubmit={handleSubmitModalAcoes}
                        message={messageResposta}
                        messageTipo={messageTipoAlert}
                    />
                </form>

            )}
        </Formik>

    )
}
