import { connectToDatabase } from "@/app/utils/mongodb";
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
        await collection.insertOne(body)
        return NextResponse.json({status: 200})
    } catch(error) {
        console.log('POST registration error:', error)
        return NextResponse.json({status: 500})
    }
}