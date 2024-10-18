"use client";
import React, { useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { cpfMask } from '@/components/Mask';
import { Avatar, Button, Input } from '@nextui-org/react';
import Image from 'next/image';
import { validationSchema, initialValues } from './registerForm';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Alert } from '@mui/material';

interface FormValues {
    nome: string;
    cpf: string;
    email: string;
    senha: string;
}

export default function SignUp() {
    const [message, setMessage] = useState<any>('');
    const [messageTipo, setMessageTipo] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await api.post(`/postusers`, values);
            setMessage(response.data.message);
            if (response.status === 200) {
                setMessageTipo("success");
                setTimeout(() => {
                    setMessage("");
                    router.push('/pages/login');
                }, 4000);
            } else {
                setMessage("Erro ao Criar Usuário");
            }
        } catch (error) {
            setMessageTipo("error");
            setMessage("Erro ao Criar Usuário");
            setTimeout(() => {
                setMessage("");
                setMessageTipo("error");
            }, 4000);
        }
    };

    return (
        <div className="w-full min-h-screen bg-cover bg-[url('/imagens/rm378-09.jpg')] md:bg-[url('/imagens/register2.png')] flex  xs:justify-center items-center  md:justify-end md:items-center md:pr-32">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
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
                            <div className="flex justify-center items-center mb-4">
                                <Avatar src="/login.jpg" className="w-20 h-20 text-large" />
                            </div>
                            <h1 className="text-center text-2xl font-bold mb-4">Registre-se Aqui!</h1>
                            <div className="flex flex-col gap-4">
                                <Input
                                    autoComplete="off"
                                    errorMessage={touched.nome && errors.nome}
                                    isInvalid={!!(touched.nome && errors.nome)}
                                    fullWidth
                                    onChange={handleChange}
                                    name='nome'
                                    variant="bordered"
                                    placeholder="Digite seu Nome"
                                    value={values.nome}
                                />

                                <Input
                                    autoComplete="off"
                                    errorMessage={touched.cpf && errors.cpf}
                                    fullWidth
                                    isInvalid={!!(touched.cpf && errors.cpf)}
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        setFieldValue(name, cpfMask(value));
                                    }}
                                    name='cpf'
                                    variant="bordered"
                                    placeholder="Digite seu CPF"
                                    value={values.cpf}
                                    maxLength={14}
                                />

                                <Input
                                    autoComplete="off"
                                    isInvalid={!!(touched.email && errors.email)}
                                    errorMessage={touched.email && errors.email}
                                    fullWidth
                                    onChange={handleChange}
                                    name='email'
                                    variant="bordered"
                                    placeholder="Digite seu e-mail"
                                    value={values.email}
                                />

                                <Input
                                    autoComplete="off"
                                    name='senha'
                                    errorMessage={touched.senha && errors.senha}
                                    fullWidth
                                    isInvalid={!!(touched.senha && errors.senha)}
                                    onChange={handleChange}
                                    variant="bordered"
                                    placeholder="Digite uma Senha"
                                    type="password"
                                    value={values.senha}
                                />

                                <Input
                                    autoComplete="off"
                                    errorMessage={touched.confirmaSenha && errors.confirmaSenha}
                                    fullWidth
                                    isInvalid={!!(touched.confirmaSenha && errors.confirmaSenha)}
                                    onChange={handleChange}
                                    name='confirmaSenha'
                                    variant="bordered"
                                    placeholder="Confirme sua Senha"
                                    type="password"
                                    value={values.confirmaSenha}
                                />

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="solid"
                                    color='success'
                                >
                                    Cadastrar
                                </Button>
                                <div>
                                    {message ? (
                                        <Alert severity={messageTipo as any}>{message}</Alert>
                                    ) : null}
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    <div className="text-left">
                                        <Link href="/pages/login">Já é usuário? Acesse sua conta aqui</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
