'use client'

import { Expand, Loader2 } from "lucide-react"
import { useState } from "react"
import { Document, Page } from "react-pdf"
import { useResizeDetector } from "react-resize-detector"
import SimpleBar from "simplebar-react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

interface PdfFullScreenProps {
    fileUrl: string
}

export function PdfFullScreen({ fileUrl }: PdfFullScreenProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [numPages, setNumPages] = useState<number>()

    const { width, ref } = useResizeDetector()

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(visible) => { if (!visible) { setIsOpen(visible) } }}
        >
            <DialogTrigger
                asChild
                onClick={() => setIsOpen(true)}
            >
                <Button
                    aria-label="fullscreen"
                    variant="ghost"
                    className="gap-1.5"
                >
                    <Expand className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-7xl w-full">
                <SimpleBar
                    autoHide={false}
                    className="max-h-[calc(100vh-10rem)] mt-6"
                >
                    <div
                        ref={ref}
                    >
                        <Document
                            file={fileUrl}
                            loading={
                                <div
                                    className='flex justify-center'
                                >
                                    <Loader2 className='animate-spin my-24 h-6 w-6' />
                                </div>
                            }
                            onLoadError={() => {
                                toast.error('Erro ao carregar o PDF', {
                                    description: 'Por favor tente novamente mais tarde.'
                                })
                            }}
                            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                            className='max-h-full'
                        >
                            {new Array(numPages).fill(0).map((_, i) => (
                                <Page
                                    key={i}
                                    width={width ? width : 1}
                                    pageNumber={i + 1}
                                />
                            ))}
                        </Document>
                    </div>
                </SimpleBar>
            </DialogContent>
        </Dialog>
    )
}
