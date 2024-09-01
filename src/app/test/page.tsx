'use client'
import { useEffect, useState } from "react"

export default function Test() {
    const [set, setSet] = useState('')

    useEffect(()=> {
        async function tryy() {
            const response = await fetch('/api/scraper')
            const data = await response.json()
            console.log(data)
            setSet(data.amazon)
        }
        tryy()
    },[])

    async function emailTest() {
        const response = await fetch('/api/sendemail', {
            method: 'POST'
        })
        console.log(response.json())
    }

    return(
        <main className="flex min-h-screen flex-col items-center p-4 bg-zinc-800 text-white text-xl">
            <div></div>
            <button onClick={emailTest} className="mt-20">Email Test</button>
        </main>
    )
}