import { Input, Select, SelectItem } from '@nextui-org/react'
import React from 'react'
import { I18nProvider } from '@react-aria/i18n';
import { DatePicker } from "@nextui-org/date-picker";
import { Formik } from 'formik';
import { initialValues, validationSchema } from "./acoesForm";
import ButtonEnviarDadosPadrao from '@/components/ButtonEnviarDadosPadrao';
export default function Acoes() {

    const acoes = [
        {
            simbolo: 'AAPL',
            empresa: 'Apple Inc.',
            precoAtual: 185.25,
            quantidade: 50,
            setor: 'Tecnologia',
            dataCompra: '2024-01-15',
        },
    ]

    const handleSubmit = async (values: any) => {

        console.log(values)
    }
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
                    <Select
                        name="acao"
                        fullWidth
                        label="Ações"
                        onChange={handleChange}
                    >
                        {/* Supondo que você tenha uma lista de ações */}
                        {acoes.map(item => (
                            <SelectItem value={item.simbolo} key={item.simbolo}>
                                {item.simbolo} ({item.simbolo})
                            </SelectItem>
                        ))}
                    </Select>
                    <Input
                        fullWidth
                        name="quantidade"
                        label="Quantidade de Ações"
                        value={values.quantidade}
                        onChange={handleChange}
                    />
                    <Input
                        fullWidth
                        name="precoCompra"
                        label="Preço de Compra por Ação"
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

    )
}
