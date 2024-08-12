import React from 'react'
import { Card, CardHeader, CardBody } from '@nextui-org/react';
import { IoBarChartSharp } from "react-icons/io5";
export default function TotalInvestidos() {
    return (
        <Card fullWidth className='bg-[#1c1d24] p-4'>
            <CardHeader>
                Total investidos
            </CardHeader>
            <CardBody>
                <p className='text-white font-semibold text-2xl flex justify-between'>2500.00 <IoBarChartSharp className='text-green-500' /></p>
            </CardBody>
        </Card>
    )
}
