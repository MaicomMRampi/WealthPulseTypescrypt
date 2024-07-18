"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "next/navigation";
import {
    Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input,
    DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Switch
} from "@nextui-org/react";
import { AcmeLogo } from "@/components/HeaderComponents/AcmeLogo";
import { SearchIcon } from "@/components/HeaderComponents/SearchIcon";
import { MoonIcon } from "@/components/HeaderComponents/MoonIcon";
import { SunIcon } from "@/components/HeaderComponents/SunIcon";
import { jwtDecode } from "jwt-decode";




export default function App() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const [token, setToken] = useState<string | null>(null);
    console.log("🚀 ~ App ~ token", token)

    const pathname = usePathname()

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


    const buscarToken = () => {
        const tokenLocal = localStorage.getItem('token');
        console.log("🚀 ~ buscarToken ~ tokenLocal", tokenLocal)
        if (tokenLocal) {
            const decodedToken: any = jwtDecode(tokenLocal);
            setToken(decodedToken)
        }
    };

    useEffect(() => {
        buscarToken();
    }, [token]);



    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    if (pathname === '/pages/login' || pathname === '/pages/register') return null

    return (
        <Navbar className="">
            <NavbarContent justify="start">
                <NavbarBrand className="mr-4">
                    <AcmeLogo />
                    <p className="hidden sm:block font-bold text-inherit">ACME</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-3">
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Features
                        </Link>
                    </NavbarItem>
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page" color="secondary">
                            Customers
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            Integrations
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>

            <NavbarContent as="div" className="items-center" justify="end">
                <Switch
                    onChange={(e) => teste(e.target.checked)}
                    defaultSelected
                    size="lg"
                    color="success"
                    startContent={<SunIcon />}
                    endContent={<MoonIcon />}
                />
                <Input
                    classNames={{
                        base: "max-w-full sm:max-w-[10rem] h-10",
                        mainWrapper: "h-full",
                        input: "text-small",
                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    // startContent={<SearchIcon size={16} />}
                    type="search"
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
                            <p className="font-semibold">{""}</p>
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
        </Navbar>
    );
}
