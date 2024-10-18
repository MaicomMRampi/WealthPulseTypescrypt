"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import useToken from './hooks/useToken';
import { api } from '@/lib/api';


const LayoutAdmin = ({ children }: any) => {

    const { tokenUsuario } = useToken();
    const router = useRouter();
    const pathname = usePathname();
    const [usuarioLogado, setUsuarioLogado] = useState(false);
    const [dadosPagamento, setDadosPagamento] = useState<any>();
    const dataAtual = new Date().getTime();
    const dataAtualDoUsuario = new Date(tokenUsuario?.dataExpiracao).getTime()

    const alteraSeTiverVencido = async () => {
        if (dataAtual > dataAtualDoUsuario && tokenUsuario?.statusFinanceiro === 1) {
            const response = await api.put('/alterapagamento', {
                id: tokenUsuario?.id,
            })
        };
    }

    const verificaPagamento = async () => {
        console.log("Entrou no verificaPagamento");
        if (dataAtual > dataAtualDoUsuario && tokenUsuario?.statusFinanceiro === 0) {
            router.push('/pages/pagamento');
        };
    }
    useEffect(() => {
        if (pathname !== '/pages/register') {
            alteraSeTiverVencido();
            verificaPagamento();
            const token = localStorage.getItem('token');
            if (token && tokenUsuario) {
                try {
                    const decodedToken: any = jwtDecode(token);
                    // Verifica se o token está expirado comparando a data atual com a data de expiração do token
                    if (decodedToken.exp * 1000 < Date.now()) {
                        // Token expirado, redirecionar para a página de login
                        localStorage.removeItem('token');
                        router.push('/pages/login');
                    } else {
                        // Token válido, usuário está logado
                        setUsuarioLogado(true);
                    }
                } catch (error) {
                    console.error('Erro ao decodificar o token:', error);
                    localStorage.removeItem('token');
                    router.push('/pages/login');
                }
            } else {
                // Token não encontrado, redirecionar para a página de login
                router.push('/pages/login');
            }
        }
    }, [pathname, router, tokenUsuario]);

    // // VALIDA PAGAMENTOS 

    // // Renderização condicional com base no estado de usuário logado
    if (!usuarioLogado && pathname !== '/pages/register') {
        return null; // ou uma mensagem de carregamento, etc.
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default LayoutAdmin;
