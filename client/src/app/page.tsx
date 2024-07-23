"use client";
import { Button } from '@nextui-org/button';
import Link from 'next/link';


export default function Home() {
    return (
        <>
            <h1>bem vindos ao caraio </h1>
            <Button>Click me</Button>
            <Link href="/pages/despesas/listadespesa">Register</Link>
            <Link href="/pages/patrimonio/cadastropatrimonio">Casatro de patrim</Link>
        </>
    );
}
