"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { IoBarChartSharp } from "react-icons/io5";
import useToken from '../hooks/useToken';
import useVisibility from '../hooks/useVisibility';
import currency from '../Currency';
import { api } from '@/lib/api';
export default function TotalInvestidos() {
    const { visibility } = useVisibility()
    const { tokenUsuario } = useToken()
    const [dados, setDados] = useState([])

    const buscaInvestimentos = async () => {
        if (!tokenUsuario) return
        const response = await api.get('/meusinvestimentos', {
            params: {
                id: tokenUsuario?.id
            }
        })
        setDados(response.data)
    }

    useEffect(() => {
        buscaInvestimentos()
    }, [])

    const somaValores =
        dados &&
        dados.reduce((acc, despesa) => acc + despesa.valorInvestido, 0);


    return (
        <Card fullWidth className='bg-bgCards p-4 hover:scale-105 duration-75 text-white'>
            <CardHeader>
                Total investidos
            </CardHeader>
            <CardBody>
                <p className='text-white font-semibold text-2xl flex justify-between'>{visibility ? currency(somaValores) : '****'} <IoBarChartSharp size={40} className='text-green-500' /></p>
            </CardBody>
        </Card>
    )
}
