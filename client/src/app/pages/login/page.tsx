"use client"
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { initialValues, validationSchema } from './formControl';
import { useRouter } from 'next/navigation';
import { cpfMask } from '@/components/Mask';
import { Avatar, Button, Input } from '@nextui-org/react';
import { EyeFilledIcon } from "@/components/iconesCompartilhados/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/iconesCompartilhados/EyeSlashFilledIcon";
import Link from 'next/link';
import { api } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';
import useToken from '@/components/hooks/useToken';
import { Alert } from '@mui/material';
import ModalAlteraSenha from '@/components/ModalAlteraSenha';
import emailjs from '@emailjs/browser';
function Copyright(props: any) {
    return (
        <h1 {...props}>
            {'Copyright © '}
            <Link href="https://fluxododinheiro.vercel.app/" target='_blank'>Maicom</Link> {new Date().getFullYear()}{'.'}
        </h1>
    );
}

interface FormValues {
    cpf: string;
    senha: string;
};

export default function SignIn() {
    const [modalSenha, setOpenModalSenha] = useState<boolean>(false)
    const { setTokenUsuario, tokenUsuario } = useToken();
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
                setTokenUsuario(decodedToken.userId);
                setMessageTipo("success");
                setMessage("Usuario Logado com Sucesso");
                router.push("/");
            } else {
                setMessage("Usuario ou senha invalidos");
                setMessageTipo("error");
            }
        } catch (error) {
            setMessage("Usuario ou senha invalidos");
            setMessageTipo("error");
        } finally {
            setTimeout(() => {
                setMessage("");
                setMessageTipo("");
            }, 4000);
        }
    };

    const sendEmail = async (data: any) => {
        try {
            const res = await emailjs.send(
                'service_ud9ddr9',
                'template_5pdkkl7',
                {
                    nome: data.nome,
                    mensagem: `Olá ${data.nome}, sua nova senha é: ${data.senhaNova}`,
                    email: data.email,
                },
                'Fetw8HHG805JuaITp'
            );

            return true;
        } catch (error) {
            return false;
        }
    }



    const enviaEmailComAsenha = async (values: any) => {
        const send = await sendEmail(values);
        if (send) {
            setMessage('Mensagem enviada com sucesso!');

        } else {
            setMessage('Erro ao enviar a mensagem, tente novamente mais tarde!');
        }
        setTimeout(() => {
            setMessage('');
        }, 3000);

    }




    const alteraSenha = async (cpf: string) => {
        const response = await api.put('/esqueceusenha', {
            cpf
        })
        if (response.status === 200) {
            enviaEmailComAsenha(response.data)
        }

        setTimeout(() => {

            setOpenModalSenha(false)
        })
    }




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
                            <h1 className="text-center text-2xl font-bold mb-4 text-white">Faça seu Login</h1>
                            <div className="flex flex-col gap-4">
                                <Input
                                    autoComplete="off"
                                    fullWidth
                                    onChange={(event) => {
                                        const { name, value } = event.target;
                                        setFieldValue(name, name === 'cpf' ? cpfMask(value) : value);
                                    }}
                                    size="lg"
                                    className='text-white'
                                    onBlur={handleChange}
                                    name='cpf'
                                    isInvalid={!!touched.cpf && !!errors.cpf}
                                    variant="bordered"
                                    placeholder="Digite seu CPF"
                                    value={values.cpf}
                                    maxLength={14}
                                />
                                <Input
                                    size="lg"
                                    isInvalid={!!touched.senha && !!errors.senha}
                                    fullWidth
                                    onChange={handleChange}
                                    onBlur={handleChange}
                                    name='senha'
                                    variant="bordered"
                                    className='text-white'
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
                                        <Link onClick={() => setOpenModalSenha(true)} href="">Esqueceu a Senha?</Link>
                                    </div>
                                    <div className='text-right'>
                                        <Link href="/pages/register">Registre-se Aqui</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-4 text-center text-green-700'>
                                <Copyright sx={{ mt: 4, mb: 4 }} />
                                <div className='pt-4' >
                                    {message ? (
                                        <Alert severity={messageTipo}>{message}</Alert>
                                    ) : null}
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <ModalAlteraSenha
                isOpen={modalSenha}
                onClose={() => setOpenModalSenha(false)}
                onSubmit={alteraSenha}
            />
        </div>
    );
}
