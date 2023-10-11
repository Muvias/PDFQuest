'use client'

import { trpc } from "@/app/_trpc/client";
import { ChatInput } from "./ChatInput";
import { Messages } from "./Messages";
import { ChevronLeft, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface ChatWrapperProps {
    fileId: string
}

export function ChatWrapper({ fileId }: ChatWrapperProps) {
    const { data, isLoading } = trpc.getFileUploadStatus.useQuery({ fileId }, {
        refetchInterval: (data) => data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    })

    if (isLoading) return (
        <div className="relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200">
            <div className="flex flex-col flex-1 justify-center items-center my-28">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <h3 className="font-semibold text-xl">
                        Carregando...
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Nós estamos preparando o seu PDF.
                    </p>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === "PROCESSING") return (
        <div className="relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200">
            <div className="flex flex-col flex-1 justify-center items-center my-28">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <h3 className="font-semibold text-xl">
                        Processando PDF...
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Isso não demorará muito.
                    </p>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    if (data?.status === "FAILED") return (
        <div className="relative flex flex-col justify-between min-h-full gap-2 divide-y bg-zinc-50 divide-zinc-200">
            <div className="flex flex-col flex-1 justify-center items-center my-28">
                <div className="flex flex-col items-center gap-2">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <h3 className="font-semibold text-xl">
                        Muitas páginas no PDF
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Seu <span className="font-medium">Plano Grátis</span> suporta até 5 páginas por PDF.
                    </p>

                    <Link
                        href='/dashboard'
                        className={buttonVariants({
                            variant: 'secondary',
                            className: 'mt-4'
                        })}
                    >
                        <ChevronLeft className="w-3 h-3 mr-1.5" />
                        Voltar
                    </Link>
                </div>
            </div>

            <ChatInput isDisabled />
        </div>
    )

    return (
        <div className="relative flex flex-col justify-between min-h-full gap-2 divide-y divide-zinc-200 bg-zinc-50">
            <div className="flex flex-1 flex-col justify-between mb-28">
                <Messages />
            </div>

            <ChatInput />
        </div>
    )
}
