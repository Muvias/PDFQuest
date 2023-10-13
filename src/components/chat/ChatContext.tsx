import { trpc } from "@/app/_trpc/client";
import { INFINITE_QUERY_LIMIT } from "@/config/infinit-query";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useRef, useState } from "react";
import { toast } from "sonner";

type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => { },
    message: '',
    handleInputChange: () => { },
    isLoading: false
})

interface ChatContextProps {
    fileId: string
    children: ReactNode
}

export const ChatContextProvider = ({ fileId, children }: ChatContextProps) => {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const utils = trpc.useContext()
    const backupMessage = useRef('')

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({ message }: { message: string }) => {
            const res = await fetch('/api/message', {
                method: "POST",
                body: JSON.stringify({
                    fileId,
                    message
                })
            })

            if (!res.ok) throw new Error("Failed to send message")

            return res.body
        },
        onMutate: async ({ message }) => {
            backupMessage.current = message
            setMessage('')

            await utils.getFileMessages.cancel()

            const previousMessages = utils.getFileMessages.getInfiniteData()

            utils.getFileMessages.setInfiniteData(
                { fileId, limit: INFINITE_QUERY_LIMIT },
                (old) => {
                    if (!old) {
                        return {
                            pages: [],
                            pageParams: []
                        }
                    }

                    let newPages = [...old.pages]

                    let latestPage = newPages[0]!

                    latestPage.messages = [
                        {
                            createdAt: new Date().toISOString(),
                            id: crypto.randomUUID(),
                            text: message,
                            isUserMessage: true
                        },
                        ...latestPage.messages
                    ]

                    newPages[0] = latestPage

                    return {
                        ...old,
                        pages: newPages
                    }
                }
            )

            setIsLoading(true)

            return {
                previousMessages: previousMessages?.pages.flatMap((page) => page.messages) ?? []
            }
        },
        onSuccess: async (stream) => {
            setIsLoading(false)

            if (!stream) {
                return toast.error("Houve um problema ao enviar esta mensagem", {
                    description: "Por favor atualize a página e tente novamente"
                })
            }

            const reader = stream.getReader()
            const decoder = new TextDecoder()

            let done = false

            let accumulatedResponse = ''

            while (!done) {
                const { value, done: doneReading } = await reader.read()

                done = doneReading

                const chunkValue = decoder.decode(value)

                accumulatedResponse += chunkValue

                utils.getFileMessages.setInfiniteData(
                    { fileId, limit: INFINITE_QUERY_LIMIT },
                    (old) => {
                        if (!old) return { pages: [], pageParams: [] }

                        let isAiResponseCreated = old.pages.some((page) => page.messages.some((message) => message.id === "ai-response"))

                        let updatedPages = old.pages.map((page) => {
                            if (page === old.pages[0]) {
                                let updatedMessages

                                if (!isAiResponseCreated) {
                                    updatedMessages = [
                                        {
                                            createdAt: new Date().toISOString(),
                                            id: "ai-response",
                                            text: accumulatedResponse,
                                            isUserMessage: false
                                        },
                                        ...page.messages
                                    ]
                                } else {
                                    updatedMessages = page.messages.map((message) => {
                                        if (message.id === "ai-response") {
                                            return {
                                                ...message,
                                                text: accumulatedResponse
                                            }
                                        }

                                        return message
                                    })
                                }

                                return {
                                    ...page,
                                    messages: updatedMessages
                                }
                            }

                            return page
                        })

                        return {
                            ...old,
                            pages: updatedPages
                        }
                    }
                )
            }
        },
        onError: (_, __, context) => {
            setMessage(backupMessage.current)
            utils.getFileMessages.setData(
                { fileId },
                { messages: context?.previousMessages ?? [] }
            )
        },
        onSettled: async () => {
            setIsLoading(false)

            await utils.getFileMessages.invalidate({ fileId })
        }
    })

    function addMessage() {
        sendMessage({ message })
    }

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setMessage(e.target.value)
    }

    return (
        <ChatContext.Provider value={{
            addMessage,
            message,
            handleInputChange,
            isLoading
        }}>
            {children}
        </ChatContext.Provider>
    )
}