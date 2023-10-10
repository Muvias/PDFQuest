'use client'

import { ChevronDown, ChevronUp, Loader2, RotateCw } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResizeDetector } from 'react-resize-detector';
import SimpleBar from 'simplebar-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { PdfFullScreen } from './PdfFullScreen';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
    url: string
}

export function PdfRenderer({ url }: PdfRendererProps) {
    const [numPages, setNumPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [scale, setScale] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)

    const { width, ref } = useResizeDetector()

    const customPageValidator = z.object({ page: z.string().refine((num) => Number(num) > 0 && Number(num) <= numPages!) })

    type TCustomPageValidator = z.infer<typeof customPageValidator>

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<TCustomPageValidator>({
        defaultValues: {
            page: "1"
        },
        resolver: zodResolver(customPageValidator)
    })

    function handlePageSubmit({ page }: TCustomPageValidator) {
        setCurrentPage(Number(page))
        setValue('page', String(page))
    }

    return (
        <div className="flex flex-col items-center w-full rounded-md shadow bg-white">
            <div className="flex items-center justify-between h-14 w-full px-2 border-b border-zinc-200">
                <div className="flex items-center gap-1.5">
                    <Button
                        variant='ghost'
                        aria-label='voltar página'
                        disabled={currentPage <= 1}
                        onClick={() => {
                            setCurrentPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
                            setValue('page', String(currentPage - 1))
                        }}
                    >
                        <ChevronDown className='h-4 w-4' />
                    </Button>

                    <div className='flex items-center gap-1.5'>
                        <Input
                            {...register('page')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(handlePageSubmit)()
                                }
                            }}
                            className={cn('w-12 h-8 rounded-lg ring-offset-0', errors.page && 'focus-visible:ring-red-400')}
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
                        onClick={() => {
                            setCurrentPage((prev) => (prev + 1 < numPages! ? prev + 1 : numPages!))
                            setValue('page', String(currentPage + 1))
                        }}
                    >
                        <ChevronUp className='h-4 w-4' />
                    </Button>
                </div>

                <div className='space-x-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                aria-label='zoom'
                                variant='ghost'
                                className='gap-1.5'
                            >
                                {scale * 100}% <ChevronDown className='h-4 w-4 opacity-50' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onSelect={() => setScale(1)}
                            >
                                100%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(1.5)}
                            >
                                150%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(2)}
                            >
                                200%
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={() => setScale(2.5)}
                            >
                                250%
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        aria-label='rotacionar 90 graus'
                        variant='ghost'
                        onClick={() => setRotation((prev) => prev + 90)}
                    >
                        <RotateCw className='h-4 w-4' />
                    </Button>

                    <PdfFullScreen
                        fileUrl={url}
                    />
                </div>
            </div>

            <div className='flex-1 w-full max-h-screen'>
                <SimpleBar
                    autoHide={false}
                    className='max-h-[calc(100vh-10rem)]'
                >
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
                            <Page
                                width={width ? width : 1}
                                pageNumber={currentPage}
                                scale={scale}
                                rotate={rotation}
                            />
                        </Document>
                    </div>
                </SimpleBar>
            </div>
        </div>
    )
}
