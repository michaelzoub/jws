import Link from "next/link"

export default function Navbar() {
    return(
        <div className="absolute top-0 w-full h-20 py-[27px]">
            
            <div className="flex flex-row-reverse mx-auto w-96 text-white items-center">
            <Link href="/" className="absolute w-96 mx-auto flex flex-row font-bold text-2xl text-purple-500"><p className="text-white">jws</p><p className="text-gray-400">.</p><p>onl</p></Link>
            <Link href="/companies/">Browse</Link>
            <Link href="/" className="mx-4">Home</Link>
            </div>
        </div>
    )
}