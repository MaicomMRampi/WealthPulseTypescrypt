"use client"
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react'
import React from 'react'
import { useEffect, useState } from 'react'
import FormadePagamentoNova from '@/components/despesaComponents/ModalFormaPagamento'
import ModalNovaCategoria from '@/components/despesaComponents/ModalNovaCategoria'
import { initialValues, validationSchema } from './investimentForm'
import LayoutAdmin from '@/components/LayoutAdmin'
import { Formik } from 'formik'
import ButtonVoltar from '@/components/ButtonVoltar'
import { valorMask } from '@/components/Mask'

export default function NovaDespesa() {
    const [modalOpen, setModalOpen] = useState(false);
    const [ModalOpenForm, setModalOpenForm] = useState(false);
    const [message, setMessage] = useState<String>()
    const [messageDespesa, setMessageDespesa] = useState<String>()
    const [messageForm, setMessageForm] = useState()
    const [categoria, setCategoria] = useState()
    const [formaPagamento, setformaPagamento] = useState()
    const [messageTipo, setMessageTipo] = useState<String>()

    // ====================Chama valores do Back end===
    const buscaCategoria = async () => {
        // if (!emailUser) return
        // const response = await api.get(`/buscacategoria`)
        // setCategoria(response.data)
    }
    // useEffect(() => {
    //     buscaCategoria()
    // }, [emailUser])

    const buscaFormaPagamento = async () => {
        // if (!emailUser) return
        // const response = await api.get(`/buscaformapagamento`)
        // setformaPagamento(response.data)
    }
    // useEffect(() => {
    //     buscaFormaPagamento()
    // }, [emailUser])
    // =================================================


    // ====================Manda os Valores para o Backend=================================
    const handleSubmit = async (values, { resetForm }: any) => {

        // try {
        //     const response = await api.post(`/novadespesa`, {
        //         values,
        //         emailUser
        //     })

        //     setMessageDespesa(response.data.message)

        //     if (response.status === 200) {
        //         setMessageTipo("success")
        //         setMessageDespesa(response.data.message)
        //         setTimeout(() => {
        //             setMessageDespesa("")
        //         }, 4000)
        //         // buscaCategoria()
        //     } else {
        //         setMessageDespesa("Erro ao Cadastrar Gasto")
        //     }
        // } catch (error) {
        //     setMessageTipo("error")
        // }

    }

    const handleModalSubmit = async (categoria) => {
        try {
            const response = await api.post(`/novacategoria`, {
                categoria
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
                            <h4 className="text-2xl text-center py-5">
                                Insira uma nova despesa
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                                <Input
                                    className=""
                                    isInvalid={touched.responsavel && errors.responsavel ? true : false}
                                    errorMessage={touched.responsavel && errors.responsavel ? errors.responsavel : undefined}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Comprador"
                                    name="responsavel"
                                    autoComplete="responsavel"
                                />

                                <Input
                                    onChange={handleChange}
                                    fullWidth
                                    label="Pagante"
                                    name="pagante"
                                    autoComplete="pagante"

                                />
                                <div>
                                    <input
                                        value={values.mescorrespondente}
                                        placeholder={errors.mescorrespondente ? "Mês Correspondente da Fatura (Erro)" : "Mês Correspondente da Fatura"}
                                        className={`w-full rounded-xl h-[54px] placeholder-red-500 text-gray-700 ${errors.mescorrespondente ? "bg-red-100" : ""}`}
                                        type="month"
                                        name="mescorrespondente"
                                        onChange={handleChange}
                                    />
                                    {errors.mescorrespondente ? <p className="text-red-500 text-xs pt-1">{errors.mescorrespondente}</p> : null}
                                </div>

                                <Select
                                    label="Categoria"
                                    fullWidth
                                    name="categoria"

                                    onChange={handleChange}
                                    value={values.categoria}
                                    errorMessage={touched.categoria && errors.categoria ? errors.categoria : undefined}
                                    isInvalid={touched.categoria && errors.categoria ? true : false}
                                >
                                    {categoria && categoria.map((row) => (
                                        <SelectItem

                                            classNames={{

                                                wrapper: "w-full sm:max-w-[44%]  rounded-lg bg-default-100 text-default-400",
                                            }}
                                            value={row.nomeCategoria} key={row.id}

                                        >
                                            {row.nomeCategoria}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    label="Forma de Pagamento"
                                    fullWidth
                                    name="formadepagamento"

                                    onChange={handleChange}
                                    value={values.formadepagamento}
                                    errorMessage={touched.formadepagamento && errors.formadepagamento ? errors.formadepagamento : undefined}
                                    isInvalid={touched.formadepagamento && errors.formadepagamento ? true : false}
                                >
                                    {formaPagamento && formaPagamento.map((row) => (
                                        <SelectItem
                                            classNames={{
                                                wrapper: "w-full sm:max-w-[44%]  rounded-lg bg-default-100 text-default-400",
                                            }}
                                            value={row.nomeFormaPagamento} key={row.id}>
                                            {row.nomeFormaPagamento}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Input
                                    fullWidth
                                    isInvalid={errors && errors.valorgasto ? true : false}
                                    label="Valor Gasto"
                                    name="valorgasto"
                                    autoComplete="valorgasto"
                                    value={values.valorgasto}
                                    onBlur={handleChange}
                                    errorMessage={touched.valorgasto && errors.valorgasto ? errors.valorgasto : undefined}
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
                            <div className="pt-3">
                                <h1 className="text-center" >

                                    {
                                        !messageDespesa ? null : <Alert color={messageTipo}>{messageDespesa}</Alert>
                                    }
                                </h1>
                            </div>
                            <div className="w-full grid-cols-12 md:grid-cols-3 flex flex-col gap-4 md:flex-row">
                                <Button
                                    type="submit"
                                    fullWidth
                                    color="success"
                                >
                                    Salvar
                                </Button>
                                <Button color="warning" fullWidth onClick={() => opemModalCategoria()} >Nova Categoria</Button>
                                <Button className="bg-blue-400 text-white" fullWidth onClick={() => opemModalCategoriaForma()} >Nova Forma de Pagamento</Button>
                                <ButtonVoltar className="md:w-full bg-slate-100" />
                            </div>
                            <FormadePagamentoNova
                                messagemTipo={messageTipo}
                                message={messageForm}
                                // onSubmit={handleModalSubmitPagamento}
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
