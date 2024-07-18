// app/providers.tsx
"use client";

import { ThemeSwitcher } from '@/components/themeSwitcher';
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "@/components/Header"
import LayoutAdmin from '@/components/LayoutAdmin';
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <div className='min-h-screen'>
                    <Header />
                    <LayoutAdmin />
                    {children}
                </div>
            </NextThemesProvider>
        </NextUIProvider>
    )
}