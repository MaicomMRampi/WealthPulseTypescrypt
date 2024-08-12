"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Input,
    DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Switch,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/HeaderComponents/AcmeLogo";
import { SearchIcon } from "@/components/HeaderComponents/SearchIcon";
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



export default function App() {
    const [active, setActive] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { tokenUsuario } = useToken()
    console.log("🚀 ~ App ~ tokenUsuario", tokenUsuario)
    const { toggleVisibility, visibility } = useVisibility()
    const { toggleVisibilityCampo, visibilityCampo } = useVisibilityCampo()
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [token, setToken] = useState<string | null>(null);
    const pathname = usePathname()

    const menuItems = [
        {
            pagina: "Inicio",
            link: "/",
        },

        {
            pagina: "Patrimônio",
            link: "/pages/patrimonio/cadastropatrimonio",
        },

        {
            pagina: "Lista de Patrimônios",
            link: "/pages/patrimonio/listapatrimonio",
        },


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

    return (
        <Navbar className="bg-primaryTable"
            maxWidth="2xl"
            shouldHideOnScroll
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <div className="flex justify-between w-full items-center" >
                <NavbarContent justify="start">
                    <NavbarMenuToggle className="text-primaryTableText p-4 md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                    <NavbarBrand className="mr-4">
                        <Link href="/"><Image src="/imagens/logoAjustada.png" alt="logo" width={125} height={150} /></Link>
                    </NavbarBrand>
                </NavbarContent>

                <Menu setActive={setActive}>
                    <Link className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white" href={"/"}>Inicio</Link>
                    <MenuItem setActive={setActive} active={active} item="Patrimônio">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/pages/patrimonio/cadastropatrimonio">Cadastro De Patrimônio</HoveredLink>
                            <HoveredLink href="/pages/patrimonio/listapatrimonio">Lista De Patrimônios</HoveredLink>
                            <HoveredLink href="/pages/patrimonio/novadespesapatrimonio">Nova Despesa de Patrimônios</HoveredLink>
                        </div>
                    </MenuItem>

                    <MenuItem setActive={setActive} active={active} item="Investimentos">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/pages/investimentos/meusinvestimentos">Meus Investimentos</HoveredLink>
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
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Logado com </p>
                                <p className="font-semibold">{tokenUsuario?.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings">My Settings</DropdownItem>
                            <DropdownItem key="team_settings">Team Settings</DropdownItem>
                            <DropdownItem key="analytics">Analytics</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem key="logout" color="danger" onClick={() => handleLogout()}>
                                Sair
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            </div>
            <NavbarMenu >
                {menuItems.map((item, index: any) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="text-primaryTableText"
                            onClick={() => setIsMenuOpen(false)}
                            href={item.link}

                        >
                            {item.pagina}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}
