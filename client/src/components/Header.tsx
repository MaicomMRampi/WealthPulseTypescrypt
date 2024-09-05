"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import ModalBoasVindas from "@/components/ModalBoasVindas"
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Input,
    DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Switch,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Divider
} from "@nextui-org/react";
import { MoonIcon } from "@/components/HeaderComponents/MoonIcon";
import { SunIcon } from "@/components/HeaderComponents/SunIcon";
import useToken from "./hooks/useToken";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import useVisibility from "./hooks/useVisibility";
import Image from "next/image";
import Link from "next/link";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/aceternity/ui/navbar-menu";
import { cn } from "@/lib/utils";
import useVisibilityCampo from "./hooks/useVisibilityCampos";
import { api } from "@/lib/api";

interface User {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    datacadastro: string;
    valorOrcamentoMensal: number;
    imageUrl: string;
    openModal: number;  // Adicione esta linha
}


export default function App() {
    const [active, setActive] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { tokenUsuario } = useToken()
    const [opemModalBoasVindas, setopemModalBoasVindas] = useState<boolean>(tokenUsuario?.openModal == 1);
    const { toggleVisibility, visibility } = useVisibility()
    const { toggleVisibilityCampo, visibilityCampo } = useVisibilityCampo()
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [token, setToken] = useState<string | null>(null);
    const pathname = usePathname()

    useEffect(() => {
        setopemModalBoasVindas(tokenUsuario?.openModal == 1)
    }, [tokenUsuario])



    const menuItems = [
        { pagina: "Inicio", link: "/" },
        { pagina: "Cadastro De Patrimônio", link: "/pages/patrimonio/cadastropatrimonio" },
        { pagina: "Lista De Patrimônios", link: "/pages/patrimonio/listapatrimonio" },
        { pagina: "Nova Despesa de Patrimônios", link: "/pages/patrimonio/novadespesapatrimonio" },
        { pagina: "Meus Investimentos", link: "/pages/investimentos/listainvestimento" },
        { pagina: "Novos Investimentos", link: "/pages/investimentos/novoinvestimento" },
        { pagina: "Minhas Contas", link: "/pages/contas/listaconta" },
        { pagina: "Nova Conta", link: "/pages/contas/novaconta" },
        { pagina: "Minhas Despesas", link: "/pages/despesas/listadespesa" },
        { pagina: "Nova Despesa", link: "/pages/despesas/novadespesa" },
    ];


    const trocaValorVisibilidade = () => {
        toggleVisibilityCampo();
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/pages/login');
        setToken(null);
    };
    const teste = (valor: boolean) => {
        if (valor) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const handleVisibility = () => {
        toggleVisibility();

    };

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    if (pathname === '/pages/login' || pathname === '/pages/register') return null

    const fechaModalBoasVindas = async () => {
        setopemModalBoasVindas(false)
        const response = await api.put('/fechamodalboasvindas', {
            id: tokenUsuario?.id
        })
    }


    return (
        <>
            <Navbar className="bg-BgCardPadrao"
                maxWidth="2xl"
                shouldHideOnScroll
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
            >
                <div className="flex justify-between w-full items-center" >
                    <NavbarContent justify="start">
                        <NavbarMenuToggle className="text-primaryTableText p-4 md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                        <NavbarBrand className="mr-4">
                            <div className="flex items-center gap-2 font-bold">
                                <div >
                                    <Avatar src="/login.jpg" className="w-10 h-10 text-large" />
                                </div>
                                <div className="flex flex-col">
                                    <div>
                                        Fluxo do
                                    </div>
                                    <div className="text-primaryTableText">
                                        Dinheiro
                                    </div>
                                </div>
                            </div>

                            {/* <Link href="/"><Image src="/imagens/logoAjustada.png" alt="logo" width={125} height={150} /></Link> */}
                        </NavbarBrand>
                    </NavbarContent>
                    <Menu setActive={setActive} >
                        <Link className="cursor-pointer font-semibold" href={"/"}>Inicio</Link>

                        <MenuItem setActive={setActive} active={active} item="Patrimônio">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/pages/patrimonio/cadastropatrimonio">Cadastro De Patrimônio</HoveredLink>
                                <HoveredLink href="/pages/patrimonio/listapatrimonio">Lista De Patrimônios</HoveredLink>
                                <HoveredLink href="/pages/patrimonio/novadespesapatrimonio">Nova Despesa de Patrimônios</HoveredLink>
                            </div>
                        </MenuItem>

                        <MenuItem setActive={setActive} active={active} item="Investimentos">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/pages/investimentos/listainvestimento">Meus Investimentos</HoveredLink>
                                <HoveredLink href="/pages/investimentos/novoinvestimento">Novos Investimentos</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Contas">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/pages/contas/listaconta">Minhas Contas</HoveredLink>
                                <HoveredLink href="/pages/contas/novaconta">Nova Conta</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Despesas">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/pages/despesas/listadespesa">Minhas Despesas</HoveredLink>
                                <HoveredLink href="/pages/despesas/novadespesa">Nova Despesa</HoveredLink>
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Rota de ajuste Pagamento">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/pages/pagamento">Pagamento</HoveredLink>
                            </div>
                        </MenuItem>
                        <Link className="cursor-pointer font-semibold text-orange-500" href={"/pages/ajuda"}>Ajuda</Link>

                    </Menu>
                    <NavbarContent as="div" className="items-center flex gap-6 " justify="end">
                        <p className="cursor-pointer"> {visibility ? <MdVisibility onClick={handleVisibility} size={28} /> : <MdVisibilityOff onClick={handleVisibility} size={28} />}</p>
                        <Switch
                            onChange={(e) => {
                                teste(e.target.checked);
                                trocaValorVisibilidade();
                            }}

                            defaultSelected
                            size="lg"
                            color="primary"
                            startContent={<SunIcon />}
                            endContent={<MoonIcon />}
                        />
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name="Jason Hughes"
                                    size="sm"
                                    src={`http://localhost:3333/uploads/${tokenUsuario?.imageUrl}`}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">{tokenUsuario?.email}</p>
                                </DropdownItem>
                                <DropdownItem key="configurations">Configurações</DropdownItem>
                                <DropdownItem key="configurations">  <Divider /></DropdownItem>
                                <DropdownItem key="settings"><Link href={'/pages/editarcadastro'}>Editar usuário</Link></DropdownItem>
                                <DropdownItem key="team_settings"><Link href={'/pages/editarinstituicao'}>Editar Instituição</Link></DropdownItem>
                                <DropdownItem key="team_settings"><Link href={'/pages/editarcategoria'}>Editar Categoria</Link></DropdownItem>
                                <DropdownItem key="analytics"><Link href={'/pages/editarnomesinvestimentos'}>Editar Nome dos Investimentos</Link></DropdownItem>
                                <DropdownItem key="analytics"><Link href={'/pages/editarformadepagamento'}>Editar Forma de Pagamento</Link></DropdownItem>
                                <DropdownItem key="analytics"><Link href={'/pages/editartipodespesa'}>Editar Tipo Depesa Patrimônio</Link></DropdownItem>
                                <DropdownItem key="configurations">  <Divider /></DropdownItem>
                                <DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
                                    Sair
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </NavbarContent>
                </div>
                <NavbarMenu >
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} key={index} isActive={pathname === item.link}>
                            <Link className="p-4 text-lg text-gray-700 hover:bg-gray-200 transition-colors" href={item.link}>
                                {item.pagina}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar >
            <ModalBoasVindas
                isOpen={opemModalBoasVindas}
                onClose={() => fechaModalBoasVindas()}
            />
        </>

    );
}
