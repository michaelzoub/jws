'use client'
import Image from "next/image";
import {useRef, useState, useEffect, useActionState } from 'react'
import { hash } from './utils/crypto';
import Link from "next/link";
import Loading from "./loading";


export default function Home() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error1, setError1] = useState('')
  const [error2, setError2] = useState('')
  const [successfullog, setSuccessfullog] = useState(false)

  const [userInfo, setUserInfo] = useState('')
  const [userInfoCompanies, setUserInfoCompanies] = useState('')

  const [jobListing, setJobListing] = useState('')

  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=> {
    async function tryy() {
      setIsLoading(true)
      setTimeout(() => setIsLoading(false), 1000)

      const response = await fetch('/api/userinfo')
      const body = await response.json()
    if (body == null) {
      setUserInfo('')
    } else {
      setUserInfo(body.user)
      if (body.companies == null) {
        setUserInfoCompanies('selected nothing')
      } else {
      setUserInfoCompanies(body.companies.join(', '))
      }
    }
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

  async function logout(e:any) {
    e.preventDefault()
    const response = await fetch('/api/logout', {
      method: 'POST'
    })
    const data = await response.json()
    if (data.success) {
      window.location.reload()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-zinc-800 text-white text-xl">
      <div className="mt-28 w-80 border-1 p-2 border-white rounded-2xl">
        <div className="text-left font-bold">Make your career life easier.</div>
        <div className="mt-2 text-sm">Receive notifications for new job postings from <i>Big Tech</i> and <i>Wall Street</i>.</div>
      </div>
      {isLoading && <Loading />}
      <div className=" border-white rounded-lg w-[500px]">
        <div className={`${userInfo? 'visible mt-20 text-center text-3xl font-semibold' : 'hidden'}`}>👋 Hello <span className="text-purple-500">{userInfo}</span>!</div>
        <div className={`${userInfo? 'my-3 text-sm text-center' : 'hidden'}`}>You currently have {userInfoCompanies} as target companies.</div>
        </div>
      <div className={`${userInfo? 'hidden' : ''}`}>
      <div className="mt-6 mx-auto max-w-fit">Create an account:</div>
      <form className={`${successfullog? 'hidden' : 'flex flex-col p-4 text-black items-center'}`} onSubmit={handleSubmit}>
        <input placeholder="E-mail" className="rounded-sm p-1 focus:outline outline-purple-500" onChange={(e) => setUser(e.target.value)} value={user}></input>
        <input type="password" placeholder="Password" className="mt-2 rounded-sm p-1 focus:outline outline-purple-500" onChange={(e)=> setPassword(e.target.value)} value={password}></input>
        <div className={`${error1? 'absolute ml-52 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <div className={`${error2? 'absolute ml-52 mt-11 text-sm transition ease-in-out delay-200 duration-300 translate-y-1 bg-red-400 rounded-sm px-1 py-[2px]' : 'hidden'}`}>!</div>
        <button className="rounded-sm bg-purple-500 w-full mt-5 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300 text-white" onClick={handleSubmit}>Sign Up</button>
      </form>
      <div className={`${successfullog? 'mt-6 text-center animate-pulse' : 'hidden'}`}>We've sent you an email! Please verify yourself.</div>
      <div className="flex flex-col h-36 text-center">
        <div className="mt-4 text-sm">Already have an account? <Link href="/loginroute" className="text-purple-300">Log In</Link></div>
      </div>
      </div>
      <Link href='/' className={`${userInfo? 'rounded-sm w-60 text-center bg-purple-500 px-4 mt-5 transition ease-in-out delay-200 hover:translate-y-[-2px] hover:bg-purple-400 duration-300 text-white' : 'hidden'}`} onClick={logout}>Log out</Link>
    </main>
  );
}
