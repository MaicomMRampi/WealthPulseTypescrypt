"use client"
import React, { useEffect, useState } from 'react';
import { UseBoundStore } from 'zustand';
import Image from 'next/image';
import { Formik } from 'formik';
import { initialValues, validationSchema } from './formControl';
import { useRouter } from 'next/navigation';
import { cpfMask } from '@/components/Mask';
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Input, useTooltip } from '@nextui-org/react';
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import Link from 'next/link';
import { api } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';
import useToken from '@/components/hooks/useToken';
function Copyright(props: any) {
    return (
        <h1 {...props}>
            {'Copyright © '}
            <Link href="">Maicom</Link> {new Date().getFullYear()}{'.'}
        </h1>
    );
}

interface FormValues {
    cpf: string;
    senha: string;
};

export default function SignIn() {

    const { setTokenUsuario, tokenUsuario } = useToken();
    console.log("🚀 ~ SignIn ~ tokenUsuario", tokenUsuario)
    const [message, setMessage] = useState<string>('');
    const [messageTipo, setMessageTipo] = useState<any>('');
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (values: FormValues, { resetForm }: any) => {
        try {
            const response = await api.post('/login', { values });
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                const decodedToken: any = jwtDecode(response.data.token);
                console.log("🚀 ~ handleSubmit ~ decodedToken", decodedToken)
                setTokenUsuario(decodedToken.userId);
                setMessageTipo("success");
                setMessage("Usuario Logado Com Sucesso");
                router.push("/");
            } else {
                setMessage("Usuario ou senha invalidos");
                setMessageTipo("danger");
            }
        } catch (error) {
            setMessage("Erro no login. Tente novamente.");
            setMessageTipo("danger");
        } finally {
            setTimeout(() => {
                setMessage("");
                setMessageTipo("");
            }, 4000);
        }
    };

    return (
        <div className="w-full min-h-screen bg-cover flex justify-center items-center bg-[url('/imagens/rm378-09.jpg')]">
            <div className=" p-8 rounded-lg shadow-lg w-full max-w-md">
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
                            <h1 className="text-center text-2xl font-bold mb-4">Faça seu Login</h1>
                            <div className="flex flex-col gap-4">
                                <Input
                                    autoComplete="off"
                                    errorMessage={touched.cpf && errors.cpf}
                                    fullWidth
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        setFieldValue(name, name === 'cpf' ? cpfMask(value) : value);
                                    }}
                                    size="lg"
                                    onBlur={handleChange}
                                    name='cpf'
                                    variant="bordered"
                                    placeholder="Digite seu CPF"
                                    value={values.cpf}
                                    maxLength={14}
                                />
                                {errors.cpf && <p className="text-red-500 text-xs italic">{errors.cpf}</p>}
                                <Input
                                    size="lg"
                                    errorMessage={touched.senha && errors.senha}
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    name='senha'
                                    variant="bordered"
                                    placeholder="Insira sua senha"
                                    endContent={
                                        <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                />
                                {errors.senha && <p className="text-red-500 text-xs italic">{errors.senha}</p>}
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="solid"
                                    color='success'
                                >
                                    Entrar
                                </Button>
                                <div className="grid grid-cols-2">
                                    <div>
                                        <Link href="">Esqueceu a Senha?</Link>
                                    </div>
                                    <div className='text-right'>
                                        <Link href="/pages/register">Registre-se Aqui</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 text-center text-green-700'>
                                <Copyright sx={{ mt: 4, mb: 4 }} />

                            </div>
                        </form>
                    )}
                </Formik>
                {message && (
                    <div className="mt-4">
                        <Popover placement='top-start' color={messageTipo} isOpen={true}>
                            <PopoverTrigger>
                                <Button style={{ display: 'none' }} />
                            </PopoverTrigger>
                            <PopoverContent>
                                <>
                                    {message}
                                </>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
            </div>
        </div>
    );
}
