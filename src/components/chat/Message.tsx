import { cn } from "@/lib/utils";
import { ExtendedMessage } from "@/types/message";
import { Icons } from "../Icons";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

interface MessageProps {
    message: ExtendedMessage
    isNextMessageSamePerson: boolean
}

export function Message({ message, isNextMessageSamePerson }: MessageProps) {
    return (
        <div className={cn('flex items-end', {
            "justify-end": message.isUserMessage,
        })}>
            <div className={cn("relative flex items-center justify-center h-6 w-6 aspect-square rounded-md", {
                "order-2 bg-blue-600": message.isUserMessage,
                "order-1 bg-zinc-800": !message.isUserMessage,
                invisible: isNextMessageSamePerson
            })}>
                {message.isUserMessage ? (
                    <Icons.user className="h-3/4 w-3/4 fill-zinc-200 text-zinc-200" />
                ) : (
                    <Icons.logo className="h-3/4 w-3/4 fill-zinc-300" />
                )}
            </div>

            <div className={cn("flex flex-col max-w-md space-y-2 mx-2", {
                "order-1 items-end": message.isUserMessage,
                "order-2 items-start": !message.isUserMessage
            })}>
                <div className={cn("inline-block px-4 py-2 rounded-lg", {
                    "bg-blue-600 text-white": message.isUserMessage,
                    "bg-gray-200 text-gray-900": !message.isUserMessage,
                    "rounded-br-none": !isNextMessageSamePerson && message.isUserMessage,
                    "rounded-bl-none": !isNextMessageSamePerson && !message.isUserMessage
                })}>
                    {typeof message.text === "string" ? (
                        <ReactMarkdown
                            className={cn("prose", {
                                "text-zinc-50": message.isUserMessage
                            })}
                        >
                            {message.text}
                        </ReactMarkdown>
                    ) : (
                        message.text
                    )}
                    {message.id !== "loading-message" ? (
                        <div
                            className={cn("w-full mt-2 select-none text-xs text-right", {
                                "text-zinc-500": !message.isUserMessage,
                                "text-blue-300": message.isUserMessage
                            })}
                        >
                            {format(new Date(message.createdAt), "HH:mm")}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
