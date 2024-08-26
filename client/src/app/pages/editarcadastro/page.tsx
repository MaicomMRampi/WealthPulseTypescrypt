"use client";

import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import useToken from '@/components/hooks/useToken';
import { Avatar, Button, Input } from '@nextui-org/react';
import { valorMask } from '@/components/Mask';
import ButtonEnviarDadosPadrao from '@/components/ButtonEnviarDadosPadrao';
import * as yup from 'yup';
import { api } from '@/lib/api';
import { Alert } from '@mui/material';

export default function EditarCadastro() {
    const { tokenUsuario } = useToken();
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [currentImage, setCurrentImage] = useState(tokenUsuario?.imageUrl ? `http://localhost:3333/uploads/${tokenUsuario.imageUrl}` : selectedImage);
    const [message, setMessage] = useState<string>('');
    const [messageTipo, setMessageTipo] = useState<any>('');
    const handleImageChange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setSelectedImage(imageURL);
            setCurrentImage(imageURL);
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('id', tokenUsuario?.id.toString() || '0');

        try {
            const response = await api.post('/upload', formData);
            console.log("Upload bem-sucedido:", response.data);
        } catch (error) {
            console.error("Erro no upload:", error);
        }
    };

    const initialValues = {
        nome: tokenUsuario?.nome || '',
        email: tokenUsuario?.email || '',
        valorOrcamentoMensal: '',
    };

    const validationSchema = yup.object().shape({
        nome: yup.string().required('O Nome é obrigatório'),
        email: yup.string().email('Email inválido').required('O Email é obrigatório'),
        valorOrcamentoMensal: yup.string().required('O Valor Orçamento Mensal é obrigatório'),
    });

    const handleSubmit = async (values: any) => {
        const response = await api.post('/atualizacadastro', {
            values,
            id: tokenUsuario?.id,
        });

        if (response.status === 200) {
            setMessage(response.data.message);
            setMessageTipo('success');
        } else {
            setMessage(response.data.message);
            setMessageTipo('error');
        }
        setTimeout(() => {
            setMessage('');
            setMessageTipo('');
        }, 3000);
    };

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
                setFieldValue,
                touched,
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className='w-[95%] mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-12 pt-4 gap-5 w-full'>
                            <div className='xs:col-span-12 md:col-span-3 w-full h-[400px] bg-BgCardPadrao rounded-lg p-4'>
                                <div className='w-full flex items-center justify-center flex-col gap-8'>
                                    {tokenUsuario?.nome}
                                    <Avatar
                                        className='w-28 h-28'
                                        showFallback
                                        src={currentImage}
                                    />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden w-[60px]"
                                        id="upload-button"
                                    />
                                    <label className="w-[100%]" htmlFor="upload-button">
                                        <Button fullWidth className='bg-buttonAzulClaro' as="span">Nova foto</Button>
                                    </label>
                                </div>
                            </div>
                            <div className='col-span-9 bg-BgCardPadrao rounded-lg p-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <Input
                                        label="Nome"
                                        name="nome"
                                        value={values.nome}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="E-mail"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        label="Orçamento Mensal"
                                        name="valorOrcamentoMensal"
                                        value={values.valorOrcamentoMensal}
                                        startContent={<span className="text-white text-small">R$</span>}
                                        onChange={(event) => {
                                            const { name, value } = event.target;
                                            const maskedValue = valorMask(value);
                                            setFieldValue(name, maskedValue);
                                        }}
                                    />
                                </div>
                            </div>
                            <ButtonEnviarDadosPadrao onSubmit={handleSubmit} />
                        </div>
                        <div className='pt-4'>
                            {
                                message &&
                                <Alert severity={messageTipo}>{message}</Alert>
                            }
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}
