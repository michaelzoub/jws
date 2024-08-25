'use client'
import { useState } from "react"

export default function Companies() {
    const [value, setValue] = useState<string[]>([])
    let companyList:any = [];

    async function handleChecked(e:any) {
        const val = e.target.value
        if (value.length >= 3) {
            setValue([val])
            console.log(...value)
            await fetch('/api/addcompaniestouser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
        } else {
            setValue([...value,val])
        }

    }

    return (
        <main className="flex flex-row min-h-screen flex-col items-center p-4 bg-zinc-800 text-xl text-white">
            <div className="flex flex-row mt-20">
                <label className="mx-2">Apple</label>
                <input type="checkbox" value="apple" onChange={handleChecked} checked={value.includes('apple')}></input>
            </div>
            <div className="flex flex-row">
                <label className="mx-2">Palantir</label>
                <input type="checkbox" value="palantir" onChange={handleChecked} checked={value.includes('palantir')}></input>
            </div> 
            <div className="flex flex-row">
                <label className="mx-2">Valve</label>
                <input type="checkbox" value="valve" onChange={handleChecked} checked={value.includes('valve')}></input>
            </div>     
                <div>{value}</div>
        </main>
    )
}