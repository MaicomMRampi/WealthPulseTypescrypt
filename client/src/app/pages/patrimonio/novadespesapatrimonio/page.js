"use client"
import React, { useEffect, useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, ThemeProvider, Tooltip, Typography, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { valorMask, formatarNumero } from "@/components/Mask";
import { useSession } from "next-auth/react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Button } from "@nextui-org/react";
import ModalAddTipoDespesa from "@/components/ModalAddTipoDespesa";
import InputAdornment from '@mui/material/InputAdornment';
const Theme = createTheme({
    palette: {
        primary: {
            main: '#2a9d8f',
            backgroundColor: '#2a9d8f',
        },
        secondary: {
            main: '#ef476f',
        },
        background: {
            default: '#f9f9f9',
        },

        borderColor: '#2a9d8f',
    }

})


const initialValues = {
    nomepatrimonio: '',
    tipodespesa: '',
    valorgasto: '',
    dataaquisicao: null,
};

const validationSchema = Yup.object().shape({
    nomepatrimonio: Yup.object().required('Patrimônio é obrigatório'),
    tipodespesa: Yup.string().required('Tipo é obrigatório'),
    valorgasto: Yup.string().required('Valor é obrigatório'),
    dataaquisicao: Yup.date().required('Data é obrigatório'),
});



export default function App() {
    const [openModal, setOpenModal] = useState(false);
    const [dados, setDados] = useState([]);
    const [dadosDespesas, setDadosDespesas] = useState([]);
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');
    const [messageDespesa, setMessageDespesa] = useState('');
    const [messageTipoDespesa, setMessageTipoDespesa] = useState('');
    const { data: session, status } = useSession();
    const email = session?.user?.email;
    const [open, setOpen] = useState(false);
    const [tipobem, setTipoBem] = useState([]);
    console.log("🚀 ~ App ~ tipobem", tipobem)

    const buscaPatrimonios = async (email) => {
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
    const buscaTipoDespesa = async (email) => {
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

    const handleSubmit = async (values) => {
        const response = await api.post(`/despesadeconsumo`, {
            values,
            email
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



    const novoTipoDespesa = async (value) => {
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
            <LayoutAdmin>
                <ThemeProvider theme={Theme}>
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
                                        <FormControl sx={{
                                            width: '100%'
                                        }}>
                                            <InputLabel id="demo-simple-select-helper-label">Bem a Inserir Despesa</InputLabel>
                                            <Select
                                                value={values.nomepatrimonio}
                                                name='nomepatrimonio'
                                                fullWidth
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Patrimônio"
                                                variant="outlined"
                                                onChange={handleChange}
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                    borderRadius: '10px'
                                                }}
                                            // error={true}

                                            >
                                                {dados.map(item => (
                                                    <MenuItem
                                                        onClick={() => setTipoBem(item.tipoPatrimonio)} value={item} key={item._id}>
                                                        {item.nomePatrimonio}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl sx={{
                                            width: '100%'
                                        }}>
                                            <InputLabel id="demo-simple-select-helper-label">Tipo Despesa</InputLabel>
                                            <Select
                                                inputProps={{ 'aria-label': 'Without label', color: 'red' }}
                                                value={values.tipodespesa}
                                                name='tipodespesa'
                                                fullWidth
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                label="Tipo Despesa"
                                                onChange={handleChange}
                                                sx={{
                                                    backgroundColor: '#fff',
                                                    color: '#000',
                                                    borderRadius: '10px'
                                                }}
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
                                        </FormControl>
                                        {
                                            tipobem == '3' ? (
                                                <>
                                                    <TextField
                                                        fullWidth
                                                        type="string"
                                                        sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                                        name="kmantigo"
                                                        value={values.kmantigo && formatarNumero(values.kmantigo)}
                                                        label="km Antigo"
                                                        variant="outlined"
                                                        onChange={handleChange}

                                                    />
                                                    <TextField
                                                        fullWidth
                                                        sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                                        name="kmatual"
                                                        label="km Atual"
                                                        value={values.kmatual && formatarNumero(values.kmatual)}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                    />
                                                    <TextField
                                                        fullWidth
                                                        sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                                        name="litros"
                                                        label="Litros"
                                                        type="number"
                                                        value={values.litros}
                                                        variant="outlined"
                                                        onChange={handleChange}
                                                    />
                                                </>
                                            )
                                                : (
                                                    null
                                                )
                                        }
                                        {errors.tipopatrimonio && touched.tipopatrimonio && <p className="text-red-500">{errors.tipopatrimonio}</p>}
                                        <TextField
                                            fullWidth
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
                                            mask="R$ ##,##0.00"
                                            inputProps={{
                                                endComponent: <InputAdornment position="start">R$</InputAdornment>,
                                            }}
                                            sx={{
                                                backgroundColor: '#fff',
                                                color: '#000',
                                            }}
                                        />
                                        {
                                            errors && errors.valorgasto ? <Typography color="error" variant="caption" display="block">{errors.valorgasto}</Typography> : null
                                        }
                                        < LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px', width: '100%' }}
                                                name="dataaquisicao"
                                                label="Data da Aquisição"
                                                value={values.dataaquisicao}
                                                onChange={(date) => setFieldValue('dataaquisicao', date)}
                                            />
                                        </LocalizationProvider>
                                        {errors.dataaquisicao && touched.dataaquisicao && <p className="text-red-500">{errors.dataaquisicao}</p>}

                                        <TextField
                                            fullWidth
                                            sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                            name="responsavel"
                                            label="Responsável"
                                            variant="outlined"
                                            value={values.responsavel}
                                            onChange={handleChange}
                                        />
                                        <TextField
                                            fullWidth
                                            sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                            name="compradorpagador"
                                            label="Comprador / pagador"
                                            variant="outlined"
                                            value={values.compradorpagador}
                                            onChange={handleChange}
                                        />
                                        <TextField sx={{ backgroundColor: '#fff', color: '#000', borderRadius: '10px' }}
                                            rows={4}
                                            multiline
                                            fullWidth
                                            label="Observação"
                                            name="observacao"
                                            onChange={handleChange} />
                                    </div>
                                    <div className="flex justify-end gap-4">
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
                    </Formik>
                    <ModalAddTipoDespesa
                        isOpen={openModal}
                        objetoInvestimento={'fds'}
                        onClose={() => setOpenModal(false)}
                        onSubmit={novoTipoDespesa}
                        message={messageDespesa}
                        messageTipo={messageTipoDespesa}
                    />
                </ThemeProvider>
            </LayoutAdmin>
        </>
    );
}
