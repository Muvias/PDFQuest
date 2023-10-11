import { useMutation } from "@tanstack/react-query";
import { ReactNode, createContext, useState } from "react";
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