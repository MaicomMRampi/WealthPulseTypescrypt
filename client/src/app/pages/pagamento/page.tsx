"use client";
import React, { useEffect, useState } from 'react';
import useToken from '@/components/hooks/useToken';
import { api } from '@/lib/api';
import { Button, Input } from '@nextui-org/react';
import { MdContentCopy } from "react-icons/md";
import Image from 'next/image';

export default function Page() {
    const { tokenUsuario } = useToken();
    const horaAtual = new Date().getHours();
    const [dados, setDados] = useState<any>(null);
    const [respostaPagamento, setRespostaPagamento] = useState<any>();
    const [copied, setCopied] = useState(false);

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
                    id: '222',
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

    useEffect(() => {
        geraCobrancaPix();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            verificaPagamento();
        }, 10000); // Verifica o pagamento a cada 10 segundos

        return () => clearInterval(interval); // Limpa o intervalo quando o componente for desmontado
    }, [dados?.id]); // Executa o efeito sempre que o ID dos dados mudar

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
                        <Input fullWidth label='Nome' defaultValue='Maicom Mateus Rampi' />
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
                                value={dados.point_of_interaction.transaction_data.qr_code}
                            />
                        )}
                        {copied && <p className='text-default-500'>Chave copiada com sucesso!</p>}
                        <Button onClick={verificaPagamento}>Verifica Pagamento</Button>
                    </div>
                    <p>{respostaPagamento ? respostaPagamento.status == 'pending' ? 'Pagamento pendente' : 'Pagamento concluído' : null}</p>
                    <p>{dados?.id ? dados.id : null}</p>

                </div>
            </div>
        </div>
    )
}
