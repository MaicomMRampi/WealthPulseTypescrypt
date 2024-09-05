"use client"
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import React from 'react'
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { useEffect, useState } from 'react'
import FormadePagamentoNova from '@/components/despesaComponents/ModalFormaPagamento'
import ModalNovaCategoria from '@/components/despesaComponents/ModalNovaCategoria'
import { initialValues, validationSchema } from './investimentForm'
import { Formik } from 'formik'
import ButtonVoltar from '@/components/ButtonVoltar'
import { valorMask } from '@/components/Mask'
import { api } from '@/lib/api'
import useToken from '@/components/hooks/useToken'
import { Alert } from '@mui/material'
import TitlePage from '@/components/tituloPaginas'
import useVisibilityCampo from '@/components/hooks/useVisibilityCampos';
import { useRouter } from 'next/navigation';


export default function NovaDespesa() {
    const router = useRouter()
    const { visibilityCampo } = useVisibilityCampo()
    const [modalOpen, setModalOpen] = useState(false);
    const [ModalOpenForm, setModalOpenForm] = useState(false);
    const [message, setMessage] = useState<string>()
    const [messageDespesa, setMessageDespesa] = useState<string>()
    const [messageForm, setMessageForm] = useState<string>()
    const [categoria, setCategoria] = useState<any>()
    const [formaPagamento, setformaPagamento] = useState<any>()
    const [messageTipo, setMessageTipo] = useState<String>()
    const { tokenUsuario } = useToken()
    // ====================Chama valores do Back end===
    const buscaCategoria = async () => {

        const response = await api.get(`/buscacategoria`, {
            params: {
                idUser: tokenUsuario?.id
            }
        })
        setCategoria(response.data)
    }


    const buscaFormaPagamento = async () => {

        const response = await api.get(`/buscaformapagamento`, {
            params: {
                idUser: tokenUsuario?.id
            }
        })
        setformaPagamento(response.data)
    }
    useEffect(() => {
        if (!tokenUsuario) return
        buscaFormaPagamento()
        buscaCategoria()
    }, [])
    // =================================================


    // ====================Manda os Valores para o Backend=================================
    const handleSubmit = async (values: any) => {
        try {
            const response = await api.post(`/novadespesa`, {
                values,
                id: tokenUsuario?.id
            })
            setMessageDespesa(response.data.message)
            if (response.status === 200) {
                setMessageTipo("success")
                setMessageDespesa(response.data.message)
                setTimeout(() => {
                    router.push("/pages/despesas/listadespesa")
                    setMessageDespesa("")
                }, 4000)
                // buscaCategoria()
            } else {
                setMessageDespesa("Erro ao Cadastrar Gasto")
            }
        } catch (error) {
            setMessageTipo("error")
        }
    }

    const handleModalSubmit = async (categoria: any) => {
        try {
            const response = await api.post(`/novacategoria`, {
                categoria,
                idUser: tokenUsuario?.id
            })

            setMessage(response.data.message)

            if (response.status === 200) {
                buscaCategoria()
                setTimeout(() => {
                    setModalOpen(false)
                }, 2000)
                setMessageTipo("success")
                setMessage(response.data.message)
                setTimeout(() => {
                    setMessage("")
                }, 4000)
                buscaCategoria()
            } else {
                setMessageTipo("danger")
                setMessage("Erro ao Cadastrar Categoria")
            }
            opemModalCategoria();
        } catch (error) {
            setMessage("Erro ao Cadastrar Categoria")
            setMessageTipo("danger")
            setTimeout(() => {
                setMessage("")
                setModalOpen(false)

            }, 2000)
        }
    }

    const handleModalSubmitPagamento = async (formaPagamento: any) => {
        try {
            const response = await api.post(`/novaformapagamento`, {
                nome: formaPagamento,
                idUser: tokenUsuario?.id

            })

            const data = response.data.message
            if (response.status === 200) {
                setTimeout(() => {
                    setModalOpenForm(false)
                }, 2000)
                setMessageTipo("success")
                setMessageForm(response.data.message)
                setTimeout(() => {
                    setMessageForm("")
                    setModalOpenForm(false)

                }, 4000)
                buscaFormaPagamento()
            } else {

                setMessageForm("Erro ao Cadastrar Gasto")
            }
        } catch (error) {
            setMessageForm("Erro ao Cadastrar");
            setMessageTipo("error")
            setTimeout(() => {
                setMessageForm("")
                setModalOpenForm(false)
            }, 2000)

        }
    }


    // ============================================================

    // =========================Modais===================================
    const opemModalCategoriaForma = () => {
        setModalOpenForm(true);
    }

    const opemModalCategoria = () => {
        setModalOpen(true);
    }

    // ================================================================


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
                    resetForm
                }) => (
                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                            <TitlePage title="Nova Despesa" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                                <Input
                                    className=""
                                    isInvalid={touched.responsavel && errors.responsavel ? true : false}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Comprador"
                                    name="responsavel"
                                    autoComplete="responsavel"
                                />

                                <Input
                                    onChange={handleChange}
                                    fullWidth
                                    label="Pagador(es)"
                                    name="pagante"
                                    autoComplete="pagante"

                                />
                                <div>
                                    <input
                                        value={values.mescorrespondente}
                                        placeholder={"Mês Correspondente da Fatura"}
                                        className={`w-full rounded-xl h-[54px] 
                                            ${errors.mescorrespondente
                                                ? !visibilityCampo
                                                    ? "bg-[#310413] text-[#f31260]"
                                                    : "bg-[#fee7ef] text-[#f31260]"
                                                : !visibilityCampo
                                                    ? 'bg-[#27272a]'
                                                    : 'bg-[#f4f4f5]'
                                            }`}

                                        type="month"
                                        name="mescorrespondente"
                                        onChange={handleChange}
                                    />
                                </div>
                                <I18nProvider locale="pt-BR">
                                    <DatePicker
                                        name="dataaquisicao"
                                        hideTimeZone
                                        defaultValue={today(getLocalTimeZone())} // Set default value directly
                                        onChange={(val) => setFieldValue("dataaquisicao", val)}
                                        label="Data Despesa"
                                        isInvalid={touched.dataaquisicao && errors.dataaquisicao ? true : false}
                                    />
                                </I18nProvider>

                                <Select
                                    label="Categoria"
                                    fullWidth
                                    name="categoria"
                                    onChange={handleChange}
                                    value={values.categoria}
                                    isInvalid={touched.categoria && errors.categoria ? true : false}
                                >
                                    {categoria && categoria.length > 0 ? (
                                        categoria.map((row: any) => (
                                            <SelectItem
                                                classNames={{
                                                    wrapper: "w-full sm:max-w-[44%] rounded-lg bg-default-100 text-default-400",
                                                }}
                                                value={row.nomeCategoria}
                                                key={row.id}
                                            >
                                                {row.nomeCategoria}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem key={'no-options'} >Nenhuma categoria disponível</SelectItem>
                                    )}
                                </Select>

                                <Select
                                    label="Forma de Pagamento"
                                    fullWidth
                                    name="formadepagamento"
                                    onChange={handleChange}
                                    value={values.formadepagamento}
                                    isInvalid={touched.formadepagamento && errors.formadepagamento ? true : false}
                                >
                                    {formaPagamento && formaPagamento.length > 0 ? (
                                        formaPagamento.map((row: any) => (
                                            <SelectItem
                                                classNames={{
                                                    wrapper: "w-full sm:max-w-[44%] rounded-lg bg-default-100 text-default-400",
                                                }}
                                                value={row.nomeFormaPagamento}
                                                key={row.id}
                                            >
                                                {row.nomeFormaPagamento}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem key="no-options">
                                            Nenhuma forma de pagamento disponível
                                        </SelectItem>
                                    )}
                                </Select>

                                <Input
                                    fullWidth
                                    isInvalid={errors && errors.valorgasto ? true : false}
                                    label="Valor Gasto"
                                    name="valorgasto"
                                    autoComplete="valorgasto"
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
                                <Input
                                    fullWidth
                                    label="local"
                                    name="local"
                                    autoComplete="local"
                                    onChange={handleChange}
                                />


                                <Textarea
                                    label="observacao"
                                    name="observacao"
                                    fullWidth
                                />

                            </div>

                            <div className="w-full grid-cols-12 md:grid-cols-3 flex flex-col gap-4 md:flex-row p-4 ">
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="success"
                                >
                                    Salvar
                                </Button>
                                <Button className="bg-buttonCinzaPadrao text-white" fullWidth onClick={() => opemModalCategoria()} >Nova Categoria</Button>
                                <Button className="bg-buttonAzulClaro text-white" fullWidth onClick={() => opemModalCategoriaForma()} >Nova Forma de Pagamento</Button>
                                <ButtonVoltar className="md:w-full bg-slate-100" />
                            </div>

                            <h1 className='text-center py-5'>{messageDespesa ? <Alert color={messageTipo as "success" | "error" | "warning" | "info"}>{messageDespesa}</Alert> : null} </h1>
                            <FormadePagamentoNova
                                messagemTipo={messageTipo}
                                message={messageForm}
                                onSubmit={handleModalSubmitPagamento}
                                open={ModalOpenForm}
                                onClose={() => setModalOpenForm(false)}
                            />

                            <ModalNovaCategoria
                                messagemTipo={messageTipo}
                                message={message}
                                onSubmit={handleModalSubmit}
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                            />
                        </form>
                    </div>
                )
                }
            </Formik >

        </>
    )
}
