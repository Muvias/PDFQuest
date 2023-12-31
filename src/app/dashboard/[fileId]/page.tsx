import { ChatWrapper } from "@/components/chat/ChatWrapper"
import { PdfRenderer } from "@/components/PdfRenderer"
import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { notFound, redirect } from "next/navigation"

interface pageProps {
    params: {
        fileId: string
    }
}

export default async function Page({ params }: pageProps) {
    const { fileId } = params

    const { getUser } = getKindeServerSession()
    const user = getUser()

    if (!user || !user.id) redirect(`/auth-callback?origin=dashboard/${fileId}`)

    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId: user.id
        }
    })

    if (!file) notFound()

    return (
        <div className="flex flex-col flex-1 justify-between h-[calc(100vh-3.5rem)]">
            <div className="w-full mx-auto max-w-8xl grow lg:flex xl:px-2">
                {/* left side */}
                <div className="flex-1 lg:flex">
                    <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
                        <PdfRenderer url={file.url} />
                    </div>
                </div>

                {/* right side */}
                <div className="shrink-0 flex-[0.75rem] lg:w-96 border-t lg:border-l lg:border-t-0 border-gray-200">
                    <ChatWrapper
                        fileId={file.id}
                    />
                </div>
            </div>
        </div>
    )
}
