'use client'
import Image from "next/image";
import {useRef, useState, useEffect, useActionState } from 'react'
import { hash } from './utils/crypto';
import Link from "next/link";



export default function Home() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')
  const [successfullog, setSuccessfullog] = useState(false)

  const [jobListing, setJobListing] = useState('')

  useEffect(()=> {
    async function tryy() {
     
    const res = await fetch('/api/scraper')
    const body = await res.json()
    console.log(body)
    setJobListing(body)
    }

    tryy()
  },[])

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

    const hashedPassword = hash(password)
    console.log(hashedPassword)
    //sent to api and add to database
    await fetch('/api/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        password: hashedPassword,
        companies: null
      })
    })
    //set successful login
    setSuccessfullog(true)

    //set back to null
    setUser('')
    setPassword('')
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-zinc-800 text-white text-xl">
      <div className="mt-28 w-80 border-1 p-2 border-white rounded-2xl">
        <div className="text-center">Make your career life easier with notifications for new job postings from <i>Big Tech</i> and <i>Wall Street</i>.</div>
        <div className="text-xs text-center m-2">(Currently only supported in the USA.)</div>
      </div>
      <div className="absolute m-2 bottom-0 p-2 text-sm text-gray-300 rounded-lg shadow-inner">Current available jobs: {jobListing.length}</div>
      <div className="mt-6">Create an account:</div>
      <form className={`${successfullog? 'hidden' : 'flex flex-col p-4 text-black items-center'}`} onSubmit={handleSubmit}>
        <input placeholder="Username" className="rounded-sm p-1 focus:outline outline-purple-500" onChange={(e) => setUser(e.target.value)} value={user}></input>
        <input type="password" placeholder="Password" className="mt-2 rounded-sm p-1 focus:outline outline-purple-500" onChange={(e)=> setPassword(e.target.value)} value={password}></input>
        <div className={`${error1? 'absolute ml-52 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <div className={`${error2? 'absolute ml-52 mt-11 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <button className="rounded-sm bg-purple-500 w-[50%] mt-5 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300 text-white" onClick={handleSubmit}>Sign Up</button>
      </form>
      <div className="flex flex-col w-72 border-t-2 border-white h-36 text-center">
        <div className="mt-4">Already have an account?</div>
        <Link href="/loginroute" className="text-white h-fit w-28 mx-auto text-center mt-2 rounded-sm bg-purple-500 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300">Log In</Link>
      </div>
      <div className={`${successfullog? 'mt-6 text-center animate-pulse' : 'hidden'}`}>We've sent you an email! Please verify yourself.</div>
      <Link href="/companies/" className="mt-12">Browse</Link>
    </main>
  );
}
