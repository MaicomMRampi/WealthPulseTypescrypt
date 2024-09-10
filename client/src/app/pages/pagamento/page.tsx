"use client";
import React, { useEffect, useState } from 'react';
import useToken from '@/components/hooks/useToken';
import { api } from '@/lib/api';
import { Button, Input } from '@nextui-org/react';
import { MdContentCopy } from "react-icons/md";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { tokenUsuario } = useToken();
    const horaAtual = new Date().getHours();
    const [dados, setDados] = useState<any>(null);
    const [dadosPagamento, setDadosPagamento] = useState<any>(null);
    const router = useRouter();
    const [respostaPagamento, setRespostaPagamento] = useState<any>();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!tokenUsuario) {
            setTimeout(() => router.push('/pages/login'), 2000);
        }
    }, [tokenUsuario]);


    const buscaUltimoPagamento = async () => {
        try {
            const response = await api.get('/buscaultimapagamento', {
                params: {
                    id: tokenUsuario?.id,
                },
            });
            setDadosPagamento(response.data);
        } catch (error) {
            console.error("Erro ao buscar pagamento:", error);
        }
    }

    const handleCopy = () => {
        const qrCodeValue = dados?.point_of_interaction?.transaction_data?.qr_code;
        if (qrCodeValue) {
            navigator.clipboard.writeText(qrCodeValue).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Mostra feedback de copiado por 2 segundos
            });
        }
    };

    const geraCobrancaPix = async () => {
        try {
            const response = await api.post('/geracobranca', {
                accessToken: 'APP_USR-5296356745455931-082810-90e947ec664ab8fb2771fb01c3c81439-151183491',
                paymentData: {
                    total: 0.01,
                    name: tokenUsuario?.nome,
                    email: tokenUsuario?.email,
                    id: dadosPagamento?.id.toString()
                }
            });
            setDados(response.data);
        } catch (error) {
            console.error("Erro ao gerar cobrança PIX:", error);
        }
    };

    const verificaPagamento = async () => {
        if (dados?.id) {
            try {
                const response = await api.get('/verificapagamento', {
                    params: {
                        accessToken: 'APP_USR-5296356745455931-082810-90e947ec664ab8fb2771fb01c3c81439-151183491',
                        idPagamento: dados.id,
                    }
                });
                setRespostaPagamento(response.data);
            } catch (error) {
                console.error("Erro ao verificar pagamento:", error);
            }
        }
    };

    const alteraOsDadosDePagamento = async () => {
        try {
            const response = await api.post('/postpagamento', {
                idPagamento: dadosPagamento
            });


            if (response.status === 200) {
                setRespostaPagamento('');
                setTimeout(() => {
                    localStorage.removeItem('token');
                    router.replace('/pages/login')

                    // Usar replace ao invés de push
                }, 3000); // Aumenta o tempo para 3 segundos
            }
        } catch (error) {
            console.error("Erro ao alterar dados de pagamento:", error);
        }
    }

    useEffect(() => {
        buscaUltimoPagamento();
    }, []);

    useEffect(() => {
        if (dadosPagamento) {
            geraCobrancaPix();
        }
    }, [dadosPagamento]);

    useEffect(() => {
        const interval = setInterval(() => {
            verificaPagamento();
        }, 10000); // Verifica o pagamento a cada 10 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, [dados?.id]);

    // Novo useEffect para monitorar o status do pagamento e alterar os dados
    useEffect(() => {
        if (respostaPagamento?.status === 'approved') {
            alteraOsDadosDePagamento();
        }
    }, [respostaPagamento]);

    return (
        <div className='w-full flex items-center justify-center flex-col'>
            <p className='text-xl py-6 font-semibold text-center'>
                {horaAtual > 12 ? 'Boa tarde' : 'Bom dia'} {tokenUsuario?.nome}! Seu cadastro está vencido, favor realizar pagamento para liberação.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {dados?.point_of_interaction?.transaction_data?.qr_code_base64 && (
                    <Image
                        alt='Pagamento'
                        src={`data:image/png;base64,${dados.point_of_interaction.transaction_data.qr_code_base64}`}
                        width={300}
                        height={300}
                    />
                )}

                <div className='w-full'>
                    <p className='text-center pb-4'>Confira os dados de pagamento</p>
                    <div className='flex flex-col gap-3'>
                        <Input fullWidth label='Nome' defaultValue={tokenUsuario?.nome} />
                        <Input fullWidth label='Instituição' defaultValue='Mercado pago' />
                        {dados && (
                            <Input
                                fullWidth
                                endContent={
                                    <div>
                                        <MdContentCopy onClick={handleCopy} className='cursor-pointer text-blue-600' size={20} />
                                    </div>
                                }
                                label='Pix copia e cola'
                                value={dados?.point_of_interaction?.transaction_data?.qr_code}
                            />
                        )}
                        {copied && <p className='text-default-500'>Chave copiada com sucesso!</p>}
                    </div>
                </div>
            </div>
            <p className='pt-6'>
                {respostaPagamento ? (
                    respostaPagamento.status === 'pending' ? (
                        <p className='flex gap-2 text-xl text-yellow-500 font-semibold'>Pagamento pendente <Image src={"/icons/98739.svg"} alt='Alerta' width={20} height={20} /></p>
                    ) : (
                        <p className='flex gap-2 text-xl text-[#10b981] font-semibold'>Pagamento concluído <Image src={"/icons/positive.svg"} alt='Alerta' width={20} height={20} /></p>
                    )
                ) : null}
            </p>
        </div>
    )
}
