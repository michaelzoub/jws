import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { connectToDatabase } from "../../utils/mongodb";

export async function GET(request: Request) {
    console.log('userinfo GET hit')
    try {
        console.log(request.headers)
        const user: any = request.headers.get('x-user-data')
        console.log('userinfo route body: ',user)
        const parsed = await JSON.parse(user)
        console.log('userinfo parsed: ', parsed)
        const {db} = await connectToDatabase()
        const collection = await db.collection('users')
        const userObject = await collection.findOne({user: parsed.userId})
        console.log('user object:',userObject)
        console.log('userinfo API info: ',parsed)
        return NextResponse.json(userObject)
    } catch(error) {
        return NextResponse.json({status:500})
    }
}