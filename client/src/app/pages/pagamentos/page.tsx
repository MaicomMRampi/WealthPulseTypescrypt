"use client"
import React, { useEffect, useState } from 'react'
import { Button, Card, Chip, Divider, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { api } from '@/lib/api'
import useToken from '@/components/hooks/useToken'
import currency from '@/components/Currency'
import { CheckIcon } from "@/components/iconesCompartilhados/CheckIcon";
import { GoAlertFill } from "react-icons/go";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AlteraVisualizacaoData from '@/components/funcoes/formataData'
import calculaTempoRestante from '@/components/funcoes/tempoRestante';


export default function Pagamentos() {
    const router = useRouter()
    const { tokenUsuario } = useToken();
    const [dados, setDados] = useState<any>([]);
    const buscaPagamentos = async () => {
        const response = await api.get('/usuariopagamento',
            {
                params: {
                    id: tokenUsuario?.id
                }
            })
        setDados(response.data)
    }

    useEffect(() => {
        buscaPagamentos()
    }, [])


    const mandaRota = () => {
        router.push('/pages/pagamento')
    }


    const ultimoDado = dados.length > 0 ? dados[dados.length - 1] : null;

    console.log("🚀 ~ Pagamentos ~ ultimoDado", ultimoDado)




    return (
        <div className='w-[95%] mx-auto pt-3'>
            {ultimoDado && calculaTempoRestante(ultimoDado.dataExpiracao).dias < 0 ? (
                <p className="py-6 font-bold text-lg text-center text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-2">
                    Sua assinatura está vencida
                </p>
            ) : (
                <p className="py-6 font-bold text-lg text-center text-gray-800 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg p-2">
                    Sua assinatura vencerá em: <span className="text-white">{ultimoDado && calculaTempoRestante(ultimoDado.dataExpiracao).dias} dias</span>
                </p>
            )}


            <Table
                aria-label="Tabela de últimas despesas"
                fullWidth
                className='pt-3'
            >
                <TableHeader>
                    <TableColumn>Id Pagamento</TableColumn>
                    <TableColumn>Usuario</TableColumn>
                    <TableColumn>Data Vencimento</TableColumn>
                    <TableColumn>Metodo de Pagamento</TableColumn>
                    <TableColumn>Valor a Pagar </TableColumn>
                    <TableColumn>Status</TableColumn>
                    <TableColumn>Pagar ?</TableColumn>

                </TableHeader>
                <TableBody>
                    {dados && dados.map((row: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{tokenUsuario?.nome}</TableCell>
                            <TableCell>{AlteraVisualizacaoData(row.dataExpiracao)}</TableCell>
                            <TableCell>{row.metodoPagamento}</TableCell>
                            <TableCell>{row.valorPago && currency(row.valorPago)}</TableCell>
                            <TableCell>{row.status === 0 ?
                                (
                                    <Chip
                                        startContent={<GoAlertFill size={18} />}
                                        variant="bordered"
                                        color="danger"
                                    >
                                        Pendente
                                    </Chip>
                                )
                                :
                                (
                                    <Chip
                                        startContent={<CheckIcon size={18} />}
                                        variant="bordered"
                                        color="success"
                                    >
                                        Pago
                                    </Chip>
                                )}</TableCell>
                            <TableCell>{row.status === 1 ? null : <Button onClick={() => mandaRota()} className='bg-buttonAzulClaro'>Pagar</Button>}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
