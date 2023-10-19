'use client'

import { ArrowRight, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface MobileNavProps {
    isAuth: boolean
}

export function MobileNav({ isAuth }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const pathname = usePathname()

    useEffect(() => {
        if (isOpen) setIsOpen(false)
    }, [pathname])

    function closeOnCurrent(href: string) {
        if (pathname === href) {
            setIsOpen(false)
        }
    }

    function toogleOpen() {
        setIsOpen((prev) => !prev)
    }

    return (
        <div className="sm:hidden">
            <MenuIcon
                className="relative z-50 h-5 w-5 text-zinc-700 cursor-pointer"
                onClick={toogleOpen}
            />

            {isOpen ? (
                <div className="fixed w-full animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0">
                    <ul className="absolute grid w-full px-10 pt-20 pb-8 gap-3 shadow-xl border-b border-zinc-200 bg-white">
                        {!isAuth ? (
                            <>
                                <li>
                                    <Link
                                        href='/sign-up'
                                        onClick={() => closeOnCurrent('/sign-up')}
                                        className="flex items-center w-full font-semibold text-green-600"
                                    >
                                        Começar
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </li>

                                <li className="my-3 h-px w-full bg-gray-300" />

                                <li>
                                    <Link
                                        href='/sign-in'
                                        onClick={() => closeOnCurrent('/sign-in')}
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Entrar
                                    </Link>
                                </li>

                                <li className="my-3 h-px w-full bg-gray-300" />

                                <li>
                                    <Link
                                        href='/pricing'
                                        onClick={() => closeOnCurrent('/pricing')}
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Preços
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href='/dashboard'
                                        onClick={() => closeOnCurrent('/dashboard')}
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="my-3 h-px w-full bg-gray-300" />

                                <li>
                                    <Link
                                        href='/sign-out'
                                        className="flex items-center w-full font-semibold"
                                    >
                                        Sair
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    )
}
