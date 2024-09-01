'use client'
import { useState } from "react"

export default function Companies() {
    const [values, setValue] = useState<string[]>([])
    //big tech
    const [clickoClick, setClickoClick] = useState(false)
    //finance
    const [clickaClick, setClickaClick] = useState(false)
    let companyList:any = [];

    function handleChecked(e:React.ChangeEvent<HTMLInputElement>) {
        const {value, checked} = e.target
        setValue(prev => {
            if (checked && prev.length < 3) {
                return [...prev, value];
            } else if (!checked) {
                return prev.filter(item => item !== value);
            }
            return prev;
        });

    }

    async function sendToApi(e: any) {
        e.preventDefault()
        await fetch('/api/addcompaniestouser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),
            credentials: 'include' //makes sure cookies are sent as well
        })
    }

    function onClickTech() {
        clickoClick? setClickoClick(false) : setClickoClick(true)
    }

    function onClickFinance() {
        clickaClick? setClickaClick(false) : setClickaClick(true)
    }

    return (
        <main className="flex flex-col min-h-screen flex-row items-center bg-zinc-800 text-xl text-white">
<div className="flex flex-col p-0 mt-28 w-[75%] h-fit overflow-scroll rounded-sm bg-zinc-600">     
    <button onClick={onClickTech} className={`text-left h-fit px-1 w-full rounded-sm border-2 border-purple-400 bg-purple-700`}>Big Tech {clickoClick ? '-' : '+'}</button>
        <div className={`${clickoClick? 'flex flex-col w-full bg-zinc-700 shadow-inner p-2' : 'hidden'}`}>
            <div className="flex flex-row">
                <input type="checkbox" checked={values.includes('Apple')} value="Apple" onChange={handleChecked}></input>
                <label className="mx-2">Apple</label>
            </div>
            <div className="flex flex-row">
                <input type="checkbox" checked={values.includes('Amazon')} value="Amazon" onChange={handleChecked}></input>
                <label className="mx-2">Amazon</label>
            </div> 
            <div className="flex flex-row">
                <input type="checkbox" checked={values.includes('Nvidia')} value="Nvidia" onChange={handleChecked}></input>
                <label className="mx-2">Nvidia</label>
            </div>     
            <div className="flex flex-row">
                <input className="bg-purple-500" type="checkbox" checked={values.includes('Meta')} value="Meta" onChange={handleChecked}></input>
                <label className="mx-2">Meta</label>
            </div>   
        </div>
        
    <button onClick={onClickFinance} className={`text-left h-fit px-1 w-full rounded-sm border-2 border-purple-400 bg-purple-700`}>Finance {clickaClick ? '-' : '+'}</button>
        <div className={`${clickaClick? 'flex flex-col bg-zinc-700 shadow-inner rounded-md p-2' : 'hidden'}`}>
            <div className="flex flex-row">
                <input type="checkbox" checked={values.includes('JP Morgan')} value="JP Morgan" onChange={handleChecked}></input>
                <label className="mx-2">JP Morgan</label>
            </div>
            <div className="flex flex-row">
                <input type="checkbox" checked={values.includes('Goldman Sachs')} value="Goldman Sachs" onChange={handleChecked}></input>
                <label className="mx-2">Goldman Sachs</label>
            </div>
        </div>
</div>   
                <button onClick={sendToApi} className="mt-8 rounded-sm px-1 bg-purple-500 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300 text-white">Lock in your choice.</button>
        </main>
    )
}