import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        cookies().delete('token')
        return NextResponse.json(
            { success: true, message: 'Logged out successfully' },
            {
                status: 200,
                headers: {
                    'Set-Cookie': 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict',
                    'Location': '/loginroute'
                }
            }
        )
    } catch(error) {
        return NextResponse.json({status:500})
    }
}