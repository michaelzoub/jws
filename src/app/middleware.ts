import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

const key = "nPa83v8Da8pIIgsf0b1ioaf8B98D0ad" //process.env.JWT_SECRET

export async function middleware(request: Request) {
    console.log('middleware running')
    const token = cookies().get('token')?.value
    console.log(token)
    if (!token) {
        return NextResponse.redirect(new URL('/loginroute', request.url))
    }
    try {
        const decrypto = jwt.verify(token, key) as any //ts: not sure what the type is for jwt
        //STUDY THIS PART (until return)
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-data', JSON.stringify(decrypto.user))
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    } catch(error) {
        return NextResponse.redirect(new URL('/loginroute', request.url))
    }
}

//matches file i want to run with, in my case it's inside the api folder
export const config = {
    matcher: ['/api/:path*']
  }