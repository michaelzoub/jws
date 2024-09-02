import { cookies, headers } from "next/headers"
import { NextResponse, NextRequest } from "next/server"
import { SignJWT, jwtVerify } from 'jose'


const key = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(key)

//remove middleware and add server file that gets cookies value of token, decrypts it and sets it as a header

export async function middleware(request: NextRequest) {
    console.log('middleware running')
   // cookies().delete('token')
    const token:any = request.cookies.get('_vercel_jwt')?.value
    console.log(token)
   if  (request.nextUrl.pathname == './loginroute') {
        return NextResponse.next()
    }
    if (!token) {
        return NextResponse.next()
        //return NextResponse.redirect(new URL('/loginroute', request.url))
    } 
   try {
    console.log('trying middleware')
        const decrypto: any = await jwtVerify(token, encodedKey, {algorithms: ['HS256']}) as any //ts: not sure what the type is for jwt

        //STUDY THIS PART (until return)
        console.log(decrypto)
        console.log(decrypto)
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-user-data', JSON.stringify(decrypto.payload.userId))
        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
        console.log('decrypto: ',JSON.stringify(decrypto.payload))
        response.headers.set('x-user-data', JSON.stringify(decrypto.payload))
        console.log('headers set')
        return response
    } catch(error) {
        //return NextResponse.redirect(new URL('/loginroute', request.url))
        return NextResponse.json({status:500})
    } 

}


