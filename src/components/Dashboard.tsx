'use client'

import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { UploadButton } from "./UploadButton";
import { Button } from "./ui/button";
import { useState } from "react";
import { getUserSubscriptionPlan } from "@/lib/stripe";

interface DashboardProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

export function Dashboard({ subscriptionPlan }: DashboardProps) {
    const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null)

    const utils = trpc.useContext();

    const { data: files, isLoading } = trpc.getUserFiles.useQuery()

    const { mutate: deleteFile } = trpc.deleteFile.useMutation({
        onSuccess: () => {
            utils.getUserFiles.invalidate()
        },
        onMutate: ({ id }) => {
            setCurrentlyDeletingFile(id)
        },
        onSettled() {
            setCurrentlyDeletingFile(null)
        }
    })

    return (
        <main className="mx-auto max-w-7xl md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 pb-5 border-b border-gray-200">
                <h1 className="mb-3 font-bold text-5xl text-gray-900">
                    Meus Arquivos
                </h1>

                <UploadButton isSubscribed={subscriptionPlan.isSubscribed} />
            </div>

            {files && files?.length !== 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 divide-y divide-zinc-200">
                    {files.sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    ).map((file) => (
                        <li
                            key={file.id}
                            className="col-span-1 rounded-lg shadow divide-y divide-gray-200 bg-white hover:shadow-lg transition"
                        >
                            <Link
                                href={`/dashboard/${file.id}`}
                                className="flex flex-col gap-2"
                            >
                                <div className="flex items-center justify-between w-full pt-6 px-6 space-x-6">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />

                                    <div className="flex-1 truncate">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="truncate font-medium text-lg text-zinc-900">
                                                {file.name}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <div className="grid grid-cols-3 place-items-center mt-4 px-6 py-2 gap-2 text-xs text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <Plus className="h-4 w-4" />
                                    {format(new Date(file.createdAt), "MMM yyyy", { locale: ptBR })}
                                </div>

                                <div className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" />
                                    Mocked
                                </div>

                                <Button
                                    size='sm'
                                    variant='destructive'
                                    className="w-full hover:bg-red-200 transition-colors"
                                    onClick={() => deleteFile({ id: file.id })}
                                    disabled={currentlyDeletingFile === file.id}
                                >
                                    {currentlyDeletingFile === file.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : <Trash className="h-4 w-4" />}
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : isLoading ? (
                <Skeleton
                    height={100}
                    count={3}
                    className="my-2"
                />
            ) : (
                <div
                    className="flex flex-col items-center gap-2 mt-16"
                >
                    <Ghost className="h-8 w-8 text-zinc-800" />
                    <h3 className="font-semibold text-xl">Muito vazio por aqui</h3>
                    <p>Vamos carregar seu primeiro PDF</p>
                </div>
            )}
        </main>
    )
}
