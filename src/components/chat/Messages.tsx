import { trpc } from "@/app/_trpc/client"
import { INFINITE_QUERY_LIMIT } from "@/config/infinit-query"
import { useIntersection } from "@mantine/hooks"
import { Loader2, MessageSquare } from "lucide-react"
import { useContext, useEffect, useRef } from "react"
import Skeleton from "react-loading-skeleton"
import { ChatContext } from "./ChatContext"
import Message from "./Message"

interface MessagesProps {
    fileId: string
}

export function Messages({ fileId }: MessagesProps) {
    const { isLoading: isAiThinking } = useContext(ChatContext)

    const { data, isLoading, fetchNextPage } = trpc.getFileMessages.useInfiniteQuery({
        fileId,
        limit: INFINITE_QUERY_LIMIT
    }, {
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        keepPreviousData: true
    })

    const messages = data?.pages.flatMap((page) => page.messages)

    const loadingMessage = {
        createdAt: new Date().toISOString(),
        id: 'loading-message',
        isUserMessage: false,
        text: (
            <span className="flex items-center justify-center h-full">
                <Loader2 className="h-4 w-4 animate-spin" />
            </span>
        )
    }

    const lastMessageRef = useRef<HTMLDivElement>(null)
    const { ref, entry } = useIntersection({
        root: lastMessageRef.current,
        threshold: 1
    })

    useEffect(() => {
        if (entry?.isIntersecting) {
            fetchNextPage()
        }
    }, [entry, fetchNextPage])

    const combinedMessages = [
        ...(isAiThinking ? [loadingMessage] : []),
        ...(messages ?? [])
    ]

    return (
        <div className="flex flex-1 flex-col-reverse max-h-[calc(100vh-3.5rem-7rem)] p-3 gap-4 overflow-y-auto scrollbar-w-2 scrolling-touch scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter border-zinc-200">
            {combinedMessages && combinedMessages.length > 0 ? (
                combinedMessages.map((message, index) => {
                    const isNextMessageSamePerson = combinedMessages[index - 1]?.isUserMessage === combinedMessages[index]?.isUserMessage

                    if (index === combinedMessages.length - 1) {
                        return <Message
                            ref={ref}
                            key={message.id}
                            message={message}
                            isNextMessageSamePerson={isNextMessageSamePerson}
                        />
                    } else return (
                        <Message
                            key={message.id}
                            message={message}
                            isNextMessageSamePerson={isNextMessageSamePerson}
                        />
                    )
                })
            ) : isLoading ? (
                <div className="w-full flex flex-col gap-2">
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                </div>
            ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2">
                    <MessageSquare className="h-8 w-8 text-blue-500" />
                    <h3 className="font-semibold text-xl">
                        Você está pronto!
                    </h3>
                    <p className="text-sm text-zinc-500">
                        Faça a sua primeira pergunta para começar.
                    </p>
                </div>
            )}
        </div>
    )
}
