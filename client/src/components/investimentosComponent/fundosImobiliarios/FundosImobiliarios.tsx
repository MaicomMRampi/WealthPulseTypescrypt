"use client"
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { Formik } from 'formik'
import { initialValues, validationSchema } from './investimentForm'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Button, MenuItem, Select } from "@nextui-org/react";
// import ModalNovoNome from '@/components/ModalNovoNome';
import { Alert } from '@mui/material'
import { valorMask } from "@/components/Mask";

export default function NovoInvestimento() {
    const router = useRouter()
    const [message, setMessage] = useState()
    const [messageTipo, setMessageTipo] = useState()
    const [isOpen, setIsOpen] = useState()
    const [nomefundonovo, setNomefundo] = useState({})
    const [messageBanco, setMessageBanco] = useState()
    const [messageBancoTipo, setMessageBancoTipo] = useState()

    const handleSubmit = async (values: any) => {
        // try {
        //     const response = await api.post(`/postfundo`, {
        //         values,
        //         emailUser

        //     })
        //     setMessage(response.data.message)
        //     const data = response.data.message
        //     if (response.status === 200) {
        //         setMessageTipo("success")
        //         setMessage(response.data.message)
        //         setTimeout(() => {
        //             setMessage("")
        //             router.push('/meusinvestimentos')
        //         }, 4000)

        //     } else {
        //         setMessage("Erro ao Criar Usuário")

        //     }
        // } catch (error) {
        //     setMessageTipo("error")
        //     setMessage(error.response.data.message)
        // }
    }
    const buscarNome = async () => {
        // try {
        //     const response = await api.get(`/buscanomefundonovo`)
        //     setNomefundo(response.data)
        //     console.log("🚀 ~ buscarNome ~ response", response)
        // } catch (error) {
        //     console.error('Erro ao buscar nome:', error);
        // }
    }
    useEffect(() => {
        buscarNome()
    }, [])

    const handleSubmitNome = async (values: string) => {
        // const nomefundo = values.nomefundo
        // try {
        //     const response = await api.post(`/novonome`, {
        //         nomefundo,
        //     })
        //     console.log("🚀 ~ handleSubmitNome ~ response", response)
        //     if (response.status === 200) {
        //         setMessageBancoTipo("success")
        //         buscarNome()
        //         setMessageBanco(response.data.message)
        //         setTimeout(() => {
        //             setMessageBanco("")
        //             setIsOpen(false)
        //             setIsOpen(false)
        //         }, 2000)
        //     }
        // } catch (error) {
        //     setMessageBancoTipo("error")
        //     setMessageBanco('Nome já existe.')
        //     console.error('Erro salvar nome:', error);
        //     buscarNome()
        //     setTimeout(() => {

        //         setMessageBanco("")
        //         setIsOpen(false)
        //     }, 2000)
        // }

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
                        <Container component="main" maxWidth="md">

                            <Box

                            >
                                <Box >
                                    <Typography variant="h5" textAlign='center' sx={{ padding: '3%' }}>Investir em Fundo Imobiliário ?</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Select
                                                name="nomefii"
                                                value={values.nomefii}
                                                placeholder="Nome do Fundo"
                                                onChange={handleChange}
                                            >
                                                {nomefundonovo && nomefundonovo.map((item: any) => (
                                                    <MenuItem key={item.nomefii} value={item.nomefii}>
                                                        {item.nomefii}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {
                                                errors && errors.nomefii ? <Typography color="error" variant="caption" display="block">{errors.nomefii}</Typography> : null
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            {/* <DatePicker
                                                selected={values.vencimentoativo}
                                                onChange={(date) => setFieldValue('datacompra', date)}
                                                placeholder="Data de Compra"
                                                name="datacompra"
                                                max={new Date()}
                                            /> */}
                                            {
                                                errors && errors.datacompra ? <Typography color="error" variant="caption" display="block">{errors.datacompra}</Typography> : null
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Quantidade"
                                                name="quantidade"
                                                onChange={handleChange}
                                                mask="R$ ##,##0.00"
                                                type='Number'

                                            />
                                            {
                                                errors && errors.quantidade ? <Typography color="error" variant="caption" display="block">{errors.quantidade}</Typography> : null
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Valor Pago"
                                                name="valorpago"
                                                value={values.valorpago}
                                                onBlur={handleChange}
                                                onChange={(event) => {
                                                    const { name, value } = event.target;
                                                    if (name === 'valorpago') {
                                                        const maskedValue = valorMask(value);
                                                        setFieldValue(name, maskedValue);
                                                    } else {
                                                        setFieldValue(name, value);
                                                    }
                                                }}

                                                type='text'
                                            />
                                            {
                                                errors && errors.valorpago ? <Typography color="error" variant="caption" display="block">{errors.valorpago}</Typography> : null
                                            }
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                        <DatePicker
                                            selected={values.vencimentoativo}
                                            onChange={(date) => setFieldValue('vencimentoativo', date)}
                                            placeholder="Vencimento do Investimento"
                                            name="vencimentoativo"
                                        />
                                        {
                                            errors && errors.vencimentoativo ? <Typography color="error" variant="caption" display="block">{errors.vencimentoativo}</Typography> : null
                                        }

                                    </Grid> */}

                                    </Grid>
                                    <Box sx={{ mt: 3 }}>
                                        {
                                            !message ? null : <Alert color={messageTipo}>{message}</Alert>
                                        }
                                    </Box>
                                    <div className="grid grid-cols-2  gap-4">
                                        <Button
                                            className="border border-blue-500 text-blue-500"
                                            type="submit"
                                            fullWidth
                                            variant="bordered"
                                        >
                                            Criar Investimento
                                        </Button>
                                        <Button
                                            fullWidth
                                            onClick={() => setIsOpen(true)}
                                            className="border border-blue-500 text-blue-500"
                                            variant="bordered"
                                        >
                                            Novo Nome
                                        </Button>
                                    </div>
                                </Box>
                            </Box>
                        </Container>
                    </form>
                )}
            </Formik >
            {/* <ModalNovoNome
                message={messageBanco}
                messageTipo={messageBancoTipo}
                onSubmit={handleSubmitNome}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            /> */}
        </>
    )
}
