"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';


const LayoutAdmin = ({ children }: any) => {
    const pathname = usePathname()


    if (pathname != '/pages/register') {
        const router = useRouter();
        const [usuarioLogado, setUsuarioLogado] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');


            if (token) {
                console.log("🚀 ~ useEffect ~ token", token);
                try {
                    const decodedToken: any = jwtDecode(token);
                    console.log("🚀 ~ useEffect ~ decodedToken", decodedToken);

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
        }, [router]);

        // Renderização condicional com base no estado de usuário logado
        if (!usuarioLogado) {
            return null; // ou uma mensagem de carregamento, etc.
        }
    }



};

export default LayoutAdmin;
