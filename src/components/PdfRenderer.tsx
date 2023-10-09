'use client'

import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useResizeDetector } from 'react-resize-detector';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
    url: string
}

export function PdfRenderer({ url }: PdfRendererProps) {
    const [numPages, setNumPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)

    const { width, ref } = useResizeDetector()

    return (
        <div className="flex flex-col items-center w-full rounded-md shadow bg-white">
            <div className="flex items-center justify-between h-14 w-full px-2 border-b border-zinc-200">
                <div className="flex items-center gap-1.5">
                    <Button
                        variant='ghost'
                        aria-label='voltar página'
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))}
                    >
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>
                        <Input
                            placeholder={`${currentPage}`}
                            className='w-12 h-8 rounded-lg ring-offset-0'
                        />
                        <p className='text-sm space-x-1 text-zinc-700'>
                            <span>/</span>
                            <span>{numPages ?? "x"}</span>
                        </p>
                    </div>

                    <Button
                        variant='ghost'
                        aria-label='próxima página'
                        disabled={currentPage === numPages || numPages === undefined}
                        onClick={() => setCurrentPage((prev) => (prev + 1 < numPages! ? prev + 1 : numPages!))}
                    >
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            <div className='flex-1 w-full max-h-screen'>
                <div
                    ref={ref}
                >
                    <Document
                        file={url}
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
                        <Page width={width ? width : 1} pageNumber={currentPage} />
                    </Document>
                </div>
            </div>
        </div>
    )
}
