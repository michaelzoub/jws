'use server'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { connectToDatabase } from '../../utils/mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const key = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(key)

//i'm expecting to receive username and hashed password from /login/page.tsx



//only runs from routes with /api/protected as path


export async function POST(request: Request) {
    //compare username, then check if input password matches db password
    console.log('Login route called')
    try {
        const {db} = await connectToDatabase()
        const userBody = await request.json()
        console.log('encoded key', encodedKey)
        console.log(userBody)
        const collection = await db.collection('users')
        console.log(userBody)
        const userFromDB = await collection.findOne({user: userBody.user})
        console.log(userFromDB)
        console.log('password:', userFromDB.password)
        const matchingPw = userFromDB.password
        if (matchingPw !== userBody.password) {
            console.log('wrong password')
            return NextResponse.json({status: 400, message: 'Wrong password.'})
        }
        console.log('About to create token')
        if (!userFromDB) {
            console.log('No user: ')
            return NextResponse.json({status:400, message:'No exist'})
        }
        console.log('User exists')
        interface SessionPayload extends JWTPayload {
            userId: string,
            companies: any

        }
        const sessionPayload: SessionPayload = {
            userId: userBody.user,
            companies: userFromDB.companies
        }
        const jwttoken = await new SignJWT(sessionPayload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('30d').sign(encodedKey)
        console.log('JWT:', jwttoken)
        //add JWT to cookies
        const expiresAt = new Date(Date.now() + 2592000) // 30 days
         cookies().set('_vercel_jwt', jwttoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            expires: expiresAt, 
            path: '/',   
        })
        console.log('cookies set')
        return NextResponse.json({jwttoken})
    } catch(error) {
        return NextResponse.json({status:500})
    }
}

