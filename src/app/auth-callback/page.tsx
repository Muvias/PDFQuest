'use client'

import { useRouter, useSearchParams } from "next/navigation"
import { trpc } from "../_trpc/client"
import { Loader2 } from "lucide-react"

export default function Page() {
    const router = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    trpc.authCallback.useQuery(undefined, {
        onSuccess: ({ sucess }) => {
            if (sucess) {
                router.push(origin ? `/${origin}` : '/dashboard')
            }
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                router.push('/sign-in')
            }
        },
        retry: true,
        retryDelay: 500,
    })

    return (
        <div className="flex justify-center w-full mt-24">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin w-8 h-8 text-zinc-800" />
                <h3 className="font-semibold text-xl">Configurando sua conta...</h3>
                <p className="text-zinc-600">Você será redirecionado automaticamente.</p>
            </div>
        </div>
    )
}
