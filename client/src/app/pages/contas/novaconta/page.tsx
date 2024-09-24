"use client"
import React, { useState } from "react";
import { Formik } from 'formik';
import { valorMask } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import { initialValues, validationSchema } from "./novaContaForm";
import { Checkbox, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import useToken from "@/components/hooks/useToken";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { Alert } from "@mui/material";
import TitlePage from "@/components/tituloPaginas";
import { useRouter } from "next/navigation";
import formatarParaBackend from "@/components/funcoes/formataValorParaBack";
import formatarParaReais from "@/components/funcoes/valorParaReaisInput";

export default function NovaConta() {
    const router = useRouter();
    const { tokenUsuario } = useToken();
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = (setFieldValue: any) => {
        setIsSelected(!isSelected);
        if (isSelected) {
            setFieldValue("qtdparcelas", "");
        }
    };

    const handleSubmit = async (values: any) => {
        const response = await api.post('/novaconta', {
            dados: values,
            idUsuario: tokenUsuario?.id,
        });

        if (response.status === 200) {
            setMessage('Conta Cadastrado com Sucesso');
            setMessageTipo('success');
            setTimeout(() => {
                router.push('/pages/contas/listaconta');
            }, 2000);
        } else {
            setMessage('Erro ao Cadastrar Conta');
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
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="pt-8 flex flex-col gap-3 md:w-[60%] xs:w-full px-4 mx-auto">
                            <TitlePage title="Cadastro de Conta" />
                            <Input
                                fullWidth
                                name="estabelecimento"
                                label="Estabelecimento"
                                isInvalid={!!errors.estabelecimento && touched.estabelecimento}
                                autoComplete="off"
                                value={values.estabelecimento}
                                onChange={handleChange}
                            />
                            <Input
                                fullWidth
                                name="comprador"
                                label="Comprador"
                                isInvalid={!!errors.comprador && touched.comprador}
                                autoComplete="off"
                                value={values.comprador}
                                onChange={handleChange}
                            />
                            <Input
                                fullWidth
                                name="pagador"
                                label="Pagador(es)"
                                autoComplete="off"
                                value={values.pagador}
                                onChange={handleChange}
                            />

                            <Input
                                fullWidth
                                name="valor"
                                label="Valor Total Compra"
                                value={values.valor}
                                autoComplete="off"
                                isInvalid={!!errors.valor && touched.valor}
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
                                    name="datavencimento"
                                    isInvalid={!!errors.datavencimento && touched.datavencimento}
                                    hideTimeZone
                                    onChange={(val) => setFieldValue("datavencimento", val)}
                                    label="1° Vencimento"
                                />
                            </I18nProvider>
                            <div className="flex gap-4">
                                Parcelado ?
                                <Tooltip color="warning" placement="right-end" content="Marque se a conta tiver mais de uma parcela">
                                    <p className="flex gap-2">
                                        <Checkbox isSelected={isSelected} onValueChange={() => handleCheckboxChange(setFieldValue)} /> Sim </p>
                                </Tooltip>
                            </div>

                            {isSelected && (
                                <Input
                                    type="number"
                                    name="qtdparcelas"
                                    label="Quantidade de Parcelas"
                                    value={values.qtdparcelas}
                                    onChange={handleChange}
                                />
                            )}
                            {isSelected && (
                                <Alert severity="info">
                                    Conta parcelada em {values.qtdparcelas} vezes no valor de {formatarParaReais(formatarParaBackend(values.valor) / parseInt(values.qtdparcelas))}
                                </Alert>
                            )}
                            <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                            {message ? (
                                <Alert severity={messageTipo as 'success' | 'info' | 'warning' | 'error'} variant="filled">
                                    {message}
                                </Alert>
                            ) : null}
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}
