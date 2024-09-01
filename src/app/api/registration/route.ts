import { connectToDatabase } from "../../utils/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    console.log('POST registration hit.')
    try {
        console.log('trying POST registration')
        const { db } = await connectToDatabase()
        console.log('POST registration connected to db')
        const collection = await db.collection("users")
        console.log('POST registration connected to collection')
        const body = await request.json()
        const existingUser = await collection.findOne(body)
        if (existingUser) {
            return NextResponse.json({status:400, message: 'User exists.'})
        }
        await collection.insertOne(body)
        return NextResponse.json({status: 200})
    } catch(error) {
        console.log('POST registration error:', error)
        return NextResponse.json({status: 500})
    }
}