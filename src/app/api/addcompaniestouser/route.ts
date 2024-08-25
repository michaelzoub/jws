import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/utils/mongodb";
import { cookies } from "next/headers"

//find user depending on current session and add companies to his profile, only let him add companies once

//also need to get the current user session
export async function POST(request: Request) {
    const userData: any = request.headers.get('x-user-data')
    console.log(userData)
    const user = JSON.parse(userData)
    console.log(user)
    try {
        const {db} = await connectToDatabase()
        const collection = await db.collection('users')
        const companies = await request.json()
        await collection.updateOne(
            {user: userData},
            {$push: {companies: companies}}
        )
        return NextResponse.json({status:200})
    } catch(error) {
        return NextResponse.json({status:500})
    }
}