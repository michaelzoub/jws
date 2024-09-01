'use client'
import Link from "next/link"

export function Navbar() {
    return(
        <div className="z-10 absolute top-0 w-full h-20 py-[27px]">
            
            <div className="flex flex-row-reverse mx-auto w-80 text-white items-center md:w-[30rem]">
            <Link href="/companies/" className="z-10 text-white" prefetch={true}>Browse</Link>
            <Link href="/" className="mx-4">Home</Link>
            <Link href="/" className="absolute w-80 mx-auto flex flex-row font-bold text-2xl text-purple-500 md:w-[30rem]"><p className="text-white">jws</p><p className="text-gray-400">.</p><p>onl</p></Link>
            </div>
        </div>
    )
}