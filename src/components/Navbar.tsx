import Link from "next/link";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowRight } from "lucide-react";

export function Navbar() {
    return (
        <nav className="sticky w-full h-14 top-0 z-30 inset-x-0 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex items-center justify-between h-14 border-b border-zinc-200">
                    <Link
                        href="/"
                        className="flex z-40 font-semibold"
                    >
                        <span className="text-primary">PDFQuest.</span>
                    </Link>

                    {/* TODO: ADD mobile menu */}

                    <div className="hidden sm:flex items-center space-x-4">
                        <>
                            <Link
                                href="/pricing"
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                Preços
                            </Link>

                            <LoginLink
                                className={buttonVariants({
                                    size: "sm",
                                    variant: "ghost",
                                })}
                            >
                                Entrar
                            </LoginLink>

                            <RegisterLink
                                className={buttonVariants({
                                    size: "sm",
                                })}
                            >
                                Registrar   <ArrowRight className="ml-1.5 h-5 w-5" />
                            </RegisterLink>
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
