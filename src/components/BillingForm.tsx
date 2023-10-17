'use client'

import { trpc } from "@/app/_trpc/client"
import { getUserSubscriptionPlan } from "@/lib/stripe"
import { toast } from "sonner"
import { MaxWidthWrapper } from "./MaxWidthWrapper"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { format } from "date-fns"

interface BillingFormProps {
    subscriptionPlan: Awaited<ReturnType<typeof getUserSubscriptionPlan>>
}

export function BillingForm({ subscriptionPlan }: BillingFormProps) {
    const { mutate: createStripeSession, isLoading } = trpc.createStripeSession.useMutation({
        onSuccess: ({ url }) => {
            if (url) window.location.href = url
            if (!url) {
                toast.error("Houve um problema...", {
                    description: "Por favor tente novamente"
                })
            }
        }
    })
    return (
        <MaxWidthWrapper className="max-w-5xl">
            <form
                className="mt-12"
                onSubmit={(e) => {
                    e.preventDefault()
                    createStripeSession()
                }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Plano de assinatura
                        </CardTitle>
                        <CardDescription>
                            Você está atualmente no Plano <strong>{subscriptionPlan.name}</strong>
                        </CardDescription>
                    </CardHeader>

                    <CardFooter className="flex flex-col items-start md:flex-row md:justify-between md:space-x-0 space-y-2">
                        <Button
                            type="submit"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-4 animate-spin" />
                            ) : null}
                            {subscriptionPlan.isSubscribed ? "Gerenciar Assinatura" : "Atualize para o PRO"}
                        </Button>

                        {subscriptionPlan.isSubscribed ? (
                            <p className="rounded-full text-xs font-medium">
                                {subscriptionPlan.isCanceled ? "Seu plano será cancelado em " : "Seu plano será renovado em "}
                                {format(subscriptionPlan.stripeCurrentPeriodEnd!, "dd.MM.yyyy")}
                            </p>
                        ) : null}
                    </CardFooter>
                </Card>
            </form>
        </MaxWidthWrapper>
    )
}
