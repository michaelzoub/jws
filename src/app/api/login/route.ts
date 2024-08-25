'use server'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/app/utils/mongodb'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const key = "nPa83v8Da8pIIgsf0b1ioaf8B98D0ad" //process.env.JWT_SECRET


//i'm expecting to receive username and hashed password from /login/page.tsx



//only runs from routes with /api/protected as path

const config =  {
    matcher: '/api/protected/:path*',
  }

export async function POST(request: Request) {
    //compare username, then check if input password matches db password

    try {
        const userBody = await request.json()
        
        console.log(userBody)
        const {db} = await connectToDatabase()
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
            return NextResponse.json({status:400, message:'No exist'})
        }
        const jwttoken = jwt.sign({userId: userFromDB.user}, key, {expiresIn: '720h'})
        console.log('JWT:', jwttoken)
        //add JWT to cookies
        cookies().set('token', jwttoken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 2592000, // 30 days
            path: '/',   
        })
        return NextResponse.json({jwttoken})
    } catch(error) {
        return NextResponse.json({status:500})
    }
}

