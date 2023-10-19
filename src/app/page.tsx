import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper
        className="flex flex-col items-center justify-center mb-12 mt-28 sm:mt-40 text-center"
      >
        <div className="flex items-center justify-center max-w-fit px-7 py-2 mx-auto mb-4 space-x-2 rounded-full overflow-hidden shadow-md border backdrop-blur border-gray-200 bg-white hover:border-gray-300 hover:bg-zinc-100 transition-all">
          <p className="text-sm font-semibold text-gray-700">
            PDFQuest agora é público!
          </p>
        </div>

        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Converse com os seus <span className="text-blue-600">documentos</span> em segundos.
        </h1>

        <p className="mt-5 max-w-prose sm:text-lg text-zinc-700">
          PDFQuest permite que você converse com qualquer documento PDF. Simplesmente faça upload do seu arquivo e comece a fazer perguntas.
        </p>

        <Link
          href='/dashboard'
          target="_blank"
          className={buttonVariants({
            size: "lg",
            className: "mt-5",
          })}
        >
          Comece agora <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* Value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="absolute -top-40 sm:-top-80 -z-10 inset-x-0 pointer-events-none transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative w-[36.125rem] sm:w-[72.1875rem] left-[calc(50%-11rem)] sm:left-[calc(50%-30rem)] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>

          <div>
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 lg:-m-4 rounded-xl bg-gray-900/5 p-2 lg:p-4 lg:rounded-2xl ring-1 ring-inset ring-gray-900/10">
                  <Image
                    src='/dashboard-preview.jpg'
                    alt="Preview do produto"
                    width={1364}
                    height={866}
                    className="rounded-md p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -top-40 sm:-top-80 -z-10 inset-x-0 pointer-events-none transform-gpu overflow-hidden blur-3xl"
          >
            <div
              style={{
                clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative w-[36.125rem] sm:w-[72.1875rem] left-[calc(50%-13rem)] sm:left-[calc(50%-36rem)] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            />
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="max-w-5xl mx-auto mb-32 mt-32 sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl sm:text-5xl text-gray-900">
              Comece a conversar em minutos
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Conversar com os seus arquivos PDF nunca foi tão fácil quanto com PDFQuest.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="md:flex my-8 md:space-x-12 pt-8 space-y-4 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col py-2 pl-4 space-y-2 border-l-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 border-zinc-300">
              <span className="text-sm font-medium text-blue-600">Passo 1</span>
              <span className="text-xl font-semibold">Inscreva-se em uma conta</span>
              <span className="mt-2 text-zinc-700">
                Começando com o plano gratuito ou escolhendo nosso{" "}
                <Link href="/pricing" className="underline underline-offset-2 text-blue-700">plano pro</Link>.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col py-2 pl-4 space-y-2 border-l-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 border-zinc-300">
              <span className="text-sm font-medium text-blue-600">Passo 2</span>
              <span className="text-xl font-semibold">Faça upload do seu arquivo PDF</span>
              <span className="mt-2 text-zinc-700">
                Nós iremos processar o seu arquivo e deixar tudo pronto para você conversar com ele.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col py-2 pl-4 space-y-2 border-l-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4 border-zinc-300">
              <span className="text-sm font-medium text-blue-600">Passo 3</span>
              <span className="text-xl font-semibold">Comece a fazer perguntas</span>
              <span className="mt-2 text-zinc-700">
                Simples assim. Teste o PDFQuest hoje - realmente tomará menos de um minuto.
              </span>
            </div>
          </li>
        </ol>

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 lg:-m-4 rounded-xl bg-gray-900/5 p-2 lg:p-4 lg:rounded-2xl ring-1 ring-inset ring-gray-900/10">
              <Image
                src='/file-upload-preview.jpg'
                alt="Preview do produto"
                width={1419}
                height={732}
                className="rounded-md p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
