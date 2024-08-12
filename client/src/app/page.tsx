"use client";
import TotalInvestidos from '@/components/home/totalInvestidos';
import TotalContas from '@/components/home/totalContas';
import { Button } from '@nextui-org/button';
import {
    PieChart, Pie, Cell, ResponsiveContainer, ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    CartesianGrid

} from 'recharts';
import Link from 'next/link';
import TotalDespesas from '@/components/home/totalDespesas';
import { Card } from '@nextui-org/react';
import DespesasComPatrimonios from '@/components/home/despesasComPatrimonios';


export default function Home() {



    return (
        <>
            <div className='w-[95%] mx-auto'>
                <div className='grid  grid-cols-1 md:grid-cols-3 pt-4 gap-5'>
                    <TotalInvestidos />
                    <TotalContas />
                    <TotalDespesas />
                    <Card className='bg-[#1c1d24] col-span-1 h-[400px] p-4'>
                        <h2 className='text-white text-center'>Meus Fundos Imobiliários</h2>

                    </Card>
                    <Card className='bg-[#1c1d24] col-span-1 h-[400px] p-4'>
                        <h2 className='text-white text-center'>Ultimas Despesas</h2>
                    </Card>
                    <DespesasComPatrimonios />
                </div>


            </div >
        </>
    );
}
