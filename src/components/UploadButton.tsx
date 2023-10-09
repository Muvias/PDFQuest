'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

import Dropzone from "react-dropzone"
import { Cloud, File, Loader2 } from "lucide-react"
import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { toast } from 'sonner'
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"

function UploadDropzone() {
    const router = useRouter()

    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [uploadProgress, setUploadProgress] = useState<number>(0)

    const { startUpload } = useUploadThing("pdfUploader")

    const { mutate: startPolling } = trpc.getFile.useMutation({
        onSuccess: (file) => {
            router.push(`/dashboard/${file.id}`)
        },
        retry: true,
        retryDelay: 500
    })

    function startSimulatedProgress() {
        setUploadProgress(0)

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval)

                    return prevProgress
                }
                return prevProgress + 5
            })
        }, 500)

        return interval
    }

    return (
        <Dropzone
            multiple={false}
            onDrop={async (acceptedFile) => {
                setIsUploading(true)

                const progressInterval = startSimulatedProgress()

                const res = await startUpload(acceptedFile)

                if (!res) {
                    return toast.error("Ocorreu um erro", {
                        description: "Por favor, tente novamente mais tarde.",
                    })
                }

                const [fileResponse] = res

                const key = fileResponse.key

                if (!key) {
                    return toast.error("Ocorreu um erro", {
                        description: "Por favor, tente novamente mais tarde.",
                    })
                }

                clearInterval(progressInterval)
                setUploadProgress(100)

                startPolling({ key })
            }}
        >
            {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div
                    {...getRootProps()}
                    className="h-64 m-4 border border-dashed rounded-lg border-gray-300"
                >
                    <div className="flex justify-center items-center w-full h-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Cloud className="h-6 w-6 mb-2 text-zinc-500" />
                                <p className="mb-2 text-sm text-zinc-700">
                                    <span className="font-semibold">Clique para carregar</span>{' '} ou arraste e solte aqui
                                </p>
                                <p className="text-xs text-zinc-500">
                                    PDF (até 4MB)
                                </p>
                            </div>

                            {acceptedFiles && acceptedFiles[0] ? (
                                <div className="flex items-center max-w-xs rounded-md overflow-hidden outline outline-[1px] divide-x divide-zinc-200 outline-zinc-200 bg-white">
                                    <div className="grid place-items-center h-full px-3 py-2">
                                        <File className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <div className="h-full text-sm px-3 py-2 truncate">
                                        {acceptedFiles[0].name}
                                    </div>
                                </div>
                            ) : null}

                            {isUploading ? (
                                <div className="max-w-xs w-full mx-auto mt-4">
                                    <Progress
                                        value={uploadProgress}
                                        indicatorColor={
                                            uploadProgress === 100 ? 'bg-green-500' : ''
                                        }
                                        className="w-full h-1 bg-zinc-200"
                                    />
                                    {uploadProgress === 100 ? (
                                        <div className="flex items-center justify-center gap-1 pt-2 text-sm text-center text-zinc-700">
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                            Redirecionando...
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            <input
                                {...getInputProps()}
                                type="file"
                                id="dropzone-file"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    )
}

export function UploadButton() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(visible) => {
                if (!visible) {
                    setIsOpen(visible)
                }
            }}
        >
            <DialogTrigger
                asChild
                onClick={() => setIsOpen(true)}
            >
                <Button>Carregar Arquivo</Button>
            </DialogTrigger>

            <DialogContent>
                <UploadDropzone />
            </DialogContent>
        </Dialog>
    )
}
