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

    const titulos = [
        {
            tipo: 'Tesouro Direto',
            nome: 'Tesouro Selic 2024',
            vencimento: '2024-07-01',
            taxaJuros: 'Selic + 0.10%',
            valorMinimo: 1000,
        },
        {
            tipo: 'CDB',
            nome: 'CDB Banco XYZ',
            vencimento: '2026-12-31',
            taxaJuros: '120% do CDI',
            valorMinimo: 5000,
        },
        {
            tipo: 'LCI',
            nome: 'LCI Banco ABC',
            vencimento: '2025-09-30',
            taxaJuros: '95% do CDI',
            valorMinimo: 3000,
        },
        {
            tipo: 'LCA',
            nome: 'LCA Banco DEF',
            vencimento: '2027-01-15',
            taxaJuros: '100% do CDI',
            valorMinimo: 2000,
        },
        {
            tipo: 'Debênture',
            nome: 'Debênture XYZ 2028',
            vencimento: '2028-05-20',
            taxaJuros: 'IPCA + 5.5%',
            valorMinimo: 10000,
        },
    ];


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
                            name="nomeCripto"
                            label="Nome da Criptomoeda"
                            value={values.nomeCripto}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            name="quantidadeCripto"
                            label="Quantidade"
                            value={values.quantidadeCripto}
                            onChange={handleChange}
                        />
                        <Input
                            fullWidth
                            name="precoCompra"
                            label="Preço de Compra"
                            value={values.precoCompra}
                            onChange={handleChange}
                            startContent={<span className="text-white text-small">R$</span>}
                        />
                        <I18nProvider locale="pt-BR">
                            <DatePicker
                                name="dataCompra"
                                label="Data da Compra"
                                onChange={(val) => setFieldValue("dataCompra", val)}
                            />
                        </I18nProvider>
                        <ButtonEnviarDadosPadrao />
                    </form>
                )}
            </Formik>
        </>
    );
}
