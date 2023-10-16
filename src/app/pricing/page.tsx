import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"
import { UpgradeButton } from "@/components/UpgradeButton"
import { buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PLANS } from "@/config/stripe"
import { cn } from "@/lib/utils"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react"
import Link from "next/link"

interface pageProps { }

export default function page({ }: pageProps) {
    const { getUser } = getKindeServerSession()
    const user = getUser()

    const pricingItems = [
        {
            plan: 'Grátis',
            tagline: 'Para PDFs pequenos.',
            quota: 10,
            features: [
                {
                    text: '5 páginas por PDF',
                    footnote:
                        'O máximo de páginas por arquivo PDF.',
                },
                {
                    text: '4MB de limite',
                    footnote:
                        'O máximo de tamanho para um único PDF.',
                },
                {
                    text: 'Interface Mobile',
                },
                {
                    text: 'Alta qualidade de respostas',
                    footnote:
                        'O melhor algorítimo de respostas melhorando a qualidade do conteúdo',
                    negative: true,
                },
                {
                    text: 'Prioridade de suporte',
                    negative: true,
                },
            ],
        },
        {
            plan: 'Pro',
            tagline: 'Para PDFs grandes e maiores capacidades.',
            quota: PLANS.find((p) => p.slug === 'pro')!.quota,
            features: [
                {
                    text: '25 páginas por PDF',
                    footnote:
                        'O máximo de páginas por arquivo PDF.',
                },
                {
                    text: '16MB de limite',
                    footnote:
                        'O máximo de tamanho para um único PDF.',
                },
                {
                    text: 'Interface Mobile',
                },
                {
                    text: 'Alta qualidade de respostas',
                    footnote:
                        'O melhor algorítimo de respostas melhorando a qualidade do conteúdo',
                },
                {
                    text: 'Prioridade de suporte',
                },
            ],
        },
    ]

    return (
        <>
            <MaxWidthWrapper className="max-w-5xl mb-8 mt-24 text-center">
                <div className="mx-auto mb-10 sm:max-w-lg">
                    <h1 className="text-6xl sm:text-7xl font-bold">
                        Preços
                    </h1>
                    <p className="mt-5 sm:text-lg text-gray-600">
                        Esteja você apenas testando nossos serviços ou precisa de mais, nós temos o que você precisa.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 pt-12 gap-10">
                    <TooltipProvider>
                        {pricingItems.map(({ plan, tagline, quota, features }) => {
                            const price = PLANS.find((p) => p.slug === plan.toLocaleLowerCase())?.price.amount || 0

                            return (
                                <div
                                    key={plan}
                                    className={cn("relative rounded-2xl shadow-lg bg-white", {
                                        "border-2 shadow-blue-200 border-blue-600": plan === 'Pro',
                                        "border border-gray-200": plan !== 'Pro'
                                    })}
                                >
                                    {plan === 'Pro' && (
                                        <div className="absolute w-40 px-3 py-2 -top-5 left-0 right-0 mx-auto rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600">
                                            Faça upgrade agora
                                        </div>
                                    )}

                                    <div className="p-5">
                                        <h3 className={cn("my-3 text-center text-3xl font-bold", {
                                            "text-blue-600": plan === 'Pro'
                                        })}>
                                            {plan}
                                        </h3>
                                        <p className="text-gray-500">{tagline}</p>
                                        <p className="my-5 text-6xl font-semibold">
                                            R${price}
                                            <span className="text-sm text-gray-500">/por mês</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center h-20 border-b border-t border-gray-200 bg-gray-50">
                                        <div className="flex items-center space-x-1">
                                            <p>
                                                {quota.toLocaleString()} PDFs/mês incluídos
                                            </p>

                                            <Tooltip delayDuration={300}>
                                                <TooltipTrigger className="cursor-default ml-1.5">
                                                    <HelpCircle className="h-4 w-4 text-zinc-500" />
                                                </TooltipTrigger>
                                                <TooltipContent className="w-80 p-2">
                                                    Quantos PDFs você pode fazer upload por mês.
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <ul className="my-10 space-y-5 px-8">
                                        {features.map(({ text, footnote, negative }) => (
                                            <li key={text} className="flex space-x-5">
                                                <div className="flex-shrink-0">
                                                    {negative ? (
                                                        <Minus className="h-6 w-6 text-gray-300" />
                                                    ) : (
                                                        <Check className="h-6 w-6 text-gray-300" />
                                                    )}
                                                </div>
                                                {footnote ? (
                                                    <div className="flex items-center space-x-1">
                                                        <p className={cn("text-gray-400", {
                                                            "text-gray-600 line-through": negative
                                                        })}>
                                                            {text}
                                                        </p>
                                                        <Tooltip delayDuration={300}>
                                                            <TooltipTrigger className="cursor-default ml-1.5">
                                                                <HelpCircle className="h-4 w-4 text-zinc-500" />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="w-80 p-2">
                                                                {footnote}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
                                                ) : (
                                                    <p className={cn("text-gray-400", {
                                                        "text-gray-600 line-through": negative
                                                    })}>
                                                        {text}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="border-t border-gray-200" />

                                    <div className="p-5">
                                        {plan === 'Grátis' ? (
                                            <Link href={user ? '/dashboard' : '/sign-in'} className={buttonVariants({
                                                className: 'w-full',
                                                variant: 'secondary'
                                            })}>
                                                {user ? "Atualizar agora" : "Registrar-se"}
                                                <ArrowRight className="h-5 w-5 ml-1.5" />
                                            </Link>
                                        ) : user ? (
                                            <UpgradeButton />
                                        ) : (
                                            <Link href='/sign-in' className={buttonVariants({
                                                className: 'w-full'
                                            })}>
                                                {user ? "Melhore agora" : "Registrar-se"}
                                                <ArrowRight className="h-5 w-5 ml-1.5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </TooltipProvider>
                </div>
            </MaxWidthWrapper>
        </>
    )
}
