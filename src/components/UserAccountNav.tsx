import { getUserSubscriptionPlan } from "@/lib/stripe"

import Image from "next/image"
import Link from "next/link"

import { Icons } from "./Icons"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server"

interface UserAccountNavProps {
    name: string
    email: string | undefined
    imageUrl: string
}

export async function UserAccountNav({ name, email, imageUrl }: UserAccountNavProps) {
    const subscriptionPlan = await getUserSubscriptionPlan()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
                className="overflow-visible"
            >
                <Button
                    className="h-8 w-8 aspect-square rounded-full bg-slate-400"
                >
                    <Avatar className="relative w-8 h-8">
                        {imageUrl ? (
                            <div className="relative h-full w-full aspect-square">
                                <Image
                                    fill
                                    src={imageUrl}
                                    alt="Foto de Perfil"
                                    referrerPolicy="no-referrer"
                                />
                            </div>
                        ) : (
                            <AvatarFallback>
                                <span className="sr-only">
                                    {name}
                                </span>
                                <Icons.user className="h-4 w-4 text-zinc-900" />
                            </AvatarFallback>
                        )}
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        {name && (
                            <p className="font-medium text-sm text-black">
                                {name}
                            </p>
                        )}
                        {email && (
                            <p className="w-[200px] truncate text-xs text-zinc-700">
                                {email}
                            </p>
                        )}
                    </div>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        href={'/dashboard'}
                    >
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    {subscriptionPlan?.isSubscribed ? (
                        <Link
                            href={'/dashboard/billing'}
                        >
                            Gerenciar Assinatura
                        </Link>
                    ) : (
                        <Link
                            href={'/pricing'}
                        >
                            Preços
                        </Link>
                    )}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                    <LogoutLink>Sair</LogoutLink>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
