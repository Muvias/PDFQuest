'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

import Dropzone from "react-dropzone"

function UploadDropzone() {
    return (
        <Dropzone multiple={false}>
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

                            </div>
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
