import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface MaxWidthWrapperProps {
    className?: string
    children: ReactNode
}

export function MaxWidthWrapper({ className, children }: MaxWidthWrapperProps) {
    return (
        <div className={cn("max-w-screen-xl w-full mx-auto px-2.5 md:px-20", className)}>
            {children}
        </div>
    )
}
