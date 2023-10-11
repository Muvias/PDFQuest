import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

interface ChatInputProps {
    isDisabled?: boolean
}

export function ChatInput({ isDisabled }: ChatInputProps) {
    return (
        <div className="absolute w-full bottom-0 left-0">
            <form className="flex flex-row gap-3 mx-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-3xl">
                <div className="relative flex flex-1 items-stretch h-full md:flex-col">
                    <div className="relative flex flex-col flex-grow w-full p-4">
                        <div className="relative">
                            <Textarea
                                placeholder="Insira sua pergunta..."
                                rows={1}
                                maxRows={4}
                                autoFocus
                                className="resize-none pr-12 py-3 text-base scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
                            />

                            <Button
                                className="absolute bottom-1.5 right-2"
                                aria-label="Enviar mensagem"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
