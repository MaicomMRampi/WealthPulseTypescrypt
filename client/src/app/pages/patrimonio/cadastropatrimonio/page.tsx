"use client"
import React, { useState } from "react";
import { Formik } from 'formik';
import { valorMask } from "@/components/Mask";
import ButtonEnviarDadosPadrao from "@/components/ButtonEnviarDadosPadrao";
import { api } from "@/lib/api";
import { initialValues, validationSchema } from "./patrimonioForm";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import useToken from "@/components/hooks/useToken";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate, getLocalTimeZone, today, parseZonedDateTime } from "@internationalized/date";
import { I18nProvider } from '@react-aria/i18n'
import { Alert } from "@mui/material";
import TitlePage from "@/components/tituloPaginas";
import { useRouter } from "next/navigation";
import patrimonios from "./tipoPatrimonio";
import useVisibilityCampo from '@/components/hooks/useVisibilityCampos';
export default function App() {
    const { visibilityCampo } = useVisibilityCampo()
    const [selectedFile, setSelectedFile] = useState<any>(null);
    console.log("🚀 ~ App ~ selectedFile", selectedFile)
    const router = useRouter()
    const { tokenUsuario } = useToken()
    const [message, setMessage] = useState('');
    const [messageTipo, setMessageTipo] = useState('');


    const handleSubmit = async (values: any) => {
        const formData = new FormData();

        // Adiciona os dados do formulário no FormData
        formData.append('nome', values.nome.toUpperCase());
        formData.append('tipopatrimonio', values.tipopatrimonio);
        formData.append('valor', values.valor);
        formData.append('dataaquisicao', values.dataaquisicao);
        formData.append('localizacao', values.localizacao);
        formData.append('observacao', values.observacao);
        formData.append('idUser', tokenUsuario?.id.toString() || '0');

        // Adiciona o arquivo selecionado ao FormData, se existir
        if (selectedFile) {
            formData.append('document', selectedFile);
        }

        try {
            const response = await api.post('/postpatrimonio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
        } catch (error) {
            console.error("Erro ao cadastrar patrimônio:", error);
            setMessage('Erro ao Cadastrar Patrimônio');
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
                }: any) => (
                    <form onSubmit={handleSubmit}>
                        <div className="pt-8 flex flex-col gap-3   md:w-[60%] xs:w-full px-4 mx-auto">
                            <TitlePage title="Cadastro de Patrimônio" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input
                                    fullWidth
                                    name="nome"
                                    isInvalid={errors.nome && touched.nome}
                                    label="Nome do bem"
                                    autoComplete="none"
                                    value={values.nome}
                                    onChange={handleChange}
                                />
                                <Select
                                    value={values.tipopatrimonio}
                                    name='tipopatrimonio'
                                    fullWidth
                                    label="Tipo patrimônio"
                                    isInvalid={errors.tipopatrimonio && touched.tipopatrimonio}
                                    onChange={handleChange}
                                >
                                    {patrimonios.map(item => (
                                        <SelectItem value={item.nome} key={item.nome}>
                                            {item.nome}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {(values.tipopatrimonio) === '3' && (
                                    <p>Ao selecionar o tipo de bem como veículo, o mesmo poderá ter controle de quilometragem.</p>
                                )}

                                <Input
                                    fullWidth
                                    name="valor"
                                    label="Valor"
                                    value={values.valor}
                                    isInvalid={errors.valor && touched.valor}
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
                                <Input
                                    fullWidth
                                    name="localizacao"
                                    isInvalid={errors.localizacao && touched.localizacao}
                                    label="Localização"
                                    autoComplete="none"
                                    value={values.localizacao}
                                    onChange={handleChange}
                                />
                                {/* <input type="date" name="dataaquisicao" onChange={e => setFieldValue('dataaquisicao', e.target.value)} /> */}

                                {/* <DatePicker label="Birth date" className="max-w-[284px]" name="dataaquisicao" isRequired defaultValue={values.dataaquisicao} onChange={setFieldValue} /> */}
                                <I18nProvider locale="pt-BR">
                                    <DatePicker
                                        name="dataaquisicao"
                                        hideTimeZone
                                        defaultValue={today(getLocalTimeZone())} // Set default value directly
                                        onChange={(val) => setFieldValue("dataaquisicao", val)}
                                        label="Data de Aquisição"
                                    />
                                </I18nProvider>
                                <div className="w-full">
                                    <label className={`flex flex-col items-center justify-center px-4 py-2 h-[57px] text-sm text-[#6b7280] rounded-xl border border-dashed cursor-pointer transition-colors
    ${!visibilityCampo ? 'bg-[#27272a] hover:bg-gray-700' : 'bg-[#f4f4f5] hover:bg-gray-200'}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                                        </svg>
                                        <span className="mt-1 text-sm leading-normal">Anexar documento</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            name="document"
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                            onChange={(e: any) => setSelectedFile(e.target.files[0])}
                                        />
                                    </label>
                                </div>

                                <Textarea
                                    value={values.observacao}
                                    label="observacao"
                                    name="observacao"
                                    fullWidth
                                    onChange={handleChange}
                                />
                            </div>
                            <ButtonEnviarDadosPadrao onSubmit={handleSubmit} isSubmiting={isSubmitting} />
                            {message ?
                                (
                                    <Alert
                                        severity="success"
                                        variant="filled"
                                    >
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
