interface PdfRendererProps {}

export function PdfRenderer({}: PdfRendererProps) {
    return (
        <div className="flex flex-col items-center w-full rounded-md shadow bg-white">
            <div className="flex items-center justify-between h-14 w-full px-2 border-b border-zinc-200">
                <div className="flex items-center gap-1.5">
                    top bar
                </div>
            </div>
        </div>
    )
}
