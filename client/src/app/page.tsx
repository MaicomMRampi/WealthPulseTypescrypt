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
import MeusFundosImobiliarios from '@/components/home/meusFundosImobiliarios';
import UltimasDespesas from '@/components/home/ultimasDespesas';
import { useTheme } from "next-themes";

export default function Home() {
    const { theme, setTheme } = useTheme();
    console.log("🚀 ~ Home ~ theme", theme)



    return (
        <>
            <div className='w-[95%] mx-auto'>
                <div className='grid  grid-cols-1 md:grid-cols-3 pt-4 gap-5 text-white'>
                    <TotalInvestidos />
                    <TotalContas />
                    <TotalDespesas />
                    <MeusFundosImobiliarios />
                    <UltimasDespesas />
                    <DespesasComPatrimonios />
                </div>


            </div >
        </>
    );
}
