import { Card } from '@nextui-org/react'
import React from 'react'
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
export default function DespesasComPatrimonios() {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <Card className='bg-BgCardPadrao col-span-1 h-[400px] p-4 hover:scale-105 duration-75'>
            <h2 className='font-semibold'>Maiores Despesas com Patrimônios</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart width={150} height={40} data={data}>
                    <Bar dataKey="uv" fill="#000" />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}
