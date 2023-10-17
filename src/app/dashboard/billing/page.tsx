import { BillingForm } from "@/components/BillingForm"
import { getUserSubscriptionPlan } from "@/lib/stripe"

interface pageProps {}

export default async function page({}: pageProps) {
    const subscriptionPlan = await getUserSubscriptionPlan()

    return <BillingForm subscriptionPlan={subscriptionPlan} />
}
