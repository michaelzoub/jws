'use client'
import {useState} from 'react'
import { hash } from '../utils/crypto'

export default function Login() {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [error1, setError1] = useState('')
    const [error2, setError2] = useState('')

    async function handleSubmit(e:any) {

        e.preventDefault()
        if (user == '') {
            setError1('Enter a username')
          } if (password == '') {
            setError2('Enter a password')
          }
            if (password !== '' && user !== '') {
          setError1('')
          setError2('')
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user, password: hash(password)})
        })
        console.log(res.body)
        console.log(res.json())
        }
    }

    return(
        <main className="flex min-h-screen flex-col items-center p-4 bg-zinc-800 text-white text-xl">
    <form className={`${'flex flex-col p-4 text-black items-center mt-20'}`} onSubmit={handleSubmit}>
        <input placeholder="Username" className="rounded-sm p-1 focus:outline outline-purple-500" onChange={(e) => setUser(e.target.value)} value={user}></input>
        <input type="password" placeholder="Password" className="mt-2 rounded-sm p-1 focus:outline outline-purple-500" onChange={(e)=> setPassword(e.target.value)} value={password}></input>
        <div className={`${error1? 'absolute ml-52 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <div className={`${error2? 'absolute ml-52 mt-11 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <button className="rounded-sm bg-purple-500 w-[50%] mt-5 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300 text-white" onClick={handleSubmit}>Log In</button>
      </form>
        </main>
    )
}